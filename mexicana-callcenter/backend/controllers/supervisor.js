const express = require('express');
const supervisorRouter = express.Router();
const dynamoDBClient = require('../utils/dynamoDBClient')
const connectClient = require('../utils/connectClient')
const { ScanCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { ListUsersCommand, DescribeUserCommand, UpdateUserRoutingProfileCommand, GetCurrentMetricDataCommand, GetMetricDataV2Command } = require("@aws-sdk/client-connect"); // CommonJS import
const { unmarshall } = require('@aws-sdk/util-dynamodb');

supervisorRouter.get('/myInfo/:username', async (req, res, next) => {
  const username = req.params.username

  // Define parameters for query operation to find information of the user
  const params = {
    TableName: 'Supervisor',
    FilterExpression: 'username = :u',
    ExpressionAttributeValues: { // use expression to filter by username
      ':u': { S: username }
    }
  };

  try {
    const command = new ScanCommand(params);
    const response = await dynamoDBClient.send(command);
    console.log("this is response: ", response)
    const [userInfo] = response.Items // extract the info of the user
    res.status(200).json(unmarshall(userInfo)) // return info to the client as an object that contains info of the user
  } catch (err) {
    console.log("error found: ", err)
    res.status(500).json({ error: "There was a problem finding the user information" })

  }
})

// Get agents
supervisorRouter.get('/agents', async (req, res) => {

  const params = {
    InstanceId: 'd90b8836-8188-46c5-a73c-20cbee3a8ded'
  };


  try {
    const command = new ListUsersCommand(params);
    const response = await connectClient.send(command);
    const users = response.UserSummaryList; //Extract the list of users

    const userDetailsPromises = users.map(async (user) => { //Iterate over the list of users

      const params = {
        InstanceId: 'd90b8836-8188-46c5-a73c-20cbee3a8ded',
        UserId: user.Id
      };

      const usercommand = new DescribeUserCommand(params);

      const userResponse = await connectClient.send(usercommand);

      return {
        id: user.Id,
        username: userResponse.User.Username,
        routingProfileId: userResponse.User.RoutingProfileId,
        name: userResponse.User.IdentityInfo.FirstName,
        lastname: userResponse.User.IdentityInfo.LastName,
        type: userResponse.User.SecurityProfileIds,
      };

    });

    const userDetails = await Promise.all(userDetailsPromises);

    res.json(userDetails);
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).send('Error fetching agents');
  }
});

// Update routing profile
supervisorRouter.post('/update-routing-profile', async (req, res) => {
  const userid = req.body.userId;
  const routingProfileId = req.body.routingProfileId;
  const instanceId = 'd90b8836-8188-46c5-a73c-20cbee3a8ded';

  try {
    const command = new UpdateUserRoutingProfileCommand({
      InstanceId: instanceId,
      UserId: userid,
      RoutingProfileId: routingProfileId,
    });

    const response = await connectClient.send(command);
    console.log('Routing profile updated successfully:', response);
    res.status(200).send('Routing profile updated successfully');

  } catch (error) {
    console.error('Error at updating routing profile:', error);
    res.status(500).send('Error at updating routing profile');
  }
});


// Get queue metrics
supervisorRouter.get('/metrics', async (req, res) => {
  const params = {
    CurrentMetrics: [
      {
        Name: 'CONTACTS_IN_QUEUE',
        Unit: 'COUNT',
      }
    ],
    Filters: {
      Channels: [
        'VOICE',
      ],
      Queues: [
        '0b408b2d-26c5-4b59-b090-8f9422edb331', //Special Assistance
        '81fad136-adf4-4fb6-9780-e46f53cb740d', //Travel Information
        'b65f8183-2d8b-42e4-9b37-f8dfa787c246', //Flight Management
        'd19f9426-d75f-48eb-a68c-0bbda4ced434', //Website Support
        'd3fe43cd-5190-40ec-892b-741ffc4ccbd3', //Other Questions
        'f6d70469-1449-47c5-b93e-53b42de6dcc3' //Customer Service
      ],
    },
    Groupings: [
      'QUEUE'
    ],
    InstanceId: 'd90b8836-8188-46c5-a73c-20cbee3a8ded',
  }

  //Queue mappings
  const queueMappings = {
    '0b408b2d-26c5-4b59-b090-8f9422edb331': 'Special Assistance',
    '81fad136-adf4-4fb6-9780-e46f53cb740d': 'Travel Information',
    'b65f8183-2d8b-42e4-9b37-f8dfa787c246': 'Flight Management',
    'd19f9426-d75f-48eb-a68c-0bbda4ced434': 'Website Support',
    'd3fe43cd-5190-40ec-892b-741ffc4ccbd3': 'Other Questions',
    'f6d70469-1449-47c5-b93e-53b42de6dcc3': 'Customer Service'
  };

  try {
    const command = new GetCurrentMetricDataCommand(params);
    const response = await connectClient.send(command);

    // Create an object with all queues and 0 as value
    const allQueues = Object.keys(queueMappings).reduce((acc, key) => {
      acc[queueMappings[key]] = 0;
      return acc;
    }, {});

    // Update the object with the values from the response
    response.MetricResults.forEach(result => {
      result.Collections.forEach(collection => {
        const queueName = queueMappings[result.Dimensions.Queue.Id];
        if (queueName) {
          allQueues[queueName] = collection.Value;
        }
      });
    });

    // Transform the object into an array
    const filteredResults = Object.entries(allQueues).map(([queue, value]) => ({
      queue,
      value
    }));

    // Return the array to the client
    console.log('Filtered MetricsResults:', JSON.stringify(filteredResults, null, 2));
    res.status(200).json(filteredResults);

  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).send('Error fetching metrics');
  }
}
);

