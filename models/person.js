
const mongoose = require('mongoose');


let Person = null

/**
 * Creates a Mongoose schema for a person.
 * 
 * The schema defines the following fields:
 * - `name`: A string that is unique, required, and must start with an uppercase letter followed by lowercase letters. 
 *           It can contain multiple words separated by spaces, but no numbers or spaces at the start/end.
 * - `number`: A string that is required and must start with digits, followed by optional groups of digits each preceded by a hyphen.
 * 
 * @returns {mongoose.Schema} The Mongoose schema for a person.
 */
const createSchema = ()=>{
    return new mongoose.Schema({
        name:{
            type: String,
            unique: true,
            required: "The person's name is required",
            match: [/^[A-Z][a-z]*([ ][A-Z][a-z]*)*$/, "The name should start with an uppercase letter followed by lowercase letters, separated by a space. No numbers at all or spaces at the start/end."]
        },
        number:{
            type:String,
            required: "Number is missing",
            match: [/^\d+(-\d+)*$/,"The number should start with digits, followed by optional groups of digits each preceded by a hyphen."]
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