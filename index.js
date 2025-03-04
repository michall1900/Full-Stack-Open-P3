/**
 * Entry point for the Express server application.
 * Sets up middleware and routes for handling requests.
 */

const express = require('express')
const requestsLogger = require('./middlewares/requestLogger')
const corsMiddleware = require('./middlewares/corsSettings')
const app = express()

const apiRoute = require('./routes/apiRoutes'); // API route module
const infoRoute = require('./routes/infoRoutes'); // Information route module
const unknownEndpointRoute = require('./routes/errorsRoutes') 


app.use(express.json())
app.use(corsMiddleware)
app.use(requestsLogger)
app.use(express.static('dist'))



// Use API and info routes
app.use('/api/persons', apiRoute)
app.use('/info', infoRoute)
app.use(unknownEndpointRoute)


// Server setup
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`)
});
