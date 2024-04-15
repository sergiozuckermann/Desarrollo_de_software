const express = require('express');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const userPool = require('../utils/userPool')
const loginRouter = express.Router();


loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    const credentials = {
        Username: username,
        Password: password
    }

    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails(credentials)

    const userData = {
        Username: username,
        Pool: userPool,
    };

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
        console.log("result of success op: ", result)
        const response = {
            name: result.idToken.payload.given_name,
            role: result.idToken.payload['custom:job_level'],
            token: result.idToken.jwtToken
        }
        res.status(200).json(response)
      },
        onFailure: (err) => console.log("failed op: ", err)
    })
    
})

module.exports = loginRouter