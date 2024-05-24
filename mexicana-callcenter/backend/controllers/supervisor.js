const express = require('express');
const supervisorRouter = express.Router();
const dynamoDBClient = require('../utils/dynamoDBClient')
const connectClient = require('../utils/connectClient')
const { ScanCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { ListUsersCommand, DescribeUserCommand, UpdateUserRoutingProfileCommand  } = require("@aws-sdk/client-connect"); // CommonJS import
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
      res.status(500).json({error: "There was a problem finding the user information"})

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
    const users = response.UserSummaryList;

    const userDetailsPromises = users.map(async (user) => {

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
      };

    });

    const userDetails = await Promise.all(userDetailsPromises);
    console.log("this is response: ", userDetails)

    res.json(userDetails);
  } catch (error) {
    console.error('Error al obtener agentes:', error);
    res.status(500).send('Error al obtener agentes');
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
    console.log('Routing profile actualizado exitosamente:', response);
    res.status(200).send('Routing profile actualizado exitosamente'); 

  } catch (error) {
    console.error('Error al actualizar routing profile:', error);
    res.status(500).send('Error al actualizar routing profile');
  }
});

module.exports = supervisorRouter