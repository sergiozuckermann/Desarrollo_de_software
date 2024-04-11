// middleware to set the token in the proper format from the authorization header

const setToken = (req, res, next) => {
    const bearerToken = req.headers.authorization
    if(bearerToken) {
        const token = bearerToken.replace('Bearer ', '')
        req.token = token
    }
    next()
}

module.exports = setToken