const { CognitoJwtVerifier } = require("aws-jwt-verify");


const verifyToken = async (req, res, next) => {
    const token = req.token

    // Verifier that expects valid access tokens:
    const verifier = CognitoJwtVerifier.create({
        userPoolId: "us-east-1_4KZw7nlgg",
        tokenUse: "id",
        clientId: "2gdenkjjd809jojhh7ojfqslf1",
    });
    
    try {
        const payload = await verifier.verify(token);
        console.log("Token is valid. Payload:", payload);
        req.userRole = payload['custom:job_level']
        next()
    } catch {
        console.log("Token not valid!");
        // res.status(401).json({error: 'You need to login'})
        let error = new Error('You need to log in')
        error.status = 401
        next(error)
    }
  

}

module.exports = verifyToken