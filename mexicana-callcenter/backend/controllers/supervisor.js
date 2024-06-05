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
  console.log("metric/performance endpoint");
  console.log(req);
  const id_agents = [
    '249708b2-5ea9-45e5-b207-bfd871485679',  //alex
        '564ce3fc-335e-4cdb-ad64-cfdf3d1a1988',  // carlosF
        '2a1e5af7-552a-439a-be19-bea1bd8a7a42',  // david
        'bae562b4-445c-4cf3-bc05-18b1ee323954',  // dawss
        '3a300c72-960e-474b-ae51-2ed6d205f1ff',  // santi
        '53268e60-5b4e-4210-85ac-74b6c848b199',  // spuervisorS
        'ba2f07cd-153d-4562-863d-7ad5fc67d51e'   // testUser
  ]

  const params = { // GetMetricDataV2Request
    ResourceArn: "arn:aws:connect:us-east-1:152951977869:instance/d90b8836-8188-46c5-a73c-20cbee3a8ded", // required
    StartTime: new Date("2024-05-05 00:00:00"), // required
    EndTime: new Date("2024-06-04 00:00:00"), // required
    //Interval: { // IntervalDetails
    //  TimeZone: "STRING_VALUE",
    //  IntervalPeriod: "FIFTEEN_MIN" || "THIRTY_MIN" || "HOUR" || "DAY" || "WEEK" || "TOTAL",
    //},
    Filters: [ // FiltersV2List // required
      { // FilterV2
        FilterKey: "AGENT",
        FilterValues: id_agents,
      },
    ],
    Groupings: [ // GroupingsV2
      "AGENT",
    ],


    Metrics: [ // MetricsV2 // required
    { // MetricV2
      Name: "",
      //MetricFilters: [ // MetricFiltersV2List
      //  { // MetricFilterV2
      //    MetricFilterKey: "STRING_VALUE",
      //    MetricFilterValues: [ // MetricFilterValueList
      //      "STRING_VALUE",
      //    ],
      //    Negate: true || false,
      //  },
      //],
    },
  ],

    //NextToken: "STRING_VALUE",
    //MaxResults: Number("int"),
  };

  switch (req.body.type) {
    case "ACRT":
      params.Metrics[0].Name = "AGENT_ANSWER_RATE"; // Nombre específico para ACRT
      break;
    case "ACHT":
      params.Metrics[0].Name = "AVG_HANDLE_TIME"; // Nombre específico para ACHT
      break;
    case "AIT":
      params.Metrics[0].Name = "AVG_INTERACTION_TIME"; // Nombre específico para AIT
      break;
    default:
      console.error('Invalid request type');
      break;
  }
  const command = new GetMetricDataV2Command(params);
  const response = await connectClient.send(command);
  res.status(200).json(response);
}
);

module.exports = supervisorRouter