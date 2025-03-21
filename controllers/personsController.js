/**
 * Retrieves and sends a list of all persons in the phonebook.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object. Returns a JSON list of persons.
 */
const getPersons = async (req, res) => {

  const phonebook = await req.Person.find({})
  res.json(phonebook)

}

/**
 * Retrieves and sends a specific person by ID.
 * @param {Object} req - The HTTP request object, expects an ID parameter.
 * @param {Object} res - The HTTP response object. Returns a JSON object of a person or a 404 error if not found.
 */
const getPerson = async (req, res) => {

  const person = await req.Person.findById(req.params.id)
  if (!person) {
    throw new Error(`There is no person with id = ${req.params.id}.`)
  }
  res.json(person)

}

/**
 * Deletes a specific person by ID and sends an appropriate response.
 * @param {Object} req - The HTTP request object, expects an ID parameter.
 * @param {Object} res - The HTTP response object. Sends a 204 status code on success or a 404 error if the person cannot be found.
 */
const deletePerson = async (req, res) => {

  const id = req.params.id
  const result = await req.Person.findByIdAndDelete(id)
  if (!result) {
    throw new Error(`The persons with id = ${id} is already deleted or never added to the phonebook.`)
  }
  res.status(204).end()

}

/**
 * Adds a new person to the phonebook and sends the created person object.
 * @param {Object} req - The HTTP request object, expects 'name' and 'number' in the request body.
 * @param {Object} res - The HTTP response object. Returns the added person as a JSON object or a 400 error if input is invalid.
 */
const postPerson = async (req, res) => {

  const newPerson = new req.Person({ name: req.body.name, number: req.body.number })
  const receivedPerson = await newPerson.save(newPerson)
  res.json(receivedPerson)

}

/**
 * Updates an existing person in the phonebook and sends the updated person object.
 * @param {Object} req - The HTTP request object, expects 'name' and 'number' in the request body and an ID parameter.
 * @param {Object} res - The HTTP response object. Returns the updated person as a JSON object or a 400 error if input is invalid.
 */
const updatePerson = async (req, res) => {

  const receivedPerson = {
    name: req.body.name,
    number: req.body.number
  }
  const updatedPerson = await req.Person.findByIdAndUpdate(req.params.id,
    receivedPerson, { new: true, runValidators: true, context: 'query' })
  res.json(updatedPerson)

}

const tryCatchWrapper = (method) => {

  return async (req, res, next) => {
    try{
      await method(req, res, next)
    }
    catch (error){
      next(error)
    }
  }

}

module.exports = {
  getPersons: tryCatchWrapper(getPersons),
  getPerson: tryCatchWrapper(getPerson),
  deletePerson: tryCatchWrapper(deletePerson),
  postPerson: tryCatchWrapper(postPerson),
  updatePerson: tryCatchWrapper(updatePerson)
}
