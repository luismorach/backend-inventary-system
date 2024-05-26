import { NextFunction } from "express"

function validate(validation:any){
    return(req:Request,res:Response,next:NextFunction)=>{
        try{
            validation(req.body)
            next()
        }catch(error){
            next(error)
        }
    }
}
function createRegisterValidation(data:any){
     const { name, state } = data
    if(name==='a'){
        throw new Error("musb be unique");
        
    }
}
module.exports={
    validate,
    createRegisterValidation
}