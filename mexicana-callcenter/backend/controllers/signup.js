const express = require('express');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const userPool = require('../utils/userPool');
const signupRouter = express.Router();

signupRouter.post('/', async (req, res) => {
    // Extract data from body of request
    const { name, lastname, email, username, agentType, password, jobLevel } = req.body;

    // Create attribute list for user attributes
    const attributeList = [
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'given_name', Value: name }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'family_name', Value: lastname }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'preferred_username', Value: username }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:routing_profile', Value: agentType }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:job_level', Value: jobLevel })
    ];

    // Sign up the user in Cognito
    userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
            console.log(err);
            res.status(401).json({ message: err.message });
            return;
        }
        res.status(200).json({ message: 'User created successfully', user: result.user });
    });
});

module.exports = signupRouter;