/**
 * API routes for managing persons data.
 * This module sets up the router and associates routes with controller functions.
 */

const express = require('express');
const router = express.Router();
const {getPersons, getPerson, postPerson, deletePerson} = require('../controllers/personsApi'); // Importing controller functions for persons

/**
 * Route serving a list of all persons.
 * @name get/
 * @function
 * @memberof module:routes/api
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * Uses the getPersons method from the persons controller.
 */
router.get('/', getPersons);

/**
 * Route serving a single person by ID.
 * @name get/:id
 * @function
 * @memberof module:routes/api
 * @inner
 * @param {express.Request} req - The request object, with `id` as a route parameter.
 * @param {express.Response} res - The response object.
 * Uses the getPerson method from the persons controller.
 */
router.get('/:id', getPerson);

/**
 * Route for creating a new person.
 * @name post/
 * @function
 * @memberof module:routes/api
 * @inner
 * @param {express.Request} req - The request object, expects a person data in the request body.
 * @param {express.Response} res - The response object.
 * Uses the postPerson method from the persons controller.
 */
router.post('/', postPerson);

/**
 * Route for deleting a person by ID.
 * @name delete/:id
 * @function
 * @memberof module:routes/api
 * @inner
 * @param {express.Request} req - The request object, with `id` as a route parameter.
 * @param {express.Response} res - The response object.
 * Uses the deletePerson method from the persons controller.
 */
router.delete('/:id', deletePerson);

module.exports = router;
