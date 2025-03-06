/**
 * Entry point for the Express server application.
 * Sets up middleware and routes for handling requests.
 */

require('dotenv').config()
const express = require('express')
const requestsLogger = require('./middlewares/requestLogger')
const corsMiddleware = require('./middlewares/corsSettings')
const {unknownEndpoint,idErrorHandler, validationErrorHandler, duplicateErrorHandler} = require('./middlewares/errors')
const app = express()

const apiRoute = require('./routes/apiRoutes'); // API route module
const infoRoute = require('./routes/infoRoutes'); // Information route module
 
// Middleware setup
app.use(express.json()) // Parse JSON bodies
app.use(corsMiddleware) // Enable CORS
app.use(requestsLogger) // Log requests
app.use(express.static('dist')) // Serve static files

// Use API and info routes
app.use('/api/persons', apiRoute) // API routes for persons
app.use('/info', infoRoute) // Route for info
app.use(unknownEndpoint) // Handle unknown endpoints
app.use(idErrorHandler) // Handle ID errors
app.use(duplicateErrorHandler) // Handle duplicate errors
app.use(validationErrorHandler) // General error handler

// Server setup
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`)
});
