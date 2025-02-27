/**
 * Information routes module.
 * This module sets up the router and associates the informational route with its controller function.
 */

const express = require('express');
const router = express.Router();
const info = require('../controllers/info'); // Importing the controller function for information retrieval

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
router.get('/', info.getInfo);

module.exports = router;
