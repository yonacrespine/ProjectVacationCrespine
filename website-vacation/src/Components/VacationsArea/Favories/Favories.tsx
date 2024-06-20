import { useEffect, useState } from "react";
import useVerifyLoggedIn from "../../../03-Service/useVerifyLoggedIn";
import "./Favories.css";
import VacationsModel from "../../../02-Models/VacationsModel";
import UsersModel from "../../../02-Models/UsersModel";
import myVacationService from "../../../03-Service/VacationsService";
import { authStore } from "../../../Redux/AuthState";

import VacationCard from "../VacationCard/VacationCard";
import notify from "../../../03-Service/Notify";
import { vacationActionType, vacationStore } from "../../../Redux/VacationState";



function Favories(): JSX.Element {


    useVerifyLoggedIn()

    const [vacations, setVacations]= useState<VacationsModel[]>([])
    const [user, setUser]= useState<UsersModel | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(true);






    useEffect(()=>{
       
        myVacationService.getLikedVacationsByUser(user?.userID ||0)
        .then(vacs=>{ setVacations(vacs)
        setUser(authStore.getState().user)
       
   })
       
        .catch(err=>notify.errorMsg(err))
        .finally(() => setIsLoading(false));

       

    },[user])

    

    if (isLoading) {
        return  <div className="d-flex justify-content-center  vh-100">
        <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      </div>; 
    }
    if (vacations.length === 0) {
        return <h1>You don't follow any vacation!</h1>;
    }




    return (
        <div className="Favories" id="idFavories">
             
			     {vacations.map((vac)=>  <VacationCard  key={vac.vacationID} vacation={vac} user={user} /> )}
 
        </div>
    );
}

export default Favories;
