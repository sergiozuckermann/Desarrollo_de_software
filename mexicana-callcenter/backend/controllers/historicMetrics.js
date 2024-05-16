const express = require('express');
const axios = require('axios');
const router= express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://iv5is62s80.execute-api.us-east-1.amazonaws.com/default/EpochUnixDate');
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
        console.error(error); 
        res.status(500).send('Internal server error');
    }
});

module.exports = router;