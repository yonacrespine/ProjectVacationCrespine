import express, { NextFunction, Request, Response } from "express"

import CredentialsModel from "../4-Models/credentialsModel"
import UsersModel from "../4-Models/usersModel"
import authLogic from "../5-logic/authLogic"

const router= express.Router()

router.post("/vacation/register",async(request:Request, response:Response, next:NextFunction)=>{
    try{

        const user= new UsersModel(request.body)
       const token= await authLogic.register(user)

        response.status(201).json(token)
    }
    catch(err:any){
        next(err)
    }
})

router.post("/vacation/login", async(request:Request, response:Response, next:NextFunction)=>{
    try{
        const credentials= new CredentialsModel(request.body)
        const token= await authLogic.login(credentials)
        response.json(token)
    }
    catch(err:any){
        next(err)
    }
})

export default router