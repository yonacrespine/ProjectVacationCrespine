import { NextFunction, Request, Response } from "express";
import { RouteNotFound } from "../4-Models/errorModel";




 function routeNotFound(request:Request, response:Response, next: NextFunction){

    const err= new RouteNotFound(request.originalUrl)

    next(err)
 }

 export default routeNotFound