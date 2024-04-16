import { CognitoIdentityProviderClient, AdminDeleteUserCommand } from "@aws-sdk/client-cognito-identity-provider";

export async function deleteUser(userPoolId: string, username: string) {
    const client = new CognitoIdentityProviderClient({ region: "us-east-1" , credentials: {
        accessKeyId: Cypress.env('accessKeyId'),
        secretAccessKey: Cypress.env('secretAccessKey'),
    }});
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