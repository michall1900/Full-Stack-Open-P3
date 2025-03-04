require('dotenv').config()
const persons = require('../services/persons');
const {getPersonModel} = require('../models/person');
const { response } = require('express');
/**
 * Retrieves and sends a list of all persons in the phonebook.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object. Returns a JSON list of persons.
 */
const getPersons = async (req, res) => {
    // res.json(persons.getPersons());
    try{
        const Person = await getPersonModel()
        const phonebook = await Person.find({})
        res.json(phonebook)
    }
    catch(error){
        res.status(404).json({error: error.message || "There was an error while fetching persons."})
    }
};

/**
 * Retrieves and sends a specific person by ID.
 * @param {Object} req - The HTTP request object, expects an ID parameter.
 * @param {Object} res - The HTTP response object. Returns a JSON object of a person or a 404 error if not found.
 */
const getPerson = (req, res) => {
    const id = req.params.id;
    const person = persons.getPerson(id);
    
    if (person) {
        res.json(person);
    } else {
        res.status(404).json({error: `There is no person with id = ${id}.`});
    }
};

/**
 * Deletes a specific person by ID and sends an appropriate response.
 * @param {Object} req - The HTTP request object, expects an ID parameter.
 * @param {Object} res - The HTTP response object. Sends a 204 status code on success or a 404 error if the person cannot be found.
 */
const deletePerson = async (req, res) => {
    // try {
    //     persons.deletePerson(req.params.id);
    //     res.status(204).end();
    // } catch (error) {
    //     res.status(404).json({error: `${error}`});
    // }
    try{
        const Person = await getPersonModel()
        const id = req.params.id
        const result = await Person.findByIdAndDelete(id)
        if(!result)
            throw new Error(`The persons with id = ${id} is already deleted or never added to the phonebook.`)
        res.status(204).end();
    }
    catch(error){
        res.status(404).json({error: error.message || "There was an error while deleting persons."})
    }
};

/**
 * Adds a new person to the phonebook and sends the created person object.
 * @param {Object} req - The HTTP request object, expects 'name' and 'number' in the request body.
 * @param {Object} res - The HTTP response object. Returns the added person as a JSON object or a 400 error if input is invalid.
 */
const postPerson = async (req, res) => {
    // try {
    //     if (!req.body) {
    //         throw new Error("The content is missing.");
    //     }
    //     const person = persons.addNewPerson(req.body.name, req.body.number);
    //     res.json(person);
    // } catch (error) {
    //     res.status(400).json({error: `${error}`});
    // }
    try{
        if (!req.body) {
            throw new Error("The content is missing.");
        }
        const Person = await getPersonModel()
        const newPerson = new Person ({name: req.body.name, number: req.body.number})
        const receivedPerson = await newPerson.save(newPerson)
        res.json(receivedPerson)

    }   
    catch (error){
        res.status(400).json({error: error.message || `There was a problem while adding new person to the phonebook.`})
    }
};

module.exports = {getPersons, getPerson, deletePerson, postPerson}
