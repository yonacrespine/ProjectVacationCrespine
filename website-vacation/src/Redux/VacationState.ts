import { createStore } from "redux";
import VacationsModel from "../02-Models/VacationsModel";





export class VacationState{
    public vacations: VacationsModel[]= []
   
    
   
    
}

export const vacationActionType={
    FetchVacation: "FetchVacation",
    AddVacation: "AddVacation",
    UpdateVacation: "UpdateVacation",
    DeleteVacation: "DeleteVacation",
    Follow: "Follow", 
    UnFollow: "UnFollow",

   
}

export interface VacationAction{
    type: string
    payload: any
}

export function vacationReducer(currentState:VacationState, action: VacationAction):VacationState{
    const newState= {...currentState}

    switch (action.type){
        case vacationActionType.FetchVacation:
            newState.vacations=action.payload
            break

        case vacationActionType.AddVacation:
            newState.vacations.push(action.payload)
           
            break

        case vacationActionType.UpdateVacation: 
        const indexUpdate= newState.vacations.findIndex(v=> v.vacationID===action.payload.vacationID)
        if(indexUpdate>=0){
            newState.vacations[indexUpdate]= action.payload
        }
            break

        case vacationActionType.DeleteVacation:
            const indexDelete= newState.vacations.findIndex(v=>v.vacationID===action.payload)
            if(indexDelete>=0){
                newState.vacations.splice(indexDelete,1)
            }
            break

            case vacationActionType.Follow:
          
            const indexFollow= newState.vacations.findIndex(v=>v.vacationID===action.payload.vacationID)
            
            if(indexFollow>=0){
               
            
                newState.vacations[indexFollow].follow=action.payload.userIds
             
            }
            break

        
            case vacationActionType.UnFollow:
          
            const indexunFollow= newState.vacations.findIndex(v=>v.vacationID===action.payload.vacationID)
            
            if(indexunFollow>=0){
               
            
              newState.vacations[indexunFollow].follow.filter(id => id !==action.payload.userID)
           
            }
            break

           
    
    }

    return newState
}


export const vacationStore= createStore(vacationReducer)