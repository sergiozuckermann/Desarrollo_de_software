import {
  test_preferred_username,
  test_password_valid,
  test_firstName,
  test_lastName,
  test_jobLevel,
  test_email_valid,
  test_agentType,
} from './utils';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";


const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

const command = new SignUpCommand({
  ClientId: "2pjaga1vncnbn404e3e6q81ehi",
  Username: test_preferred_username,
  Password: test_password_valid,
  UserAttributes: [
    { Name: "given_name", Value: test_firstName },
    { Name: "family_name", Value: test_lastName },
    { Name: "custom:job_level", Value: test_jobLevel },
    { Name: "email", Value: test_email_valid },
    { Name: "custom:routing_profile", Value: test_agentType },
    { Name: "preferred_username", Value: test_preferred_username },
    { Name: "custom:passKey", Value: test_password_valid }
  ],
});

try {
  const response = await client.send(command);
  const { $metadata } = response;
} catch (err) {
  const errorMessage =
    err instanceof Error ? err.message : "An unexpected error occurred.";
}