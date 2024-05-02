const { DynamoDBClient } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY} = require("./config")

const dynamoDBClient = new DynamoDBClient({region: "us-east-1", credentials: 
 {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  }
});

module.exports = dynamoDBClient
