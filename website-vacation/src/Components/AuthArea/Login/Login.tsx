import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import CredentialsModel from "../../../02-Models/CredentialsModel";
import myAuthService from "../../../03-Service/AuthService";
import notify from "../../../03-Service/Notify";


function Login(): JSX.Element {

const {register, handleSubmit}= useForm<CredentialsModel>()
const navigate= useNavigate()

async function send(credentials:CredentialsModel){
  try{
    await myAuthService.login(credentials)
    navigate("/home")
   notify.successMsg("You are logged in")

  }
  catch(err:any){
    notify.errorMsg(err)
  }
}

    return (
        <div className="Login">
			

            
    <form className="form" onSubmit={handleSubmit(send)}>
       <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input type="email" placeholder="Enter your Email" {...register("username")}/>
          <span>
          </span>
      </div>
      <div className="input-container">
          <input type="password" placeholder="Enter your Password" {...register("password")}/>
        </div>
         <button type="submit" className="submit">
        Sign in
      </button>

      <p className="signup-link">
        No account?
        <NavLink className="nav-login" to="/register">Sign up</NavLink>
      </p>
   </form>

        </div>
    );
}

export default Login;
