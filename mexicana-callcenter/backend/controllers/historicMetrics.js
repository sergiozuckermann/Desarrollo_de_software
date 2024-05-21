const express = require('express');
const axios = require('axios');
const router= express.Router();

router.post('/', async (req, res) => {
    try {

        const filters= req.body;
        
        const response = await axios.post('https://iv5is62s80.execute-api.us-east-1.amazonaws.com/default/EpochUnixDate', filters ,{
            headers: {
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json(
            response.data
        );
        console.log(response.data);

    } catch (error) {
        console.error(error); 
        res.status(500).send('Internal server error');
    }
});

module.exports = router;