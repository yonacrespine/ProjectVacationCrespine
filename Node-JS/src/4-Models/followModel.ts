import Joi from "joi";
import { FollowErrorModel } from "./errorModel";

class FollowModel{
    // public vacationID: number
    // public userID: number


// public constructor(follow:FollowModel){
//     this.vacationID= follow.vacationID
//     this.userID= follow.userID
// }

public constructor(public userID:number, public vacationID:number){}

    public static ValidationSchema = Joi.object({
        userID: Joi.number().integer().positive().required(),
        vacationID: Joi.number().integer().positive().required()
    });

    public validate():void {
        const result = FollowModel.ValidationSchema.validate(this);
        if( result.error ) throw new FollowErrorModel( result.error.message );
    }
}



export default FollowModel