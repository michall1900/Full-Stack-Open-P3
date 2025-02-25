const getPersonsSize = require('./personsApi').getPersonsSize

exports.getInfo = (req, res)=>{
    res.send(
        `<h1>Phonebook</h1>
        <p>The phonebook has info for ${getPersonsSize()} people</p>
        <p>${Date().toString()}</p>`
    )
}