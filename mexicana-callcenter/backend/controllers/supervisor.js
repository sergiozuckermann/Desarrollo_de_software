const express = require('express');
const supervisorRouter = express.Router();
const dynamoDBClient = require('../utils/dynamoDBClient')
const connectClient = require('../utils/connectClient')
const { ScanCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { ListUsersCommand, DescribeUserCommand, UpdateUserRoutingProfileCommand, GetCurrentMetricDataCommand, MonitorContactCommand } = require("@aws-sdk/client-connect"); // CommonJS import
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
    // console.log("this is response: ", response)
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

      const performanceParams = {
        TableName: 'Agent',
        FilterExpression: 'username = :u',
        ExpressionAttributeValues: { // use expression to filter by username
          ':u': { S: userResponse.User.Username }
        },
        ProjectionExpression: 'performance'
      };

      const performanceData = new ScanCommand(performanceParams);
      const performanceResponse = await dynamoDBClient.send(performanceData);
      const [performance] = performanceResponse.Items

      return {
        id: user.Id,
        username: userResponse.User.Username,
        routingProfileId: userResponse.User.RoutingProfileId,
        name: userResponse.User.IdentityInfo.FirstName,
        lastname: userResponse.User.IdentityInfo.LastName,
        type: userResponse.User.SecurityProfileIds[0],
        performance: performance ? unmarshall(performance).performance : null,
      };

    });

    const userDetails = await Promise.all(userDetailsPromises);
    // console.log('Agents:', userDetails);

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
    // console.log('Filtered MetricsResults:', JSON.stringify(filteredResults, null, 2));
    res.status(200).json(filteredResults);

  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).send('Error fetching metrics');
  }
}
);

//barge in
supervisorRouter.post('/barge-in', async (req, res) => {
  const params = {
    InstanceId: 'd90b8836-8188-46c5-a73c-20cbee3a8ded',
    ContactId: req.body.contactId,
    UserId: req.body.participantId,
    AllowedMonitorCapabilities: ['BARGE', 'SILENT_MONITOR']
  };
  try {
    const command = new MonitorContactCommand(params);
    const response = await connectClient.send(command);
    console.log('Barge-in successful:', response);
    res.status(200).send('Barge-in successful');

  } catch (error) {
    console.error('Error at barge-in:', error);
    res.status(500).send('Error at barge-in');
  }
});

module.exports = supervisorRouter