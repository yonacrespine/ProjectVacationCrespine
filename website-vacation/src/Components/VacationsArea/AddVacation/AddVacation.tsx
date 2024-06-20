import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationsModel from "../../../02-Models/VacationsModel";
import { useNavigate } from "react-router-dom";

import useVerifyLoggedIn from "../../../03-Service/useVerifyLoggedIn";
import myVacationService from "../../../03-Service/VacationsService";
import notify from "../../../03-Service/Notify";

function AddVacation(): JSX.Element {

    useVerifyLoggedIn()

    const {register, handleSubmit, formState, watch}= useForm<VacationsModel>()
    const navigate= useNavigate()

    const watchArrivalDate = watch("arrivalDate"); // Watch the arrivalDate field to pass it to departureDate validation

async function send(vacation:VacationsModel){
    try{
        await myVacationService.addVacation(vacation)
        notify.successMsg("The new vacation has been recorded")
        navigate("/vacations")
        window.location.reload()
    }
    catch(error:any){
        notify.errorMsg(error)
    }
}




    return (
        <div className="AddVacation ">
		

            <form className="form-add-vacation" onSubmit={handleSubmit(send)}>
           
            <p className="title">New Vacation</p>
        
        <label>
            <input className="input" type="text" placeholder="" {...register("destination", VacationsModel.destinationValidation)}/>
            <span>Destination</span>
            <span className="error">{formState.errors.destination?.message}<br/></span>
        </label>

        <label>
            <textarea className="input"  placeholder="" {...register("description", VacationsModel.descriptionValidation)}/>
            <span>Description</span>
            <span className="error">{formState.errors.description?.message}<br/></span>

        </label>
   
            
    <label>
        <input className="input" type="text" placeholder=""{...register("placesToVisit", VacationsModel.placeToVisitValidation)} />
        <span>Place to Visit</span>
        <span className="error">{formState.errors.placesToVisit?.message}<br/></span>

    </label> 
        
    <label>
        <input className="input" type="date" placeholder="" {...register("arrivalDate", VacationsModel.arrivalDateValidation)}/>
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
    <label>
        <input className="input" type="file" required accept="image/*" {...register("image")}/>
        <span>Image</span>
      

    </label>
    <button className="submit-vacation">Add Vacation</button>
   
</form>

        </div>
    );
}

export default AddVacation;
