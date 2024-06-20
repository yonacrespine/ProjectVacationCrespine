import { ButtonHTMLAttributes, SetStateAction, useEffect, useState } from "react";
import "./FourVacations.css";
import VacationsModel from "../../../02-Models/VacationsModel";

import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import UsersModel from "../../../02-Models/UsersModel";

import { authStore } from "../../../Redux/AuthState";

import myVacationService from "../../../03-Service/VacationsService";
import FollowersNumber from "../FollowersNumber/FollowersNumber";

import like from "../../../Assets/images/like.png"
import unlike from "../../../Assets/images/heart.png"
import edit from "../../../Assets/images/pencil.png"
import notify from "../../../03-Service/Notify";
import bin from "../../../Assets/images/delete.png"

import { createRoot } from "react-dom/client";


 export async function clickFollow(vacationId:number){
    try{
        
        await myVacationService.follow(vacationId)
       const myButton= createRoot(document.getElementById("like"+vacationId))
      
        myButton.render(<button className="buttonLike" onClick={async()=>{clickUnFollow(vacationId)}}><img  className="img-fluid" src={unlike } alt="diamond" style={{height:"30px",width:"30px"}}/></button>)
       
 
        
    }
    catch(err:any){
        alert(err.message)
    }
}

  export async function clickUnFollow(vacationId:number){
    try{
        
        await myVacationService.unFollow(vacationId)

        const myButton= createRoot(document.getElementById("like"+vacationId))
        myButton.render(<button className="buttonLike" onClick={async()=>{clickFollow(vacationId)}}><img  className="img-fluid" src={like } alt="diamond" style={{height:"35px",width:"35px"}}/></button>)
      
        const whichPage=document.getElementById("idFavories")
      
        if(whichPage){
           
            let d= document.getElementById("vacation"+vacationId)
            d.remove()
        }
        
   
    }
    catch(err:any){
        alert(err.message)
    }
}



function FourVacations(): JSX.Element {

    const [vacations, setVacations]= useState<VacationsModel[]>([])


    const [user, setUser]= useState<UsersModel>()
    const navigate= useNavigate()

   
   
    

    useEffect(()=>{
        myVacationService.get4Vacations()
        .then((vacs: SetStateAction<VacationsModel[]>)=>{setVacations(vacs)
       
     })
        .catch(err=>notify.errorMsg(err))

        setUser(authStore.getState().user)

    },[])




    


    return (
        <div className="FourVacations">
			{vacations.map((vac)=> (
            
            <div  key={vac.vacationID} className="card" style={{width: "22rem", height:"490px"}}>

            <NavLink to={"/vacations/vacation-details/" + vac?.vacationID}>
<img src={vac.imageName?`http://localhost:3001/vacations/images/${vac.imageName}` :""} className="card-img-top" alt="..." height={"190px"}/>
            </NavLink>
<div className="card-body">
<h5 className="card-title">{vac.destination}</h5>
<p className="card-text">{vac.description}</p>
<p className="card-text">📆From: {vac.arrivalDate.toLocaleString()}.</p>
<p className="card-text">📆To: {vac.departureDate.toLocaleString()}.</p>
<p className="card-text">Price: {vac.price} $</p>

{
    user && user.role==="Admin" && <>
<NavLink to={"/vacations/edit-vacation/" + vac.vacationID}><img  className="img-fluid" src={edit } alt="diamond" style={{height:"24px",width:"24px"}}/></NavLink>
<NavLink to="#" onClick={async()=>{  
        const confirmDelete = window.confirm("Are you sure you want to delete this vacation?");
        if (!confirmDelete) return;
        await myVacationService.deleteVacation(vac.vacationID)
        navigate("/vacations")}}><img  className="img-fluid" src={bin} alt="diamond" style={{height:"33px",width:"33px"}}/></NavLink>
    </>
}
{ user && user.role==="User" &&  <>


<div className="d-flex align-items-center">
    
{
  !vac.follow?.includes( user.userID) &&  

<div id={"like"+vac.vacationID}>
<button className="buttonLike" onClick={async()=>{clickFollow(vac.vacationID)}}><img  className="img-fluid" src={like } alt="diamond" style={{height:"30px",width:"30px"}}/></button>

</div>
  }
{
  vac.follow?.includes(user.userID) && 

<div  id={"like"+vac.vacationID}>
<button className="buttonLike" onClick={async()=>{clickUnFollow(vac.vacationID)}}><img  className="img-fluid" src={unlike } alt="diamond" style={{height:"28px",width:"28px"}}/></button>

</div>

  }


<FollowersNumber vacId={vac.vacationID} />

</div>
</>}



</div>

</div>
        
        ))}

            
        </div>
    );
}


export default FourVacations;







