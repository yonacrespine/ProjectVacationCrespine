import { NextFunction } from "connect";
import { Request, Response } from "express";





function catchAll(err: any, request: Request, response: Response, next: NextFunction){
    console.log(err.message)

    response.status(err.status).send(err.message)
}

export default catchAll