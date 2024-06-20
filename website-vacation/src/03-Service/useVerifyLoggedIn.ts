import { useEffect } from "react"
import { authStore } from "../Redux/AuthState"
import { useNavigate } from "react-router-dom"
import notify from "./Notify"

function useVerifyLoggedIn(){

    const navigate= useNavigate()
    
    useEffect(()=>{
        if(!authStore.getState().token){
            notify.errorMsg("you are not logged in")
            navigate("/login")
        }

    },[])

}

export default useVerifyLoggedIn