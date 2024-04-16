// middleware to set the token in the proper format from the authorization header

const setToken = (req, res, next) => {
    const bearerToken = req.headers.authorization // extract bearer token from the authorization header
    if(bearerToken) {
        // if bearer token exists add the token to the request
        const token = bearerToken.replace('Bearer ', '')
        req.token = token
    }
    next() // proceed to the next middleware
}

module.exports = setToken