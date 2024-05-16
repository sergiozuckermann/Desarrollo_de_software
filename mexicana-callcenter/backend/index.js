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
const metricsRouter = require('./controllers/historicMetrics')

// Create an Express application
const app = express();

// use cors middleware
app.use(cors())

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the React production build directory
app.use(express.static(path.join(__dirname, 'dist')));

// middleware to set the token to the request
app.use(setToken) 

// controllers  
app.use('/auth/signup', signupRouter)
app.use('/auth/login', loginRouter)        
app.use('/supervisor', verifyToken, verifyRole(roles.supervisor), supervisorRouter)
app.use('/agent', verifyToken, verifyRole(roles.agent), agentRouter)
app.use('/historicmetrics',  metricsRouter)


const port = process.env.PORT || 3000; // Use the port defined in environment variable or default to 3000

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
