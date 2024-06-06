

const express = require('express');
const axios = require('axios');
const router = express.Router();

const queueMap = {
    'Travel logistics': '292d0398-6089-42cc-9ec9-aee43d6202a6',
    'Flight Management': '99bfbe85-27ac-4384-8462-f01f75b53d32'
};

router.post('/', async (req, res) => {
    try {
        const filters = req.body;

        if (!filters || typeof filters !== 'object') {
            console.error("Invalid filters received:", filters);
            return res.status(400).json({ error: 'Invalid filters' });
        }
        
        if (filters.queue) {
            filters.queue = queueMap[filters.queue] || '';
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
