import { useForm } from "react-hook-form";
import "./EditVacation.css";
import VacationsModel from "../../../02-Models/VacationsModel";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import useVerifyLoggedIn from "../../../03-Service/useVerifyLoggedIn";
import myVacationService from "../../../03-Service/VacationsService";
import notify from "../../../03-Service/Notify";
import { vacationActionType, vacationStore } from "../../../Redux/VacationState";



function EditVacation(): JSX.Element {

    useVerifyLoggedIn()
    

    const {register, handleSubmit, setValue, formState, watch}= useForm<VacationsModel>()
    const params= useParams()
    const [vacation, setVacation]= useState<VacationsModel>()
    const navigate= useNavigate()

    const watchArrivalDate = watch("arrivalDate"); // Watch the arrivalDate field to pass it to departureDate validation

    useEffect(()=>{
        const id= +params.id
        myVacationService.getOneVacation(id)
        .then(vac=>{
            setVacation(vac)
            setValue("vacationID", vac.vacationID)
            setValue("destination", vac.destination)
            setValue("description", vac.description)
            setValue("placesToVisit", vac.placesToVisit)
            setValue("arrivalDate", vac.arrivalDate)
            setValue("departureDate", vac.departureDate)
            setValue("price", vac.price)
           
        })
    },[])

    async function send(vacation:VacationsModel){
        try{
           await myVacationService.updateVacation(vacation)
          
            
            notify.successMsg("The vacation has been updated")
           navigate("/vacations")
           window.location.reload()
        


        }
        catch(error:any){
            notify.errorMsg(error)
        }

    }

    return (
        <div className="EditVacation">
		
<form className="form-add-vacation" onSubmit={handleSubmit(send)}>
           
           <p className="title">Edit Vacation</p>
       
       <label>
           <input className="input" type="text" placeholder="" {...register("destination", VacationsModel.destinationValidation)}/>
           <span>Destination</span>
           <span className="error">{formState.errors.destination?.message}<br/></span>

       </label>

       <label>
           <textarea className="input" placeholder="" {...register("description", VacationsModel.descriptionValidation)}/>
           <span>Description</span>
           <span className="error">{formState.errors.description?.message}<br/></span>

       </label>
  
           
   <label>
       <input className="input" type="text" placeholder=""{...register("placesToVisit", VacationsModel.placeToVisitValidation)} />
       <span>Place to Visit</span>
       <span className="error">{formState.errors.placesToVisit?.message}<br/></span>

   </label> 
       
   <label>
       <input className="input" type="date"  placeholder=""  {...register("arrivalDate", VacationsModel.arrivalDateValidation)}/>
       <span>Arrival Date</span>
       <span className="error">{formState.errors.arrivalDate?.message}<br/></span>

   </label>
   <label>
       <input className="input" type="date" placeholder="" {...register("departureDate",{...VacationsModel.departureDateValidation,
                            validate: value => {const arrivalDate = watchArrivalDate;
                                return VacationsModel.departureDateValidation.validate(value, { arrivalDate });
                            }})}/>
       <span>Departure Date</span>
       <span className="error">{formState.errors.departureDate?.message}<br/></span>

   </label>
   <label>
       <input className="input" type="number" placeholder="" {...register("price", VacationsModel.priceValidation)}/>
       <span>Price</span>
       <span className="error">{formState.errors.price?.message}<br/></span>

   </label>
   <img src={vacation?.imageName?`http://localhost:3001/vacations/images/${vacation.imageName}` :""} style={{width:"150px",height:"100px"}} alt=""/>
   <label>
       <input className="input" type="file" accept="image/*" {...register("image")}/>
       <span>Change your image</span>
   </label>
   <button className="submit-vacation">Edit Vacation</button>
  
</form>
        </div>
    );
}

export default EditVacation;
