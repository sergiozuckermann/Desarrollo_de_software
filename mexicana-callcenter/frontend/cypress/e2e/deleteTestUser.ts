import { CognitoIdentityProviderClient, AdminDeleteUserCommand } from "@aws-sdk/client-cognito-identity-provider";

require('dotenv').config();

export async function deleteUser(userPoolId: string, username: string) {
    const accessKeyId = Cypress.env('accessKeyId');
    const secretAccessKey = Cypress.env('secretAccessKey');

    console.log("Access Key ID from Cypress.env:", accessKeyId);
    console.log("Secret Access Key from Cypress.env:", secretAccessKey);

    const client = new CognitoIdentityProviderClient({
        region: "us-east-1",
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        }
    });

    const command = new AdminDeleteUserCommand({
        UserPoolId: userPoolId,
        Username: username,
    });

    try {
        const response = await client.send(command);
        console.log("User deleted successfully");
        return response;
    } catch (err) {
        console.error("Failed to delete user:", err);
    }
}