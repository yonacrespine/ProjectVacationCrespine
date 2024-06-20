import { useEffect, useState } from "react";
import "./FollowersNumber.css";
import { vacationStore } from "../../../Redux/VacationState";
import VacationsModel from "../../../02-Models/VacationsModel";


interface VacationId{
    vacId: number
}
function FollowersNumber(props: VacationId): JSX.Element {


    const [totalFollow, setTotalFollow]= useState(0)

    useEffect(()=>{
        
        const index= vacationStore.getState().vacations.findIndex(v=> v.vacationID=== props.vacId)
        
        let oneVacation= vacationStore.getState().vacations[index].follow

  
      
        setTotalFollow(oneVacation?.length)
       
      


        const unsuscribe= vacationStore.subscribe(()=>{
      
         setTotalFollow(vacationStore.getState().vacations[index].follow?.length)
        })

         return ()=>{
            
            unsuscribe()
         }

        },[])

        

    return (
        <div className="FollowersNumber">
			{totalFollow}
        </div>
    );
}

export default FollowersNumber;


