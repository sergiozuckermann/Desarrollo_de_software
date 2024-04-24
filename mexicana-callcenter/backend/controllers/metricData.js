const express = require('express');
const metricRouter = express.Router();

metricRouter.get('/', (req, res) => {
    const response = {
        name: 'Mau'
    }
    res.status(200).json(response)

})

module.exports = metricRouter