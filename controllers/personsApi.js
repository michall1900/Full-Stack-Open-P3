const persons = require('../modules/persons')


exports.getPersons = (req,res) =>{
    res.json(persons.getPersons());
}

exports.getPerson = (req, res) =>{
    const id =req.params.id
    const person = persons.getPerson(id);
    
    if(person)
        res.json(person);
    else
        res.status(404).json({error: `Error: There is no person with id = ${id}.`});
}

exports.deletePerson = (req, res)=>{
    persons.deletePerson(req.params.id)
    res.status(204).end();
}

exports.postPerson = (req, res)=>{
    try{
        if(!req.body)
            throw new Error ("The content is missing.")

        const person =persons.addNewPerson(req.body.name, req.body.number)        
        res.json(person);
    }
    catch (error){
        res.status(400).json({error: `${error}`})
    }
}



