/**
 * Middleware to check if the request body exists.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next middleware function.
 */
module.exports = (req, res, next)=>{
    if(!req.body){
        const error= new Error("The content is missing.")
        error.status= 400
        return next(error)
    }
    next()
}