import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { uuid } from 'uuidv4';


const dynamoDBClient = new DynamoDBClient({ region: 'us-east-1' });

export const handler = async (payload, context) => {
  try {
    
    const { position } = payload
    const { S:tableName } = position
    
    // Write user data to DynamoDB
    const params = {
      TableName: tableName,
      Item: {user_id: {S:uuid()}, ...payload}
    };

    // // Perform the PutItem operation
    await dynamoDBClient.send(new PutItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "TEST RAN OKKKKK" }),
    };
  } catch (error) {
    console.error("Error creating user in DynamoDB:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create user in DynamoDB", error: error.message }),
    };
  }
};