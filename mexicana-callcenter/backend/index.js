// Imports
const express = require('express');

const signupRouter = require('./controllers/signup')
const loginRouter = require('./controllers/login')

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// controllers
app.use('/signup', signupRouter)
app.use('/login', loginRouter)


const port = process.env.PORT || 3000; // Use the port defined in environment variable or default to 3000

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
