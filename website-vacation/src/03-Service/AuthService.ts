import axios from "axios";
import UsersModel from "../02-Models/UsersModel";
import { myConfig } from "../01-Utils/Configs";
import { authActionType, authStore } from "../Redux/AuthState";
import CredentialsModel from "../02-Models/CredentialsModel";
import RoleModel from "../02-Models/RoleModel";

class AuthService{

    public async register(user: UsersModel):Promise<void>{
        const response= await axios.post<string>(myConfig.registerUrl, user)

        user.role= RoleModel.User

        const token= response.data

         

        authStore.dispatch({type: authActionType.Register, payload:token})
    }

    public async login(credentials:CredentialsModel):Promise<void>{
        const response= await axios.post<string>(myConfig.loginUrl, credentials)
        const token= response.data
        

        authStore.dispatch({type: authActionType.Login, payload:token})
    }

    public logout():void{
        authStore.dispatch({type: authActionType.Logout})
    }
}

 const myAuthService= new AuthService()

 export default myAuthService