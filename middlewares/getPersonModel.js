const {getPersonModel} = require('../models/person');

module.exports = async (req, res, next)=>{
    try{
        req.Person = await getPersonModel()
        next()
    }
    catch(error){
        error.status = 500
        next(error)
    }

}