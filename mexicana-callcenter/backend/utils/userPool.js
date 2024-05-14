const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: 'us-east-1_Kk8qPSFAN',
  ClientId: '2pjaga1vncnbn404e3e6q81ehi'
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = userPool