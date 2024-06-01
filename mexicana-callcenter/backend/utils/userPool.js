const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: 'us-east-1_B7gG0aOum',
  ClientId: '232lqu9hp3k913eihjj76ai1l2'
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = userPool