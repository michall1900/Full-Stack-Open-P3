/**
 * This service is not in use anymore.
 */
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

let idsSet = new Set()

persons.forEach((person)=>{
    idsSet.add(person.id)
})

/**
 * Validates a person's name according to specific rules.
 * 
 * The name must:
 * - Not be empty.
 * - Start with an uppercase letter followed by lowercase letters.
 * - Be separated by spaces if it contains multiple words.
 * - Not contain numbers or spaces at the start/end.
 * - Be unique in the phonebook.
 * 
 * @param {string} name - The name to validate.
 * @throws {Error} If the name is missing.
 * @throws {Error} If the name does not match the required format.
 * @throws {Error} If the name is not unique in the phonebook.
 */
const validateName = (name) => {
    if(!name)
        throw new Error("Name is missing");
    const regex = /^[A-Z][a-z]*([ ][A-Z][a-z]*)*$/;
    if(!regex.test(name))
        throw new Error("The name should start with an uppercase letter followed by lowercase letters, separated by a space. No numbers or spaces at the start/end.")
    if(persons.some((person)=>name==person.name))
        throw new Error(`The name ${name} is already in the phonebook, name must be unique.`)
}

/**
 * Validates a phone number.
 * 
 * @param {string} number - The phone number to validate.
 * @throws {Error} If the number is missing.
 * @throws {Error} If the number does not match the required format.
 * 
 * The required format is digits followed by optional groups of digits, each preceded by a hyphen.
 */
const validateNumber = (number)=>{
    if(!number)
        throw new Error("Number is missing");
    const regex = /^\d+(-\d+)*$/;
    if(!regex.test(number))
        throw new Error("The number should start with digits, followed by optional groups of digits each preceded by a hyphen.")
    
}

/**
 * Generates a unique identifier.
 * The identifier is a string representation of a random integer.
 * Ensures the generated identifier is not already present in the idsSet.
 *
 * @returns {string} A unique identifier.
 */
const generateId = ()=>{
    let id;
    do{
        id = String(Math.floor(Math.random()*Number.MAX_SAFE_INTEGER));
    }while(idsSet.has(id));

    return id;
}

/**
 * 
 * @returns {number} The number of persons in the phonebook.
 */
const getPersonsSize= ()=>{
    return persons.length;
}

/**
 * Adds a new person to the phonebook.
 * The required format for number is digits followed by optional groups of digits, each preceded by a hyphen.
 * The name must:
 * - Not be empty.
 * - Start with an uppercase letter followed by lowercase letters.
 * - Be separated by spaces if it contains multiple words.
 * - Not contain numbers or spaces at the start/end.
 * - Be unique in the phonebook.
 * @param {String} name 
 * @param {String} number 
 * @throws {Error} If the name is missing / does not match the required format/ is not unique in the phonebook.
 * @throws {Error} If the number is missing or not matching the required format.
 * @returns {Object} newPerson - representing the new person added to the phonebook.
 * @property {String} newPerson.id - The unique identifier of the new person.
 * @property {String} newPerson.name - The name of the new person.
 * @property {String} newPerson.number - The phone number of the new person.
 */
const addNewPerson = (name, number)=>{
    validateName(name);
    validateNumber(number);
    const id = generateId()
    const newPerson = {id, name, number}
    persons.push(newPerson)
    idsSet.add(newPerson.id)
    return newPerson
}

/**
 * Get all persons in the phonebook.
 * @returns {Object[]} persons - an array of all persons in the phonebook.
 * @property {String} newPerson.id - The unique identifier of the new person.
 * @property {String} newPerson.name - The name of the new person.
 * @property {String} newPerson.number - The phone number of the new person.
 */
const getPersons = ()=>{
    return [...persons]
}

/**
 * Find a person by their id.
 * @param {String} id 
 * @returns {Object} newPerson - representing the person with the specified id.
 * @property {String} newPerson.id - The unique identifier of the new person.
 * @property {String} newPerson.name - The name of the new person.
 * @property {String} newPerson.number - The phone number of the new person.
 */
const getPerson = (id)=>{
    return persons.find((person)=>person.id===id);
}

/**
 * Deletes a person from the phonebook by its id.
 * @param {String} id
 * @throws {Error} If the person with the specified id is already deleted or never added to the phonebook. 
 */
const deletePerson = (id)=>{
    if(!idsSet.has(id))
        throw Error(`The persons with id = ${id} is already deleted or never added to the phonebook.`)
    persons = persons.filter((person)=>person.id!==id)
    idsSet.delete(id)
}

module.exports = {getPerson, deletePerson, addNewPerson, getPersons, getPersonsSize}

