const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand, GetObjectCommand  } = require('@aws-sdk/client-s3');
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = require('../utils/config');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const crypto = require('crypto');
const sharp = require('sharp');

const bucketName = "userprofilepicsmex";
const region = "us-east-1";
const accessKeyId = ACCESS_KEY_ID;
const secretAccessKey = SECRET_ACCESS_KEY;

const randomImageName = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString('hex');
}

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

const ddbClient = new DynamoDBClient({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('profilePicture'), async (req, res) => {
    console.log("reqBody", req.body);
    console.log("reqFile", req.file);
    
    const buffer = await sharp(req.file.buffer)
        .resize({height: 600, width: 600, fit: 'contain'})
        .toBuffer();

    const imageName = `${req.body.preferred_username}_${randomImageName()}`;

    const preferred_username = req.body.preferred_username;

    const params = {
        Bucket: bucketName,
        Body: buffer,
        Key: imageName,
        ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);

    await s3.send(command);

    const getObjectParams = {
        Bucket: bucketName,
        Key: imageName,
    };
    const getObjectCommand = new GetObjectCommand(getObjectParams);
    const signedUrl = await getSignedUrl(s3, getObjectCommand, { expiresIn: 604799 }); // URL válida por 1 mes

    const ddbParams = {
        TableName: "profilePictures", // Replace with your DynamoDB table name
        Item: {
            username: { S: preferred_username },
            imageURL: { S: signedUrl }
        }
    };

    const ddbCommand = new PutItemCommand(ddbParams);
    await ddbClient.send(ddbCommand);

    res.send({});
    console.log("signedUrl", signedUrl);
});

module.exports = router;
