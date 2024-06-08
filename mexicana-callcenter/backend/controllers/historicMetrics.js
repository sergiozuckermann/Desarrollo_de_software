const express = require('express');
const axios = require('axios');
const router = express.Router();

const queueMap = {
    'Travel logistics': '292d0398-6089-42cc-9ec9-aee43d6202a6',
    'Flight Management': 'b65f8183-2d8b-42e4-9b37-f8dfa787c246',
    'Customer Service': 'f6d70469-1449-47c5-b93e-53b42de6dcc3',
    'Other Questions': 'd3fe43cd-5190-40ec-892b-741ffc4ccbd3',
    'Special Assistance': '0b408b2d-26c5-4b59-b090-8f9422edb331',
    'Travel Information': '81fad136-adf4-4fb6-9780-e46f53cb740d',
    'Website Assistance': 'd19f9426-d75f-48eb-a68c-0bbda4ced434'
};

router.post('/', async (req, res) => {
    try {
        const filters = req.body;
        console.log("Received filters:", filters); // Log received filters

        if (!filters || typeof filters !== 'object') {
            console.error("Invalid filters received:", filters);
            return res.status(400).json({ error: 'Invalid filters' });
        }

        const response = await axios.post('https://glen3ula34.execute-api.us-east-1.amazonaws.com/default/EpochUnixDate', filters, {
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
