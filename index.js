/**
 * Entry point for the Express server application.
 * Sets up middleware and routes for handling requests.
 */

const express = require('express')
const requestsLogger = require('./middlewares/requestLogger')
const corsMiddleware = require('./middlewares/corsSettings')
const {unknownEndpoint, errorIdHandler, errorHandler} = require('./middlewares/errors')
const app = express()

const apiRoute = require('./routes/apiRoutes'); // API route module
const infoRoute = require('./routes/infoRoutes'); // Information route module
 


app.use(express.json())
app.use(corsMiddleware)
app.use(requestsLogger)
app.use(express.static('dist'))



// Use API and info routes
app.use('/api/persons', apiRoute)
app.use('/info', infoRoute)
app.use(unknownEndpoint)
app.use(errorIdHandler)
app.use(errorHandler)


// Server setup
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`)
});
