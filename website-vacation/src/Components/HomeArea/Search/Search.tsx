import { useNavigate, useParams } from "react-router-dom";
import "./Search.css";
import { useEffect, useState } from "react";
import myVacationService from "../../../03-Service/VacationsService";
import notify from "../../../03-Service/Notify";

import { authStore } from "../../../Redux/AuthState";
import VacationCard from "../../VacationsArea/VacationCard/VacationCard";
import UsersModel from "../../../02-Models/UsersModel";

function Search(): JSX.Element {


    const [user, setUser] = useState<UsersModel>();
    const { term } = useParams();
  const [vacations, setVacations] = useState([]);
  const [filteredVacations, setFilteredVacations] = useState([]);

  useEffect(() => {
    myVacationService
      .getAllVacation()
      .then((vacs) => setVacations(vacs))
      .catch((err) => notify.errorMsg(err));

      setUser(authStore.getState().user);
  }, []);

  useEffect(() => {
    setFilteredVacations(
      vacations.filter(vacation =>
        vacation.destination?.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [term, vacations]);

  return (
    <div className="Search">
      <h1>Search Results for "{term}"</h1>
      <div className="vacation-results container-fluid">
                {filteredVacations.length > 0 ? (
                    filteredVacations.map(vac =>
                        <VacationCard key={vac.vacationID} vacation={vac} user={user} searchTerm={term ? term : undefined} />
                    )
                ) : (
                    <p>No vacations found matching your search.</p>
                )}
            </div>
    </div>
  );
}

export default Search;
