/**
 * Entry point for the Express server application.
 * Sets up middleware and routes for handling requests.
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());


// Middleware for handling CORS
// Only allows requests from http://localhost:3000
const corsOptions = (req, res) => {
    let corsOptions;
    if(req.header('Origin') && req.header('Origin').startsWith('http://localhost:3000')) 
        corsOptions = { origin: true };
    else
        corsOptions = { origin: false };
}
app.use(cors(corsOptions));


// Custom token for Morgan logger to log the request body
morgan.token('req_body', (req) => JSON.stringify(req.body));

// Morgan logger setup to output detailed request and response logs
app.use(morgan(':date[clf] request {from: :remote-addr, method: :method, to: :url, content-type: :req[content-type], content: :req_body}, response {status: :status, content-length: :res[content-length], response-time: :response-time ms}'));

// Routes
const apiRoute = require('./routes/api'); // API route module
const infoRoute = require('./routes/info'); // Information route module

// Use API and info routes
app.use('/api/persons', apiRoute);
app.use('/info', infoRoute);

/**
 * Middleware for handling requests to unknown endpoints.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * Sends a 404 error in JSON format indicating that the endpoint is unknown.
 */
const unknownEndpoint = (req, res) => {
    res.status(404).json({error: "Unknown Endpoint"});
};

app.use(unknownEndpoint);

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
});
