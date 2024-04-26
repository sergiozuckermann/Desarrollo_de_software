const express = require('express');
const agentRouter = express.Router();
const dynamoDBClient = require('../utils/dynamoDBClient')
const { ScanCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { unmarshall } = require('@aws-sdk/util-dynamodb');



agentRouter.get('/myInfo/:username', async (req, res, next) => {
    const username = req.params.username

    // Define parameters for query operation to find information of the user
    const params = { 
    TableName: 'Agent',
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

module.exports = agentRouter