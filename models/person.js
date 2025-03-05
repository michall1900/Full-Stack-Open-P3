
const mongoose = require('mongoose');


let Person = null

/**
 * Validates a phone number to ensure it meets the following criteria:
 * - It is not empty.
 * - It has a length of at least 8 characters.
 * - It matches the pattern of 2 or 3 digits followed by a hyphen and then one or more digits.
 *
 * @param {string} number - The phone number to validate.
 * @returns {boolean} - Returns true if the number is valid, otherwise false.
 */
const customNumberValidation = (number)=>{
    return number && number.length >= 8 && number.match(/^[0-9]{2,3}-[0-9]+$/)
}


/**
 * Creates a Mongoose schema for the Person model.
 * 
 * The schema includes the following fields:
 * - `name`: A string that must be unique, required, and match a specific pattern.
 *   The pattern enforces that the name should start with an uppercase letter followed by lowercase letters,
 *   and can include multiple words separated by spaces. The minimum length is 3 characters.
 * - `number`: A string that is required and must pass a custom validation function.
 *   The validation ensures that the number starts with 2-3 digits, followed by a hyphen, and then more digits.
 *   The number should be with a minimum length of 8 characters.
 * 
 * @returns {mongoose.Schema} The Mongoose schema for the Person model.
 */
const createSchema = ()=>{
    return new mongoose.Schema({
        name:{
            type: String,
            unique: true,
            required: true,
            match: [/^[A-Z][a-z]*([ ][A-Z][a-z]*)*$/, "The name should start with an uppercase letter followed by lowercase letters, separated by a space. No numbers at all or spaces at the start/end."],
            minLength: 3
        },
        number:{
            type:String,
            required: [true, "Number is missing"],
            validate:{
                validator: customNumberValidation,
                message: props => `${props.value} is not a valid phone number! A valid phone number should start with 2-3 digits, followed by a hyphen, and then more digits.`
            }
        }
    })
        
}
/**
 * Configures the given Mongoose schema to transform the JSON output.
 * 
 * This function modifies the `toJSON` method of the provided schema to:
 * - Convert the `_id` field to a string and rename it to `id`.
 * - Remove the `_id` and `__v` fields from the JSON output.
 * 
 * @param {mongoose.Schema} personSchema - The Mongoose schema to configure.
 */
const setToJsonSchema = (personSchema) =>{
    personSchema.set('toJSON',{
        transform: (_, receivedObject)=>{
            receivedObject.id = receivedObject._id.toString()
            delete receivedObject._id
            delete receivedObject.__v
        }
    })
}

/**
 * Initializes the Person model with a predefined schema.
 *
 * @returns {mongoose.Model} The initialized Person model.
 */
const initializeModel = () =>{
    const personSchema = createSchema()
    setToJsonSchema(personSchema)
    return mongoose.model('Person', personSchema)
}

/**
 * Asynchronously connects to the MongoDB database using the connection string
 * specified in the environment variable `MONGO_URI`.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Resolves when the connection is successfully established.
 * @throws {Error} Throws an error if the connection fails.
 */
const connectMongoose = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB.")
}

/**
 * Asynchronously retrieves the Person model. If the model is not already initialized,
 * it sets the mongoose strictQuery option to false, connects to the mongoose database,
 * initializes the Person model, and waits for the model to be initialized.
 *
 * @returns {Promise<Object>} A promise that resolves to the Person model.
 * @throws {Error} Throws an error if the model retrieval fails.
 */
const getPersonModel = async () =>{

    if(!Person){
        mongoose.set('strictQuery', false)
        await connectMongoose()
        Person = initializeModel()
        await Person.init()
    }

    return Person
}

module.exports = {getPersonModel}