import { useEffect, useState } from "react";
import "./UpComingVacations.css";
import VacationsModel from "../../../02-Models/VacationsModel";
import myVacationService from "../../../03-Service/VacationsService";
import notify from "../../../03-Service/Notify";
import VacationCard from "../VacationCard/VacationCard";
import { authStore } from "../../../Redux/AuthState";
import UsersModel from "../../../02-Models/UsersModel";


function UpComingVacations(): JSX.Element {


    const[ vacations, setVacations]= useState<VacationsModel[]>([])
  const [user, setUser] = useState<UsersModel>();


    useEffect(()=>{

        myVacationService.getUpcomingVacations()
        .then((vacs)=>setVacations(vacs))
   
        .catch(err=>notify.errorMsg(err))

    setUser(authStore.getState().user);
   

    },[])



    return (
        <div className="UpComingVacations">
			{vacations  && vacations.map(v=> (
                <div key={v.vacationID} className="vacations">
                    <VacationCard key={v.vacationID} vacation={v} user={user} />
                </div>
        
      ))}
      {!vacations && <> <span> We don't have vacations for this moment. </span></>}
    



    
        </div>
    );
}

export default UpComingVacations;
