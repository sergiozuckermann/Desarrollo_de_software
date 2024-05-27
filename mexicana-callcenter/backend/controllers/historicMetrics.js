const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const filters = req.body;
        console.log("Received filters:", JSON.stringify(filters, null, 2)); // Log received filters

        if (!filters || typeof filters !== 'object') {
            console.error("Invalid filters received:", filters);
            return res.status(400).json({ error: 'Invalid filters' });
        }

        const response = await axios.post('https://iv5is62s80.execute-api.us-east-1.amazonaws.com/default/EpochUnixDate', filters, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("Response from external API:", JSON.stringify(response.data, null, 2)); // Log response from Lambda
        res.status(200).json(response.data);

    } catch (error) {
        console.error("Error occurred:", error.message);
        console.error("Stack trace:", error.stack);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;
