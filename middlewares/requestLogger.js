const morgan = require('morgan');

// Custom token for Morgan logger to log the request body
morgan.token('req_body', (req) => JSON.stringify(req.body));

module.exports = morgan(':date[clf] request {from: :remote-addr, method: :method, to: :url, content-type: :req[content-type], content: :req_body}, response {status: :status, content-length: :res[content-length], response-time: :response-time ms}')