/**
 * Sends information about the phonebook as HTML.
 * This endpoint provides the current size of the phonebook and the current date and time.
 * @param {Object} req - The HTTP request object. Not used in the function but required by the route handling.
 * @param {Object} res - The HTTP response object. Sends an HTML response with the phonebook information.
 */
const getInfo = async (req, res, next) => {
  try {
    const count = await req.Person.estimatedDocumentCount()
    res.send(
      `<h1>Phonebook</h1>
            <p>The phonebook has info for ${count} people</p>
            <p>${new Date().toString()}</p>`
    )
  }
  catch (error) {
    error.status = 500
    next(error)
  }

}

module.exports = { getInfo }
