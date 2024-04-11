const verifyRole = role => {
    return (req, res, next) => {
        const { userRole } = req
        if(userRole === role) {
            next() 
        } else {
            // Create a new Error object with status code 404
            const error = new Error('Not Found')
            error.status = 404
            next(error) // Pass the error to the Express error handling middleware
        }
    }
}

module.exports = verifyRole
