import { NextFunction, Request, Response } from "express";
import cyber from "../2-untils/cyber";
import { UnauthorizedErrorModel } from "../4-Models/errorModel";




async function verifyLoggedIn(request:Request ,response:Response, next:NextFunction){
    try{

        const isTokenVAlid= await cyber.verifyTokenValid(request)
        if(isTokenVAlid){
            next()
        }
        else{
            throw new UnauthorizedErrorModel("you need to log in ")
        }


    }
    catch(err:any){
        next (err)
    }
}

export default verifyLoggedIn