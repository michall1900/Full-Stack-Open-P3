/**
 * Information routes module.
 * This module sets up the router and associates the informational route with its controller function.
 */

const express = require('express');
const router = express.Router();
const {getInfo} = require('../controllers/infoController'); // Importing the controller function for information retrieval
const getModel = require('../middlewares/getPersonModel')

/**
 * Middleware to get the model and put it in the request object.
 * @name getModel
 * @function
 * @memberof module:routes/info
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * Uses the getModel method from the getModel middleware.
 * This middleware is used for all routes in the info module.
 */
router.use(getModel)
/**
 * Route serving general information about the application.
 * @name get/
 * @function
 * @memberof module:routes/info
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * Uses the getInfo method from the info controller to provide application information.
 */
router.get('/', getInfo);

module.exports = router;
