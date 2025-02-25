let persons =[
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

const idsSet = new Set();

persons.forEach((person)=>{
    idsSet.add(person.id);
})

const generateId = ()=>{
    let id;
    do{
        id = String(Math.floor(Math.random()*Number.MAX_SAFE_INTEGER));
    }while(idsSet.has(id));

    return id;
}

const validateName = (name)=>{
    if(!name)
        throw new Error("Name is missing");
    const regex = /^[A-Z][a-z]*([ ][A-Z][a-z]*)*$/;
    if(!regex.test(name))
        throw new Error("The name should start with an uppercase letter followed by lowercase letters, separated by a space. No numbers or spaces at the start/end.")
    if(persons.some((person)=>name==person.name))
        throw new Error(`The name ${name} is already in the phonebook, name must be unique.`)
}

const validateNumber = (number)=>{
    if(!number)
        throw new Error("Number is missing");
    const regex = /^\d+(-\d+)*$/;
    if(!regex.test(number))
        throw new Error("The number should start with digits, followed by optional groups of digits each preceded by a hyphen.")
    
}

const validateNewPerson = (body)=>{
    if(!body)
        throw new Error ("The content is missing.");

    validateName(body.name);
    validateNumber(body.number);
}

exports.getPersons = (req,res) =>{
    res.json(persons);
}

exports.getPerson = (req, res) =>{
    const id = req.params.id;
    const person = persons.find(person => person.id === id);

    if(person)
        res.json(person);
    else
        res.status(404).json({error: `Error: There is no person with id = ${id}.`});
}

exports.deletePerson = (req, res)=>{
    const id = req.params.id;
    persons = persons.filter((person)=> person.id!= id);
    idsSet.delete(id);
    res.status(204).end();
}

exports.postPerson = (req, res)=>{
    try{
        validateNewPerson(req.body);
        persons.push({
            id: generateId(),
            name: req.body.name,
            number: req.body.number
        })
        res.json(persons[persons.length-1]);
    }
    catch (error){
        res.status(400).json({error: `${error}`})
    }
}

exports.getPersonsSize = () =>{
    return persons.length
}


