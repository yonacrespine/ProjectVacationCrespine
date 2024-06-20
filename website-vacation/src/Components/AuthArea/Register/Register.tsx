import { NavLink, useNavigate } from "react-router-dom";
import "./Register.css";
import { useForm } from "react-hook-form";
import UsersModel from "../../../02-Models/UsersModel";
import myAuthService from "../../../03-Service/AuthService";
import notify from "../../../03-Service/Notify";


function Register(): JSX.Element {


const {register, handleSubmit}= useForm<UsersModel>()
const navigate= useNavigate()

async function send(user:UsersModel){
    try{
        await myAuthService.register(user)
        navigate("/home")
        notify.successMsg("you register successfuly")
    }
    catch(err:any){
        notify.errorMsg(err)
    }
}



    return (
        <div className="Register">
			



            <form className="form-register" onSubmit={handleSubmit(send)}>
            <p className="title">Register </p>
            <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
        <label>
            <input className="input" type="text" placeholder="FirstName" {...register("firstname")}/>
            <span>Firstname</span>
        </label>

        <label>
            <input className="input" type="text" placeholder="LastName" {...register("lastname")}/>
            <span>Lastname</span>
        </label>
    </div>  
            
    <label>
        <input className="input" type="email" placeholder="Enter your Email"{...register("username")} />
        <span>Username</span>
    </label> 
        
    <label>
        <input className="input" type="password" placeholder="Enter your Password" {...register("password")}/>
        <span>Password</span>
    </label>
  
    <button className="submit-register">Submit</button>
    <p className="signin">Already have an acount ? <NavLink className="nav-register" to="/login">Signin</NavLink> </p>
</form>
        </div>
    );
}

export default Register;
