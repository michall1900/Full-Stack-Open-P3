const express = require('express')
const router =  express.Router();
const persons = require('../controllers/personsApi')


router.get('/', persons.getPersons)

router.get('/:id', persons.getPerson)

router.post('/', persons.postPerson)

router.delete('/:id', persons.deletePerson)

module.exports = router