import Joi from "joi"
import RoleModel from "./roleModel"


class UsersModel{
    public userID: number
    public firstname: string
    public lastname: string
    public username: string
    public password: string
    public role: RoleModel

    public constructor(user:UsersModel){
        this.userID= user.userID
        this.firstname= user.firstname
        this.lastname= user.lastname
        this.username= user.username
        this.password= user.password
        this.role= user.role
    }

    public static validationSchema= Joi.object({
        userID: Joi.number().optional().integer().positive(),
        firstname: Joi.string().required().min(3).max(30),
        lastname: Joi.string().required().min(3).max(30),
        username: Joi.string().email().required().min(2).max(30),
        password: Joi.string().required().min(4).max(255),
        role: Joi.forbidden()


    })

    public validation():string{
        const result= UsersModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default UsersModel