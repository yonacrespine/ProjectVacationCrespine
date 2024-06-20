import Joi from "joi"
import { UploadedFile } from "express-fileupload"

class VacationsModel{
    public vacationID: number
    public destination: string
    public description: string
    public placesToVisit: string
    public arrivalDate: Date
    public departureDate: Date
    public price: number
    public image: UploadedFile
    public imageName:string
   
    public follow:string

    


    public constructor(vacation: VacationsModel){
        this.vacationID= vacation.vacationID
        this.destination= vacation.destination
        this.description= vacation.description
        this.placesToVisit= vacation.placesToVisit
        this.arrivalDate= vacation.arrivalDate
        this.departureDate= vacation.departureDate
        this.price= vacation.price
        this.image= vacation.image
        this.imageName= vacation.imageName
        this.follow= vacation.follow
       

    }

    public static validationSchema= Joi.object({
        vacationID: Joi.number().optional(),
        destination: Joi.string().required().min(3).max(25),
        description: Joi.string().required().min(6).max(300),
        placesToVisit: Joi.string().required().min(4).max(200),
        arrivalDate: Joi.string().required().min(5).max(30),
        departureDate: Joi.string().required().min(5).max(30),
        price: Joi.number().required().min(0),
        image: Joi.object().optional(),
        imageName: Joi.string().optional(),
        follow: Joi.array().optional()
       

       

    })


    public validation():string{
        const result= VacationsModel.validationSchema.validate(this)
         return result.error?.message
    }

}

export default VacationsModel















