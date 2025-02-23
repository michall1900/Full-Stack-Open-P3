const express = require('express');
const app = express();

app.use(express.json())
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
app.get('/info', (_, res)=>{
    res.send(
        `<h1>Phonebook</h1>
        <p>The phonebook has info for ${persons.length} people</p>
        <p>${(new Date()).toString()}</p>`
    )
})

app.get('/api/persons',(_, res)=>{
    res.json(persons);
})

app.get('/api/persons/:id',(req, res)=>{
    const id = req.params.id;
    const person = persons.find(person => person.id === id);

    if(person)
        res.json(person);
    else
        res.status(404).send(`<p style="color:red;"> Error: There is no person with id = ${id}.</p>`);
})

app.delete('/api/persons/:id',(req, res)=>{
    const id = req.params.id;
    persons = persons.filter((person)=> person.id!= id);
    res.status(204).end();
})

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log(`Listen on port ${PORT}`);
})