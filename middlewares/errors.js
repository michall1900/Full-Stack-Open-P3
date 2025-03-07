/**
 * Middleware to handle unknown endpoints.
 * Responds with a 404 status code and an error message.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

/**
 * Middleware to handle errors related to invalid IDs.
 * @param {Object} error - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a JSON response with an error message if the error is a CastError.
 */
const idErrorHandler = (error, req, res, next) => {
  console.error(`${error.name}: ${error.message}`)
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }
  next(error)
}

/**
 * Middleware to handle duplicate key errors in MongoDB.
 * If a duplicate key error is detected, it responds with a 400 status code and an error message.
 * Otherwise, it passes the error to the next middleware.
 * @param {Object} error - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a JSON response with an error message if the error is a duplicate key error.
 */
const duplicateErrorHandler = (error, req, res, next) => {
  if (error.code && error.code === 11000) {
    return res.status(400).json({ error: `'${(req.body && req.body.name) ? req.body.name : 'The name'}' is already exist inside the phonebook.` })
  }
  next(error)
}

/**
 * Middleware to handle validation errors.
 * If a validation error is detected, it responds with a 400 status code and an error message.
 * Otherwise, it passes the error to the next middleware.
 * @param {Object} error - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a JSON response with an error message if the error is a validation error.
 */
const validationErrorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  else if (error.name === 'Error') {
    return res.status(404).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  unknownEndpoint,
  idErrorHandler,
  validationErrorHandler,
  duplicateErrorHandler
}