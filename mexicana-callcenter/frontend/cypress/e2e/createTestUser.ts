import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

export async function createUser(test_email_valid: string, test_password_valid: string, test_firstName: string, test_lastName: string, test_jobLevel: string, test_agentType: string, test_preferred_username: string) {
    const client = new CognitoIdentityProviderClient({ region: "us-east-1" , credentials: {
        accessKeyId: Cypress.env('accessKeyId'),
        secretAccessKey: Cypress.env('secretAccessKey'),
    }});
    const command = new SignUpCommand({
        ClientId: "232lqu9hp3k913eihjj76ai1l2",
        Username: test_preferred_username,
        Password: test_password_valid,
        UserAttributes: [
          { Name: "given_name", Value: test_firstName },
          { Name: "family_name", Value: test_lastName },
          { Name: "email", Value: test_email_valid },
          { Name: "custom:routing_profile", Value: test_agentType },
          { Name: "preferred_username", Value: test_preferred_username },
          { Name: "custom:passKey", Value: test_password_valid }
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