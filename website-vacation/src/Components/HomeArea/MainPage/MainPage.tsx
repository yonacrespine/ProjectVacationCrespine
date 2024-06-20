import "./MainPage.css";

import mer from "../../../Assets/images/mer-main-page.jpg"
import myVacationService from "../../../03-Service/VacationsService";
import notify from "../../../03-Service/Notify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";

import search from "../../../Assets/images/search.png"

function MainPage(): JSX.Element {
   

    const [searchTerm, setSearchTerm] = useState("");
  const [vacations, setVacations] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    myVacationService
      .getAllVacation()
      .then((vacs) => setVacations(vacs))
      .catch((err) => notify.errorMsg(err));

    setUser(authStore.getState().user);
  }, []);

  const handleSearch = () => {
    if (!user) {
      notify.errorMsg("Please Log In to search for vacations.");
      navigate("/login")
      return

    }

    if (searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm}`);
    }
  };


  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };





    return (
        <div className="MainPage">
			<div className=" myMain container-fluid">
                <img className="img-fluid" src={mer} alt="accueil" style={{height:"800px", width:"100%"}} />
                <div className="title-main container-fluid">
                    <h1> Enjoy Your Dream Vacation</h1>
                    <p> Travel to the any corner of the world.</p>
                    <div className="container-input container-fluid">



                    <input
              type="text"
              placeholder="Search Destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            {/* <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button> */}
            <button onClick={handleSearch} className="buttonSearch">   <img className="img-fluid" src={search} alt="accueil" style={{height:"40px", width:"40px"}} /></button>
          </div>
   
                </div>
            </div>
        </div>
    );
}

export default MainPage;

