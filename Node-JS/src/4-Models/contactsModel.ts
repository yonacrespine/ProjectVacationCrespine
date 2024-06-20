
import Joi from "joi"


class ContactsModel{
  
    public name: string
    public email: string
    public message: string


    public constructor(contact: ContactsModel){
     
        this.name= contact.name
        this.email= contact.email
        this.message= contact.message
    }


    public static validationSchema= Joi.object({
    
        name: Joi.string().required().min(2).max(30),
        email: Joi.string().email().required().min(5).max(30),
        message: Joi.string().required().min(10).max(400)
    })

    public validation():string{
        const result= ContactsModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default ContactsModel