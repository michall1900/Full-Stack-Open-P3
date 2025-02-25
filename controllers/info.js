const persons = require('../services/persons')

exports.getInfo = (req, res)=>{
    res.send(
        `<h1>Phonebook</h1>
        <p>The phonebook has info for ${persons.getPersonsSize()} people</p>
        <p>${Date().toString()}</p>`
    )
}