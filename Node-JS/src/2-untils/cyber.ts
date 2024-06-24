import jwt from "jsonwebtoken"
import UsersModel from "../4-Models/usersModel"
import { Request } from "express"
import * as crypto from "crypto";

// test gitattr
const secretKey= "IloveTheFish"

 function getNewToken(user:UsersModel):string{
   const container= {user}

    const options= {expiresIn: "3h"}

    const token= jwt.sign(container, secretKey, options)

    return token
}

function verifyTokenValid(request: Request):Promise<boolean>{

    return new Promise<boolean>((resolve, reject)=>{

        try{
            const header= request.header("authorization")

            if(!header) {
                resolve(false)
                return 
            }
    
            const token= header.substring(7)
    
            if(!token){
                resolve(false)
                return 
            }
    
            jwt.verify(token, secretKey, err=>{
    
                if(err){
                    resolve(false)
                    return
                }
    
                resolve(true)
            })
        }
        catch(err:any){
        reject(err)
        }

     
    })
}


const salt= "MyCoolProject"



function hash(plainText:string):string{

    if(!plainText) return null


const hashedText= crypto.createHmac("sha512", salt).update(plainText).digest("hex")

    return hashedText

}



export default {
    getNewToken, verifyTokenValid, hash
}