// Get queue metrics
supervisorRouter.post('/metrics/performance', async (req, res) => { //Average case resolution time (ACRT), Average customer hold time (ACHT), Average interaction time (AIT)

  const metricMap = {
    "ACRT": "AGENT_ANSWER_RATE",
    "ACHT": "AVG_HANDLE_TIME",
    "AIT": "AVG_INTERACTION_TIME"
  };

  const listUserC = new ListUsersCommand({ InstanceId: 'd90b8836-8188-46c5-a73c-20cbee3a8ded' });
  const response_list = await connectClient.send(listUserC);
  const agents = response_list.UserSummaryList;

  const agentIds = agents.map(agent => agent.Id); // Extract agent IDs
  // Crear un arreglo con Id y Username
  const agentData = agents.map(agent => ({
    id: agent.Id,
    username: agent.Username
  }));

  //console.log(agentIds);
  const params = { // GetMetricDataV2Request
    ResourceArn: "arn:aws:connect:us-east-1:152951977869:instance/d90b8836-8188-46c5-a73c-20cbee3a8ded", // required
    StartTime: new Date("2024-05-05 00:00:00"), // required
    EndTime: new Date("2024-06-04 00:00:00"), // required
    Filters: [ // FiltersV2List // required
      { // FilterV2
        FilterKey: "AGENT",
        FilterValues: agentIds,//id_agents,
      },
    ],
    Groupings: [ // GroupingsV2
      "AGENT",
    ],
    Metrics: [ // MetricsV2 // required
    { // MetricV2
      Name: "",
    },
  ],
  };
  const metricName = metricMap[req.body.type];
  params.Metrics[0].Name = metricName;

  const command = new GetMetricDataV2Command(params);
  const response = await connectClient.send(command);

  const rawData = response.MetricResults.map(metric => {
    const agentId = metric.Dimensions.AGENT;
    const username = getUsernameById(agentId, agentData);
  
    const metricValue = metric.Collections.find(m => m.Metric.Name === metricName)?.Value ?? 0;

    return {
      name: username, // agentId,
      value: metricValue 
    };
  }).filter(Boolean); // Filter out any null results
  
  // Sort the data based on request type
  let sortedData;
  if (req.body.type === "ACRT") {
    // Sort by percentage in ascending order
    sortedData = rawData.sort((a, b) => a.value - b.value);
  } else {
    // Sort by time in descending order
    sortedData = rawData.sort((a, b) => b.value - a.value);
  }
  
  // Format the sorted data
  const formattedData = sortedData.map(item => {
    if (req.body.type === "ACRT") {
      return {
        name: item.name,
        percentage: formatPercentage(item.value)
      };
    } else {
      return {
        name: item.name,
        time: formatTimestamp(item.value)
      };
    }
  });
  
// Check if formattedData is empty and handle the response
if (formattedData.length === 0) {
  return res.status(400).json({ message: 'No data available' });
} else {
  return res.status(200).json(formattedData);
}

  function formatPercentage(value) {
    const numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
      return `${numberValue.toFixed(2)}%`;  // Formatea a dos decimales
    }
  }
  function formatTimestamp(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60); // Asegúrate de que los segundos no tengan decimales

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
  
function getUsernameById(agentId, agentData) {
  const agent = agentData.find(agent => agent.id === agentId);
  return agent ? agent.username : null;
}

}
);

module.exports = supervisorRouter