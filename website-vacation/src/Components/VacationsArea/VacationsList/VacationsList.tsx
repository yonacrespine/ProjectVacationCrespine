





import React, { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationsModel from "../../../02-Models/VacationsModel";
import { NavLink } from "react-router-dom";
import useVerifyLoggedIn from "../../../03-Service/useVerifyLoggedIn";
import UsersModel from "../../../02-Models/UsersModel";
import { authStore } from "../../../Redux/AuthState";

import FollowersNumber from "../FollowersNumber/FollowersNumber";
import VacationCard from "../VacationCard/VacationCard";
import myVacationService from "../../../03-Service/VacationsService";
import notify from "../../../03-Service/Notify";

function VacationsList(): JSX.Element {
  useVerifyLoggedIn();

  const [vacations, setVacations] = useState<VacationsModel[]>([]);
  const [user, setUser] = useState<UsersModel>();
  const [currentPage, setCurrentPage] = useState(1);
  const vacationsPerPage = 5;

  useEffect(() => {
    myVacationService
      .getAllVacation()
      .then((vacs) =>setVacations(vacs))
      .catch((err) => notify.errorMsg(err));

    setUser(authStore.getState().user);
  }, []);

 // Calculation of the total number of pages
  const totalPages = Math.ceil(vacations.length / vacationsPerPage);

 // Function to display the holidays of the current page
  const currentVacations = vacations.slice(
    (currentPage - 1) * vacationsPerPage,
    currentPage * vacationsPerPage
  );

 // Function to move to the next page
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Function to go to the previous page
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="VacationsList">
        <div className="vacationCard">
      {currentVacations.map((vac) => (
        <VacationCard key={vac.vacationID} vacation={vac} user={user} />
      ))}
      </div>
      <div className="pagination">
        <button type="button" className="btn btn-outline-secondary" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} on {totalPages}
        </span>
        <button type="button" className="btn btn-outline-secondary" onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default VacationsList;





