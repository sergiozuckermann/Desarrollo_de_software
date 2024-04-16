import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

export async function createUser(testEmailExisting: string, testPasswordValid: string, testFirstName: string, testSurName: string, testJobLevel: string) {
    const client = new CognitoIdentityProviderClient({ region: "us-east-1" , credentials: {
        accessKeyId: Cypress.env('accessKeyId'),
        secretAccessKey: Cypress.env('secretAccessKey'),
    }});
    const command = new SignUpCommand({
        ClientId: "2gdenkjjd809jojhh7ojfqslf1",
        Username: testEmailExisting,
        Password: testPasswordValid,
        UserAttributes: [
            { Name: "given_name", Value: testFirstName },
            { Name: "family_name", Value: testSurName },
            { Name: "custom:job_level", Value: testJobLevel },
        ],
    });
    try {
        const response = await client.send(command);
        const { $metadata } = response;
        console.log("Test user created successfully");
        return $metadata;
    } catch (err) {
        console.error("Failed to create test user:", err);
    }
}