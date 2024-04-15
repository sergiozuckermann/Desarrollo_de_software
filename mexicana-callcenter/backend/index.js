// Imports
const express = require('express');
const path = require('path');
const cors = require('cors');
const setToken = require('./middleware/setToken')
const verifyToken = require('./middleware/verifyToken')
const verifyRole = require('./middleware/verifyRole')
const roles = require('./config/roles')
const signupRouter = require('./controllers/signup')
const loginRouter = require('./controllers/login')
const supervisorRouter = require('./controllers/supervisor')
const agentRouter = require('./controllers/agent')

// Create an Express application
const app = express();

app.use(cors())

// Middleware to parse JSON bodies
app.use(express.json());

// app.use(express.static('dist'))

// Serve static files from the React production build directory
app.use(express.static(path.join(__dirname, 'dist')));


app.use(setToken)

// controllers  
app.use('/api/signup', signupRouter)
app.use('/api/login', loginRouter)
app.use('/supervisor', verifyToken, verifyRole(roles.supervisor), supervisorRouter)
app.use('/agent', verifyToken, verifyRole(roles.agent), agentRouter)

// Handle errors
app.use((err, req, res, next) => {
  // Check if the error has a status code, default to 500 if not
  const statusCode = err.status
  if(!statusCode) return res.status(500)
  if(err.message == "Not Found") {
    return res.status(statusCode).send("<h1>not found pageeee</h1>")
  } else if(err.message == "You need to log in") {
    return res.status(statusCode).send("<h1>redirect to login</h1>")

  }
});

// Configure React Router to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});




const port = process.env.PORT || 3000; // Use the port defined in environment variable or default to 3000

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
