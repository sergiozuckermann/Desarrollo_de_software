const express = require('express');
const { DynamoDBClient, QueryCommand } = require('@aws-sdk/client-dynamodb');
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = require('../utils/config');

const region = "us-east-1";
const tableName = "profilePictures";
const indexName = "username-imageURL-index"; // Assuming this is your secondary index

const dynamoClient = new DynamoDBClient({
  region,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  }
});

const router = express.Router();

router.get('/get-image-url/:username', async (req, res) => {
  const username = req.params.username;

  const params = {
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: "username = :username",
    ExpressionAttributeValues: {
      ":username": { S: username }
    }
  };

  try {
    const data = await dynamoClient.send(new QueryCommand(params));
    if (data.Items && data.Items.length > 0) {
      const imageUrl = data.Items[0].imageURL.S; // Ensure this matches your DynamoDB schema
      res.status(200).json({ username, imageUrl });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user data from DynamoDB", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
