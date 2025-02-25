
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

persons.forEach((person, index)=>{
    idsSet.add(person.id)
})

const validateName = (name) => {
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

const generateId = ()=>{
    let id;
    do{
        id = String(Math.floor(Math.random()*Number.MAX_SAFE_INTEGER));
    }while(idsSet.has(id));

    return id;
}
exports.getPersonsSize= ()=>{
    return persons.length;
}
exports.addNewPerson = (name, number)=>{
    validateName(name);
    validateNumber(number);
    const id = generateId()
    const newPerson = {id, name, number}
    persons.push(newPerson)
    idsSet.add(newPerson.id)
    return newPerson
}
exports.getPersons = ()=>{
    return [...persons]
}
exports.getPerson = (id)=>{
    return persons.find((person)=>person.id===id);
}

exports.deletePerson = (id)=>{
    persons = persons.filter((person)=>person.id!==id)
    idsSet.delete(id)
}

