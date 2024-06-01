const { CognitoJwtVerifier } = require("aws-jwt-verify");


const verifyToken = async (req, res, next) => {
    const token = req.token

    // Verifier that expects valid access tokens:
    const verifier = CognitoJwtVerifier.create({
        userPoolId: "us-east-1_B7gG0aOum",
        tokenUse: "id",
        clientId: "232lqu9hp3k913eihjj76ai1l2",
    });
    
    try {
        const payload = await verifier.verify(token);
        console.log("Token is valid. Payload:", payload);
        req.userRole = payload['custom:job_level']
        next()
    } catch {
        console.log("Token not valid!");
        res.status(401).json({error: 'You need to login'})
     
    }
  

}

module.exports = verifyToken