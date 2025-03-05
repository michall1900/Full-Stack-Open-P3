
module.exports = (req, res, next)=>{
    if(!req.body){
        const error= new Error("The content is missing.")
        error.status= 400
        return next(error)
    }
    next()
}