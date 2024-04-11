const express = require('express');
const agentRouter = express.Router();

agentRouter.get('/home', (req, res, next) => {
    console.log("agent home !!")
    next()
})

module.exports = agentRouter