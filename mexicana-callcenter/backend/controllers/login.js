const express = require('express');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const userPool = require('../utils/userPool')
const loginRouter = express.Router();


loginRouter.post('/', async (req, res) => {
    // extract credentials from body of request
    const { username, password } = req.body

    // create the credentials object
    const credentials = {
        Username: username,
        Password: password
    }

    // create an authentication details object needed to perform login in cognito
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails(credentials)

    // create user data object which includes the user pool reference
    const userData = {
        Username: username,
        Pool: userPool,
    };

    // create a cognito user to verify
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    // authenticate the user
    cognitoUser.authenticateUser(authDetails, {
        // success operation
        onSuccess: (result) => {
        console.log("result of success op: ", result)
        const response = {
            name: result.idToken.payload.given_name,
            role: result.idToken.payload['custom:job_level'],
            token: result.idToken.jwtToken
        }
        res.status(200).json(response)  
      },
        // failed operation
        onFailure: (err) => res.status(401).json({message: err.message})
    })
    
})

module.exports = loginRouter