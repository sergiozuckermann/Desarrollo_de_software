const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: 'us-east-1_4KZw7nlgg',
  ClientId: '2gdenkjjd809jojhh7ojfqslf1'
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = userPool