import "./Contact.css";

import imageContact from "../../../Assets/images/contact-me.png"
import mail from "../../../Assets/images/mail.png"
import smartphone from "../../../Assets/images/smartphone.png"
import phone from "../../../Assets/images/telephone.png"
import location from "../../../Assets/images/location.png"
import { useForm } from "react-hook-form";
import ContactsModel from "../../../02-Models/ContactsModel";
import { useNavigate } from "react-router-dom";
import myVacationService from "../../../03-Service/VacationsService";
import notify from "../../../03-Service/Notify";





function Contact(): JSX.Element {




    const {register, handleSubmit}= useForm<ContactsModel>()
    const navigate= useNavigate()

async function send(contact:ContactsModel){
    try{
        await myVacationService.addMessage(contact)
        notify.successMsg("The message has been recorded")
        navigate("/home")
    }
    catch(error:any){
        notify.errorMsg(error)
    }
}




    return (
        <div className="Contact">
          

          
			<div className=" myImageContact container-fluid">
                <img className="img-fluid" src={imageContact} alt="contact" style={{height:"200px", width:"20%", margin:"auto"}} />
                <div className="title-contact container-fluid">
                    <h1> Contact Us</h1>
                  
                </div>
            </div>


<div className="info-form">
            <div className="infoContact">
             
<h2>Our Contacts</h2>
<p><img className="img-fluid" src={location} alt="contact" style={{height:"20px", width:"20px"}} /> 122 Sderot Ben Gourion,96132 Jerusalem, Israel</p>
<p><img className="img-fluid" src={phone} alt="contact" style={{height:"20px", width:"20px"}} /> +972-3-529-8143</p>
<p><img className="img-fluid" src={smartphone} alt="contact" style={{height:"20px", width:"20px"}} /> +972-52-6006418</p>
<p><img className="img-fluid" src={mail} alt="contact" style={{height:"20px", width:"20px"}} />  infovacation@gmail.com</p>
</div>

       <div className="sendMessage infoContact">
        <h2 >Any Questions ?</h2>
       <form className="form-contact" onSubmit={handleSubmit(send)}>
   
    <input type="text" placeholder="Your name" className="input-contact" {...register("name")}/>
    <input type="text" placeholder="Your email" className="input-contact" {...register("email")}/>
    <textarea placeholder="Your message" {...register("message")}></textarea>
     
    <button>Submit</button>
</form>
        </div>  

            
        </div>

        </div>
    );
}

export default Contact;
