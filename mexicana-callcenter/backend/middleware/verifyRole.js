// middleware to verify tha the user accessing the resource has permission to do so

const verifyRole = role => {
    // receive the request and verify that the user's role coming in from the request matches the target role
    return (req, res, next) => {
        const { userRole } = req
        // if it matches, continue to the next middleware
        if(userRole === role) {
            next() 
        } else {
            // return an error message if the role is a no match
            return res.status(401).json({error: 'You do not have access.'})
        }
    }
}

module.exports = verifyRole
