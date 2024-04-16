import {
  testValidNewEmail,
  testValidExistingEmail,
  testValidPassword,
  testFirstName,
  testLastName,
  testJobLevel
} from './utils';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";


const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

const command = new SignUpCommand({
    ClientId: "7n1pkdlieo0jnsl5uht0vpd5pj",
    Username: testValidExistingEmail,
    Password: testValidPassword,
    UserAttributes: [
      { Name: "given_name", Value: testFirstName },
      { Name: "family_name", Value: testLastName },
      { Name: "custom:job_level", Value: testJobLevel },
    ],
  });


try {
    const response = await client.send(command);
    const { $metadata } = response;
} catch (err) {
    const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
}