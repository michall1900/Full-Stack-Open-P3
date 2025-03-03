
const mongoose = require('mongoose');


let Person = null

const createSchema = ()=>{
    return personSchema = new mongoose.Schema({
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
const setToJsonSchema = (personSchema) =>{
    personSchema.set('toJSON',{
        transform: (_, receivedObject)=>{
            receivedObject.id = receivedObject._id.toString()
            delete receivedObject._id
            delete receivedObject.__v
        }
    })
}

const initializeModel = () =>{
    const personSchema = createSchema()
    setToJsonSchema(personSchema)
    return mongoose.model('Person', personSchema)
}

const connectMongoose = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB.")
}

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