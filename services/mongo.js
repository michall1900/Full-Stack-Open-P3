/**
 * This service is not in use anymore.
 */

const mongoose = require('mongoose')

const Indexes = Object.freeze({ 'PASSWORD': 2, 'NAME': 3, 'NUMBER': 4 })
const NUM_OF_VALUES = 5
const NUM_OF_VALUES_FOR_GET_REQUESTS = 3

const validateParams = () => {
  if (process.argv.length < NUM_OF_VALUES_FOR_GET_REQUESTS) {
    console.log('You should insert your password.')
    process.exit(1)
  }
}


const initializeModel = () => {
  validateParams()
  const password = encodeURIComponent(process.argv[Indexes.PASSWORD])

  const uri = `mongodb+srv://michall1900:${password}@michalbucks.fbfok.mongodb.net/phonebook?retryWrites=true&w=majority&appName='The Phonebook'`

  mongoose.set('strictQuery', false)

  mongoose.connect(uri)

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: 'The person`s name is required',
      match: [/^[A-Z][a-z]*([ ][A-Z][a-z]*)*$/, 'The name should start with an uppercase letter followed by lowercase letters, separated by a space. No numbers at all or spaces at the start/end.']
    },
    number: {
      type: String,
      required: 'Number is missing',
      match: [/^\d+(-\d+)*$/, 'The number should start with digits, followed by optional groups of digits each preceded by a hyphen.']
    }
  })

  return mongoose.model('Person', personSchema)
}
const getAllPersons = (Person) => {
  Person
    .find({})
    .then(persons => {
      console.log(persons)
    })
    .catch((error) => {
      console.log(`${error}`)
    })
    .finally(() => {
      mongoose.connection.close()
    })
}

const addPerson = (Person, name, number) => {
  const person = new Person({
    name,
    number
  })

  person
    .save()
    .then(() => {
      console.log(`${name} saved!`)
    })
    .catch(error => {
      //To check if unique error throwed by mongodb.
      if (error && error.code === 11000) {
        console.log('Person`s name must be unique')
      }
      else
        console.log(`${error}`)

    })
    .finally(() => {
      mongoose.connection.close()
    })
}
const mainFunc = async () => {
  const Person = initializeModel()

  //To make unique field work - this is the solution provided by mongoose documentation.
  await Person.init()

  if (process.argv.length === NUM_OF_VALUES_FOR_GET_REQUESTS) {
    getAllPersons(Person)
  }
  else {
    addPerson(Person, ((process.argv.length) >= NUM_OF_VALUES - 1) ? process.argv[Indexes.NAME] : null,
      ((process.argv.length) >= NUM_OF_VALUES) ? process.argv[Indexes.NUMBER] : null)

  }

}
mainFunc()

