
import UsersModel from "../02-Models/UsersModel";
import { createStore } from "redux";
import { jwtDecode } from "jwt-decode";

export class AuthState{
    public user: UsersModel= null
    public token: string= null


    public constructor(){
        this.token= sessionStorage.getItem("token")

        if(this.token){
            const container:{user:UsersModel}= jwtDecode(this.token)
            this.user= container.user
        }
      
    }
}

export const authActionType={
    Login: "Login",
    Register: "Register",
    Logout: "Logout"
}

export interface AuthAction{
    type: string
    payload?: any
}

export function authReducer(currentState= new AuthState(), action: AuthAction): AuthState{
    const newState= {...currentState}

    switch(action.type){
        case authActionType.Login:
        case authActionType.Register:
            newState.token= action.payload
            const container:{user:UsersModel}= jwtDecode(newState.token)
            newState.user= container.user
            sessionStorage.setItem("token", newState.token)
     
            break

        case authActionType.Logout:
            newState.token= null
            newState.user= null
            sessionStorage.removeItem("token")
            break
    }

    return newState
}

export const authStore= createStore(authReducer)