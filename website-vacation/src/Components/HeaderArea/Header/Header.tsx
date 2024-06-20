import { NavLink } from "react-router-dom";
import "./Header.css";

import iconHeader from "../../../Assets/images/iconHeader.png"

import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { useEffect, useState } from "react";
import UsersModel from "../../../02-Models/UsersModel";
import { authStore } from "../../../Redux/AuthState";

import { CSVLink, CSVDownload } from "react-csv";
import VacationsModel from "../../../02-Models/VacationsModel";
import { vacationStore } from "../../../Redux/VacationState";

import click from "../../../../src/Assets/images/touch.png"

function Header(): JSX.Element {



  const [user, setUser]= useState<UsersModel>()


  const vacations = vacationStore.getState()?.vacations || [];
  const csvData = [
    ["Destination" , "Followers"],
    ...vacations.map(v => [v.destination , v.follow.length])
]





useEffect(()=>{

    setUser(authStore.getState().user)
   
   
   

    const unsuscrible= authStore.subscribe(()=>{
        setUser(authStore.getState().user)
       
    })

    return ()=>unsuscrible()
    
},[])
    return (
        <div className="Header">
			
       
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand nav" to="/home"><h1> <img  className="img-fluid" src={iconHeader} alt="diamond" style={{height:"40px",width:"40px"}}/>Tripozo</h1></NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <NavLink to="/" className={"nav"}>HOME</NavLink>
        </li>
       

        <li className="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle drop" to="/vacations" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
           VACATIONS
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/vacations">Alls Vacations</NavLink></li>
            {user && user.role==="User" && <>
            <li><NavLink className="dropdown-item" to="/favories">My favories vacations</NavLink></li>
            <li><NavLink className="dropdown-item" to="/current-vacations">Current vacations</NavLink></li>
            <li><NavLink className="dropdown-item" to="/upcoming-vacations">Comming vacations</NavLink></li>
            
            </>}
           
            {user && user.role==="Admin" && <>
            <li><NavLink className="dropdown-item" to="/current-vacations">Current vacations</NavLink></li>
            <li><NavLink className="dropdown-item" to="/upcoming-vacations">Comming vacations</NavLink></li>

            </>}
            <li><hr className="dropdown-divider"/></li>
            
          </ul>
        </li>



        <li className="nav-item">
        <NavLink to="/gallery" className={"nav"}>GALLERY</NavLink>
        </li>
        { (!user || user.role !== "Admin") && <><li className="nav-item">
        <NavLink to="/contact" className={"nav"}>CONTACT</NavLink>
        </li> </>}
        { user &&
                user.role==="Admin" && <>
                 <li className="nav-item">
        <NavLink to="/vacations/add-vacation" className={"nav"}>ADD VACATION</NavLink>
        </li>

        <li className="nav-item">
        <NavLink to="/vacations/chart-vacation" className={"nav"}>REPORTS</NavLink>
        </li>

        <li className="nav-item">


        <CSVLink data={csvData} filename={"vacations.csv"} target="_blank" separator={","} className="csv">Download CSV file<img src={click} alt="click" style={{height:"30px",width:"30px"}} className="img-csv"/></CSVLink>
        </li>
                </>
            }

           
	
        
      </ul>

    <AuthMenu/>

    </div>
  </div>
 
</nav>


        </div>
    );
}

export default Header;
