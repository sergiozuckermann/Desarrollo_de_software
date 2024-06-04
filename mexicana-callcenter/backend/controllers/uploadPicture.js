const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = require('../utils/config');
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

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('profilePicture'), async (req, res) => {
    console.log("reqBody", req.body);
    console.log("reqFile", req.file);
    
    const buffer = await sharp(req.file.buffer)
        .resize({height: 600, width: 600, fit: 'contain'})
        .toBuffer();

    const params = {
        Bucket: bucketName,
        Body: buffer,
        Key: randomImageName(),
        ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);

    await s3.send(command);
    res.send({});
});

module.exports = router;
