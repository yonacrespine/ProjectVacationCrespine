import { useEffect, useState } from "react";
import "./AuthMenu.css";
import UsersModel from "../../../02-Models/UsersModel";
import { authStore } from "../../../Redux/AuthState";

import { NavLink } from "react-router-dom";

import iconLogin from "../../../Assets/images/login.png"
import logout from "../../../Assets/images/logout (1).png"
import register from "../../../Assets/images/add-user (1).png"

function AuthMenu(): JSX.Element {


const [user, setUser]= useState<UsersModel>()

useEffect(()=>{

    setUser(authStore.getState().user)
   
    const unsuscrible= authStore.subscribe(()=>{
        setUser(authStore.getState().user)
       
    })

    return ()=>unsuscrible()
    
},[])


    return (
        <div className="AuthMenu d-flex justify-content-flex-end">

           
			{!user && <>
            
               
                <span >Hello guest !</span>
            <NavLink  className="iconLogin" to="/login" ><img  className="img-fluid" src={iconLogin} alt="iconLogin" style={{height:"35px",width:"35px"}}/> Login </NavLink>
            <span>|</span>
            <NavLink  className="iconLogin" to="/register"><img  className="img-fluid" src={register} alt="iconLogin" style={{height:"22px",width:"22px"}}/> Register</NavLink>
            
            </>}
            {user && <>
               
            <span >Hello {user.firstname} {user.lastname} !</span>
            <NavLink to="/logout"><img  className="img-fluid" src={logout } alt="diamond" style={{height:"40px",width:"40px"}}/></NavLink>
           
            </>}
          
            </div>
     
    );
}

export default AuthMenu;
