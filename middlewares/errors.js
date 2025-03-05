

/**
 * Middleware to handle unknown endpoints.
 * Creates an error with a 404 status and passes it to the next middleware.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const unknownEndpoint =  (req, res, next) => {
    const error = new Error("Unknown Endpoint")
    error.status = 404
    next(error)
};

/**
 * Middleware to handle errors related to invalid IDs.
 * 
 * @param {Object} error - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * 
 * If the error is a CastError, it sets the status to 400 and the message to 'malformatted id'.
 */
const idErrorHandler = (error, req, res, next)=>{
    if(error.name === 'CastError'){
        error.status = 400
        error.message = 'malformatted id'
    }
    next(error)
}

/**
 * Middleware to handle duplicate key errors in MongoDB.
 * If a duplicate key error is detected, it sets the status to 400 and
 * provides a custom error message indicating that the name already exists in the phonebook.
 *
 * @param {Object} error - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const duplicateErrorHandler = (error, req, res, next)=>{
    if(error.code && error.code === 11000){
        error.status = 400
        error.message = 'The name is already exist inside the phonebook.'
    }
    next(error)
}

/**
 * Middleware function to handle errors in the application.
 * Logs the error to the console and sends a JSON response with the error message.
 *
 * @param {Error} error - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (error, req, res, next)=>{
    console.error(error)
    res.status(error.status || 500).json({error: `${(error.name !== "Error")? `${error.name} `:""}${error.message}`})
}

module.exports = {unknownEndpoint, idErrorHandler, errorHandler, duplicateErrorHandler}