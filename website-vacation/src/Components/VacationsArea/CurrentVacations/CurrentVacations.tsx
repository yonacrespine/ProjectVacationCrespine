import { useEffect, useState } from "react";
import "./CurrentVacations.css";
import VacationsModel from "../../../02-Models/VacationsModel";
import UsersModel from "../../../02-Models/UsersModel";
import myVacationService from "../../../03-Service/VacationsService";
import notify from "../../../03-Service/Notify";
import { authStore } from "../../../Redux/AuthState";
import VacationCard from "../VacationCard/VacationCard";

function CurrentVacations(): JSX.Element {



    const[ vacations, setVacations]= useState<VacationsModel[]>()
    const [user, setUser] = useState<UsersModel>();
  
  
      useEffect(()=>{
  
          myVacationService.getCurrentVacations()
          .then((vacs)=>setVacations(vacs))
     
          .catch(err=>notify.errorMsg(err))
  
      setUser(authStore.getState().user);
     
  
      },[])
  
    return (
        <div className="CurrentVacations">
			{vacations && vacations.map(v=> (
                <div key={v.vacationID} className="vacations">
                    <VacationCard key={v.vacationID} vacation={v} user={user} />
                </div>
        
      ))}
      {!vacations && <> <span>We don't have vacations for this moment. </span></>}
    
        </div>
    );
}

export default CurrentVacations;
