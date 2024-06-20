import { NavLink } from "react-router-dom";
import FourVacations from "../../VacationsArea/FourVacations/FourVacations";

import MainPage from "../MainPage/MainPage";
import "./Home.css";
import Utility from "../Utility/Utility";

import iconVarietyDestination from "../../../Assets/images/iconVarietyDestination.png"
import iconQualifiedService from "../../../Assets/images/iconQualifiedService.png"
import iconSupport from "../../../Assets/images/iconSupport.png"
import iconPriceGarantee from "../../../Assets/images/iconPriceGarantee.png"
import CustomersMessage from "../CustomersMessage/CustomersMessage";

import iconCustomer1 from "../../../Assets/images/iconCustomer1.jpg"
import iconCustomer2 from "../../../Assets/images/iconCustomer2.jpg"
import iconCustomer3 from "../../../Assets/images/iconCustomer3.jpg"

import { useSpring,animated } from '@react-spring/web'
import { useEffect, useState } from "react";


function Home(): JSX.Element {

  


    const [showVacation, setShowVacation] = useState(false);
    const [showUtility, setShowUtility] = useState(false);
    const [showBottom, setShowBottom] = useState(false);

    const animationPropsVacations = useSpring({
      
   
    opacity: showVacation ? 1 : 0, 
    transform: showVacation? 'translateX(0%)' : 'translateX(-100%)', 
      config: { duration: 1000 }
    });
  

    const animationPropsUtility = useSpring({
      
   
        opacity: showUtility ? 1 : 0, 
        transform: showUtility ? 'translateX(0%)' : 'translateX(-100%)', 
          config: { duration: 1000 }
        });
    
    const animationPropsCustomers = useSpring({
      
   
        opacity: showBottom ? 1 : 0, 
        transform: showBottom ? 'translateX(0%)' : 'translateX(-100%)', 
          config: { duration: 1000 }
        });



   
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowVacation(true);
      } else {
        setShowVacation(false);
      }

      if (window.scrollY > 800) {
        setShowUtility(true);
      } else {
        setShowUtility(false);
      }

      if (window.scrollY > 1000) {
        setShowBottom(true);
      } else {
        setShowBottom(false);
      }
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    
    return (
        <div className="Home">
			<MainPage/>
           
            <div className="titleHome">
            <h1> Last Offers</h1>
            <p>Check out our top-rated tours</p>
            </div>
             <div className="vacation4 text-center">



             <animated.div
        style={{
          ...animationPropsVacations,
          position: 'relative',
          width:"100%",
          height:"100%"
        }}
      >
            <FourVacations/>
     
      </animated.div>




            <NavLink  className="seeMore" to="/vacations"><button type="button" className="btn btn-outline-secondary">See More...</button></NavLink>
             </div>
                <br/>
             <hr className="separator"></hr>

             
            <animated.div
        style={{
          ...animationPropsUtility,
          position: 'relative',
          width:"100%",
          height:"100%"
        }}
      >

             <div className="myUtility container-fluid">
                <Utility image={iconVarietyDestination} title={"WIDE VARIETY OF DESTINATIONS"} content={"With Tripazo you’ll find a perfect destination among hundreds available."}/>
                <Utility image={iconQualifiedService} title={"HIGHLY QUALIFIED SERVICE"} content={"Our high level of service is officially recognized by thousands of clients."}/>
                <Utility image={iconSupport} title={"24/7 SUPPORT"} content={"Our travel agents are always there to support you during your trip."}/>
                <Utility image={iconPriceGarantee} title={"BEST PRICE GUARANTEE"} content={"We guarantee you’ll get top-notch comfort at an affordable price."}/>
            </div>
            </animated.div>

            <hr className="separator"></hr>



            <animated.div
        style={{
          ...animationPropsCustomers,
          position: 'relative',
          width:"100%",
          height:"100%"
        }}
      >
           <div className="myCustomersMessage container-fluid">
            <CustomersMessage image={iconCustomer1} name={"Louise"} message={"'' I recently used this travel site to book my vacation, and I couldn't be happier with the experience!The prices were competitive, and the customer service was top-notch.''"}/>
            <CustomersMessage image={iconCustomer2} name={"Jean-Claude"} message={" '' I've been using this travel website for years, and it never disappoints. From finding the best deals on flights to discovering hidden gems for accommodations, this site has become my go-to for all my travel needs. ''"} />
            <CustomersMessage image={iconCustomer3} name={"Andrew"} message={" '' I stumbled upon this travel platform while planning a last-minute trip, and I'm so glad I did! Not only did I find amazing deals on flights and hotels, but the customer support team went above and beyond to assist me with any questions I had. Thanks to this site!''"}/>

            </div>
     
            </animated.div>
        

         


      
           
        </div>
    );
}

export default Home;
