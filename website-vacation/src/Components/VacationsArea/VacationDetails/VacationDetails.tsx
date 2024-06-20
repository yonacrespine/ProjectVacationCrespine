import { useNavigate, useParams } from "react-router-dom";
import "./VacationDetails.css";
import { useEffect, useState } from "react";
import VacationsModel from "../../../02-Models/VacationsModel";

import { NavLink } from "react-router-dom";
import useVerifyLoggedIn from "../../../03-Service/useVerifyLoggedIn";
import { authStore } from "../../../Redux/AuthState";
import UsersModel from "../../../02-Models/UsersModel";
import myVacationService from "../../../03-Service/VacationsService";
import FollowersNumber from "../FollowersNumber/FollowersNumber";
import Map from "../../HomeArea/Map/Map";


import like from "../../../Assets/images/like.png"
import unlike from "../../../Assets/images/heart.png"
import edit from "../../../Assets/images/edit.png"
import notify from "../../../03-Service/Notify";
import bin from "../../../Assets/images/bin.png"
import { clickFollow, clickUnFollow } from "../FourVacations/FourVacations";


function VacationDetails(): JSX.Element {

  useVerifyLoggedIn()

    const params= useParams()
    const [vacation, setVacation]= useState<VacationsModel>()
    const navigate= useNavigate()

    const [user, setUser]= useState<UsersModel>()
    useEffect(()=>{
        const id= +params.id
        myVacationService.getOneVacation(id)
        .then(vac=>setVacation(vac))
        .catch(err=>notify.errorMsg(err))

        setUser(authStore.getState().user)
    },[])

    return (
        <div className="VacationDetails">
			{vacation && <>
            
                <div  key={vacation.vacationID} className="card mb-3" style={{width: "900px", height:"400px"}}>
  <div className="row g-0">
    <div className="col-md-6">
     
      <img src={vacation.imageName?`http://localhost:3001/vacations/images/${vacation.imageName}` :""} className="img-fluid rounded-start" alt="..." style={{width: "400px", height:"400px"}}/>
     
   
    </div>
    <div className="col-md-6">
      <div className="card-body">
        <h5 className="card-title">{vacation.destination}</h5>
        <p className="card-text">{vacation.description}</p>
        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
        {
    user && user.role==="Admin" && <>
<NavLink to={"/vacations/edit-vacation/" + vacation.vacationID}><img  className="img-fluid" src={edit } alt="diamond" style={{height:"40px",width:"40px"}}/></NavLink>
<NavLink to="#" onClick={async()=>{ 
    const confirmDelete = window.confirm("Are you sure you want to delete this vacation?");
    if (!confirmDelete) return;
  await myVacationService.deleteVacation(vacation.vacationID)
navigate("/vacations")}}><img  className="img-fluid" src={bin} alt="diamond" style={{height:"33px",width:"33px"}}/></NavLink>
    </>
}
{ vacation && user && user.role==="User" &&  <>

<div className="d-flex align-items-center">
{
  !vacation.follow.includes( user.userID) &&
  <div id={"like"+vacation.vacationID}>
<button className="buttonLike" onClick={async()=>{clickFollow(vacation.vacationID)}}><img  className="img-fluid" src={like } alt="diamond" style={{height:"35px",width:"35px"}}/></button>

</div>}
{
  vacation.follow.includes(user.userID) &&
  <div  id={"like"+vacation.vacationID}>
  <button className="buttonLike" onClick={async()=>{clickUnFollow(vacation.vacationID)}}><img  className="img-fluid" src={unlike } alt="diamond" style={{height:"30px",width:"30px"}}/></button>
  
  </div>}

<FollowersNumber vacId={vacation.vacationID}/>
</div>
</>}
<span>|</span>
        <NavLink to="/home">Back to home</NavLink>
      </div>
    </div>
  </div>
</div>

<Map destination={vacation.destination}/> 
            </>}

            

          
        </div>
    );
}

export default VacationDetails;
