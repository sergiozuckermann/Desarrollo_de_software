const express = require('express');
const supervisorRouter = express.Router();

supervisorRouter.get('/home', (req, res) => {
    console.log("next was hit on supervisor route")
    res.send('supervisor dashboard')
})

module.exports = supervisorRouter