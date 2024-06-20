import express, { NextFunction, Request, Response } from "express"
import vacationLogic from "../5-logic/vacationLogic"
import VacationsModel from "../4-Models/vacationsModel"
import verifyLoggedIn from "../3-middleware/verifyLoggedIn"
import jwt from "jsonwebtoken"
import UsersModel from "../4-Models/usersModel"
import path from "path"
import axios from "axios"
import FollowModel from "../4-Models/followModel"
import ContactsModel from "../4-Models/contactsModel"
import { request } from "http"





const router= express.Router()


router.get("/vacations", async(request: Request, response :Response, next: NextFunction)=>{
console.log("get all vacation node")
    try{
        const vacations = await vacationLogic.getAllVacation()

        response.json(vacations)
    }
    catch(err: any){
        next(err)
    }

   
})

router.get("/vacations/:id",verifyLoggedIn ,async(request: Request, response :Response, next: NextFunction)=>{

    try{
        const id= +request.params.id
        const vacation= await vacationLogic.getOneVacation(id)
        
        response.json(vacation)
    }
    catch(err:any){
        next(err)
    }


})

router.post("/vacations/add-vacation",verifyLoggedIn,async(request: Request, response :Response, next: NextFunction)=>{

    try{

            // take uploaded file, and set it to the body

            request.body.image= request.files?.image

        const vacation= new VacationsModel(request.body)
        

        const userId= getUserId(request)


        const addedvacation= await vacationLogic.addVacation(vacation, userId)
        response.status(201).json(addedvacation)
    }
    catch(err:any){
        next(err)
    }


})

router.put("/vacations/edit-vacation/:vacationId",verifyLoggedIn,async(request: Request, response :Response, next: NextFunction)=>{

    try{
         
            // take uploaded file, and set it to the body

            request.body.image= request.files?.image

        const vacationId= +request.params.vacationId
        request.body.vacationID= vacationId

        const userId= getUserId(request)
       console.log( "cest le userID"+ userId)


        const vacation = new VacationsModel(request.body)
    
       
        const updatedvacation= await vacationLogic.updateVacation(vacation)
        response.json(updatedvacation)
    }
    catch(err:any){
        next(err)
    }
 
})

router.delete("/vacations/:id",verifyLoggedIn,async(request: Request, response :Response, next: NextFunction)=>{

    try{
        const id= +request.params.id
    
        await vacationLogic.deleteVacation(id)
        response.sendStatus(204)
    }
    catch(err:any){
        next(err)
    }

})


router.post("/vacations/follow/:vacationId",verifyLoggedIn,async(request: Request, response :Response, next: NextFunction)=>{

    try {
        const vacationId = +request.params.vacationId;
        const userId = getUserId(request);
       
        const follow = new FollowModel(userId,vacationId)
       const addedFollow= await vacationLogic.follow(follow);
        response.json(addedFollow)
    } catch (err: any) {
        next(err);
    }

})

router.delete("/vacations/unfollow/:vacationId",verifyLoggedIn,async(request: Request, response :Response, next: NextFunction)=>{

    try {
        const vacationId = +request.params.vacationId;
        const userId = getUserId(request);

        const follow = new FollowModel(userId,vacationId)
       

       await vacationLogic.unFollow(follow);
        response.json(userId)
    } catch (err: any) {
        next(err);
    }

})





router.get("/vacations/images/:imageName", async(request:Request, response:Response, next: NextFunction)=>{

    try{
            const imageName= request.params.imageName

            // __dirname contains the full path of our current folder 
            const absolutePath= path.join(__dirname,"..","1-assets","images",imageName)

            response.sendFile(absolutePath)
    }
    catch(error:any){
        next(error)
    }
})






 function getUserId(request :Request):number{

    try{
        const header= request.header("authorization")
    
        console.log( "header:" +header)
 
         const token= header.substring(7)
         
      const userToken= jwt.decode(token)
      const json= JSON.stringify(userToken)
      const userId= JSON.parse(json).user.userID

        return userId
    }
    catch(err:any){
        console.log("erreur")
    }



 }


    router.get('/maps/:address', async (request:Request, response:Response, next: NextFunction) => {
      
    
        try {
            const address = request.params.address
            const apiResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    key: 'AIzaSyA6fBuGVltAz8BhYNZTataZwA2VCo2tFnk',
                    address: address,
                   
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error('Error retrieving data from Google Maps API:', error);
            response.status(500).json({ error: 'Error retrieving data from Google Maps API' });
        }
    });




    router.get('/weather', async (req, res) => {
        const { lat, lng } = req.query;
        if (!lat || !lng) {
            return res.status(400).send('Latitude and longitude are required');
        }
    
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
                params: {
                    latitude: lat,
                    longitude: lng,
                    hourly: 'temperature_2m'
                }
            });
            res.json(response.data);
        } catch (error) {
            console.error('Error retrieving weather data:', error);
            res.status(500).send('Error retrieving weather data');
        }
    });





    router.post("/contact",async(request: Request, response :Response, next: NextFunction)=>{

        try{
    
    
            const contact= new ContactsModel(request.body)
            
    
          
    
            const addedMessage= await vacationLogic.addMessage(contact)
            response.status(201).json(addedMessage)
        }
        catch(err:any){
            next(err)
        }
    
    
    })


export default router