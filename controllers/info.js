const {getPersonsSize} = require('../services/persons');

/**
 * Sends information about the phonebook as HTML.
 * This endpoint provides the current size of the phonebook and the current date and time.
 * @param {Object} req - The HTTP request object. Not used in the function but required by the route handling.
 * @param {Object} res - The HTTP response object. Sends an HTML response with the phonebook information.
 */
const getInfo = (req, res) => {
    res.send(
        `<h1>Phonebook</h1>
        <p>The phonebook has info for ${persons.getPersonsSize()} people</p>
        <p>${new Date().toString()}</p>`
    );
};

module.exports = {getInfo}
