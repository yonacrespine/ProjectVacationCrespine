import { useNavigate } from "react-router-dom";
import "./Logout.css";
import { useEffect } from "react";
import myAuthService from "../../../03-Service/AuthService";
import notify from "../../../03-Service/Notify";


function Logout(): JSX.Element {


    const navigate= useNavigate()

useEffect(()=>{

    myAuthService.logout()
    notify.successMsg("You are Logout")
    navigate("/login")
},[])
    return null 
}

export default Logout;
