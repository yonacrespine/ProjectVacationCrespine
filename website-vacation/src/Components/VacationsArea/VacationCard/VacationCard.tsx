import { NavLink, useNavigate } from "react-router-dom";
import VacationsModel from "../../../02-Models/VacationsModel";
import "./VacationCard.css";
import FollowersNumber from "../FollowersNumber/FollowersNumber";
import UsersModel from "../../../02-Models/UsersModel";


import like from "../../../Assets/images/like.png"
import unlike from "../../../Assets/images/heart.png"
import edit from "../../../Assets/images/pencil.png"
import myVacationService from "../../../03-Service/VacationsService";

import bin from "../../../Assets/images/delete.png"

import { clickFollow, clickUnFollow } from "../FourVacations/FourVacations";
import HighlightText from "../../HomeArea/HighlightText/HighlightText";
import Weather from "../Weather/Weather";



interface VacationCArdProps{
vacation : VacationsModel
user: UsersModel
searchTerm?: string;
}
function VacationCard(props:VacationCArdProps): JSX.Element {

  const navigate= useNavigate()

  
    return (
        <div className="VacationCard" id={"vacation"+ props.vacation.vacationID}>
			
            <div  className="card mb-3 cardVacation" style={{width: "600px", height:"360.6px", display:"flex"}}>
        
           
            
  <div className="row g-0  container-fluid " >
    <div className=" col-xs-12 col-md-6 eraseBootsrapEffect">
      <NavLink to={"/vacations/vacation-details/" + props.vacation?.vacationID}>
      <img src={props.vacation.imageName?`http://localhost:3001/vacations/images/${props.vacation.imageName}` :""} className="img-fluid rounded-start" alt="..." style={{width: "300px", height:"360px"}}/>
      </NavLink>
   
    </div>
    <div className=" col-xs-12 col-md-6 eraseBootsrapEffect">
      <div className="card-body">
        <h5 className="card-title" dangerouslySetInnerHTML={{ __html: HighlightText(props.vacation.destination, props.searchTerm) }}/>
        <Weather destination={props.vacation.destination} />

        <p className="card-text">{props.vacation.description}</p>
        <p className="card-text">📆From: {props.vacation.arrivalDate.toLocaleString()}</p>
        <p className="card-text">📆To: {props.vacation.departureDate.toLocaleString()}</p>
        <p className="card-text">Price: {props.vacation.price} $</p>

       
        {
    props.user && props.user.role==="Admin" && <>
<NavLink to={"/vacations/edit-vacation/" + props.vacation.vacationID}><img  className="img-fluid" src={edit } alt="diamond" style={{height:"24px",width:"24px", objectFit: "cover"}}/></NavLink>

<NavLink to="#" onClick={async()=> { if (window.confirm("Are you sure you want to delete this vacation?")){ await myVacationService.deleteVacation(props.vacation.vacationID)
navigate("/vacations")}}}><img  className="img-fluid" src={bin} alt="diamond" style={{height:"33px",width:"33px"}}/></NavLink>
    </>
}
{ props.vacation && props.vacation.follow && props.user && props.user.role==="User" &&  <>
<div className="d-flex align-items-center">

{
  !props.vacation.follow.includes( props.user.userID) &&
  <div id={"like"+props.vacation.vacationID}>
 <button className="buttonLike" onClick={async()=>{clickFollow(props.vacation.vacationID)}}><img  className="img-fluid" src={like } alt="diamond" style={{height:"35px",width:"35px"}}/></button> 
 </div>
}
  
{
 props.vacation.follow.includes( props.user.userID) &&
  <div  id={"like"+props.vacation.vacationID}>
<button className="buttonLike" onClick={async() => clickUnFollow(props.vacation.vacationID)}><img  className="img-fluid" src={unlike } alt="diamond" style={{height:"30px",width:"30px"}}/></button>

</div>}



<FollowersNumber vacId={props.vacation?.vacationID}/>


</div>

</>}
      </div>
    </div>
  </div>
</div>
            
       

            

        </div>
    );
}

export default VacationCard;
