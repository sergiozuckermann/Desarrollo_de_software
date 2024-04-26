const express = require('express');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const userPool = require('../utils/userPool')
const signupRouter = express.Router();



signupRouter.post('/', async (req, res) => {

    // data received from the client
    const { preferred_username, password, userAttributes } = req.body

    // attribute list needed 
    const attributeList = userAttributes.map(a => new AmazonCognitoIdentity.CognitoUserAttribute(a))

    // register user
    userPool.signUp(
            preferred_username,
            password,
            attributeList,
            null, 
            (err, data) => {
                if (err) {
                  console.error('Signup error:', err);
                  res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Signup successful', data })

            }) 
})

module.exports = signupRouter