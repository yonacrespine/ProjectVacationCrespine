import { Route, Routes} from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import PageNotFound from "../../HomeArea/PageNotFound/PageNotFound";
import FourVacations from "../../VacationsArea/FourVacations/FourVacations";
import VacationDetails from "../../VacationsArea/VacationDetails/VacationDetails";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Logout from "../../AuthArea/Logout/Logout";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";

import Gallery from "../../HeaderArea/Gallery/Gallery";
import Favories from "../../VacationsArea/Favories/Favories";

import Contact from "../../HomeArea/Contact/Contact";
import ChartVacation, { VacationData } from "../../VacationsArea/ChartVacation/ChartVacation";
import { vacationActionType, vacationStore } from "../../../Redux/VacationState";
import { useEffect, useState } from "react";
import axios from "axios";
import VacationsModel from "../../../02-Models/VacationsModel";
import { myConfig } from "../../../01-Utils/Configs";
import UpComingVacations from "../../VacationsArea/UpComingVacations/UpComingVacations";
import CurrentVacations from "../../VacationsArea/CurrentVacations/CurrentVacations";
import Search from "../../HomeArea/Search/Search";



function Routing(): JSX.Element {

    const [vacationData, setVacationData] = useState<VacationData[]>([]); // État pour stocker les données des vacances

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<VacationsModel[]>(myConfig.vacationUrl);
          const vacations = response.data;
  
        
          const transformedData: VacationData[] = vacations.filter(v => v.follow.length > 0).map(v => ({
            vacation: v.destination,
            followers: v.follow.length, 
          }));
  
          setVacationData(transformedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData()
    }, []); 

    return (
        <div className="Routing">
			<Routes>

                <Route path="/home" element={<Home/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/gallery" element={<Gallery/>}/>
                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/search/:term" element={<Search/>} />

                <Route path="/vacations" element={<VacationsList/>}/>
                <Route path="/fourvacations" element={<FourVacations/>}/>
                <Route path="/vacations/vacation-details/:id" element={<VacationDetails/>}/>
                <Route path="/vacations/add-vacation" element={<AddVacation/>}/>
                <Route path="/vacations/edit-vacation/:id" element={<EditVacation/>}/>
                <Route path="/upcoming-vacations" element={<UpComingVacations/>}/>
                <Route path="/current-vacations" element={<CurrentVacations/>}/>
                <Route path="/favories" element={<Favories/>}/>
                <Route path="/vacations/chart-vacation" element={<ChartVacation data={vacationData}/>}/>

               


                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/logout" element={<Logout/>}/>


                


            </Routes>

        </div>
    );
}

export default Routing;
