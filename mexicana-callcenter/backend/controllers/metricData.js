const express = require('express');
const AWS = require('aws-sdk');
const metricRouter = express.Router();

require('dotenv').config();

AWS.config.update({ 
    region: 'us-east-1',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const kinesis = new AWS.Kinesis();

metricRouter.get('/', async (req, res) => {
    const startingTimestamp = new Date('April 23, 2024 20:24:00').getTime() / 1000;

    const params = {
        StreamName: 'RMT-ANALYTICS',
        ShardId: 'shardId-000000000002',
        ShardIteratorType: 'AT_TIMESTAMP',
        Timestamp: startingTimestamp
    };
    let records;
    try {
        const iteratorData = await kinesis.getShardIterator(params).promise();
        const recordsParams = {
            ShardIterator: iteratorData.ShardIterator
        };
        records = await kinesis.getRecords(recordsParams).promise();
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return res.status(500).send('Failed to fetch data');
    }

    if (records && records.Records.length > 0) {
        const decodedRecords = records.Records.map(record => {
            // Decode the base64 encoded data
            const payload = Buffer.from(record.Data, 'base64').toString('utf-8');
            try {
                return JSON.parse(payload);
            } catch (error) {
                // If parsing fails, return the payload as is
                return payload;
            }
        });
    
    decodedRecords.forEach((record, index) => {
        if (record.Segments) {
            console.log(`Record ${index + 1} Segments:`, record.Segments);
        } else {
            console.log(`Record ${index + 1} has no Segments or is not properly formatted.`);
        }
    });
        res.send(decodedRecords);
    } else {
        res.status(204).send('No data available');
    }
});


module.exports = metricRouter