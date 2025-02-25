const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json())

morgan.token('req_body', (req, res)=> {return JSON.stringify(req.body)});

app.use(morgan(':date[clf] request{from: :remote-addr, method: :method, to: :url, content-type: :req[content-type], content: :req_body }, response {status: :status, content-length: :res[content-length], response-time: :response-time ms}'))


const apiRoute = require('./routes/api')
const infoRoute = require('./routes/info')

app.use('/api/persons', apiRoute)
app.use('/info', infoRoute)


const unknownEndpoint = (req, res) =>{
    res.status(404).json({error: "Unknown Endpoint"})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`Listen on port ${PORT}`);
})