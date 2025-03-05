const {getPersonModel} = require('../models/person');

/**
 * Middleware to get the Person model and attach it to the request object.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the middleware is complete.
 * @throws {Error} - Throws an error with status 500 if the model retrieval fails.
 */
module.exports = async (req, res, next)=>{
    try{
        req.Person = await getPersonModel()
        next()
    }
    catch(error){
        error.status = 500
        next(error)
    }

}