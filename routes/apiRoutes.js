/**
 * API routes for managing persons data.
 * This module sets up the router and associates routes with controller functions.
 */

const express = require('express')
const router = express.Router()
const getModel = require('../middlewares/getPersonModel')
const { getPersons, getPerson, postPerson, deletePerson, updatePerson } = require('../controllers/personsController') // Importing controller functions for persons
const isBodyExist = require('../middlewares/isBodyExist')

/**
 * Middleware to get the model and put it in the request object.
 * @name getModel
 * @function
 * @memberof module:routes/api
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * Uses the getModel method from the getModel middleware.
 * This middleware is used for all routes in the API module.
 */
router.use(getModel)

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
router.get('/', getPersons)

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
router.get('/:id', getPerson)

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
router.post('/', isBodyExist, postPerson)

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
router.delete('/:id', deletePerson)

/**
 * Route for updating a person by ID.
 * @name put/:id
 * @function
 * @memberof module:routes/api
 * @inner
 * @param {express.Request} req - The request object, with `id` as a route parameter and person data in the request body.
 * @param {express.Response} res - The response object.
 * Uses the updatePerson method from the persons controller.
 */
router.put('/:id', isBodyExist, updatePerson)

module.exports = router
