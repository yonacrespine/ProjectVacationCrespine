import { OkPacket } from "mysql";
import dal from "../2-untils/dal";
import {  RessourceNotFound, ValidationErrorModel } from "../4-Models/errorModel";
import VacationsModel from "../4-Models/vacationsModel";

import { v4 as uuid} from "uuid" 
import FollowModel from "../4-Models/followModel";
import ContactsModel from "../4-Models/contactsModel";



async function getAllVacation(): Promise<VacationsModel[]> {
    const sql = `SELECT v.vacationID, v.destination, v.description, v.placesToVisit, DATE_FORMAT(v.arrivalDate, '%Y-%m-%d') AS arrivalDate, DATE_FORMAT(v.departureDate, '%Y-%m-%d') AS departureDate, v.price, v.imageName, GROUP_CONCAT(f.userID SEPARATOR ', ') AS follow
    FROM vacations v
    LEFT JOIN follows f ON v.vacationID = f.vacationID
    GROUP BY v.vacationID, v.destination, v.description, v.placesToVisit, v.arrivalDate, v.departureDate, v.price, v.imageName 
    ORDER BY arrivalDate
    `;

    const vacations = await dal.execute(sql);

    for (let v of vacations) {
        if (v.follow) {
            let l = [];
            for (let f of v.follow.split(",")) {
                l.push(+(f));
            }
            v.follow = l;
        } else {
            v.follow = []; 
        }
    }

    return vacations;
}


async function getOneVacation(vacationID: number):Promise<VacationsModel>{
    const sql= ` SELECT * FROM vacations WHERE vacationID= ?`;
   
    const vacations= await dal.execute(sql, [vacationID])
    const vacation= vacations[0]

    if(!vacation) throw new RessourceNotFound(vacationID)
    return vacation
}

async function addVacation(vacation:VacationsModel,userID: number):Promise<VacationsModel>{

  

    const error = vacation.validation()
    if(error) throw new ValidationErrorModel(error)

    if(vacation.image){
        const extension= vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        vacation.imageName= uuid() + extension
        await vacation.image.mv("./src/1-assets/images/"+ vacation.imageName)

        delete vacation.image
    }

    const sql= ` INSERT INTO vacations VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?,"")`;

    const info :OkPacket= await dal.execute(sql, [vacation.destination, vacation.description, vacation.placesToVisit, vacation.arrivalDate, vacation.departureDate, vacation.price, vacation.imageName, vacation.follow])

    vacation.vacationID= info.insertId

    return vacation


}

async function updateVacation(vacation:VacationsModel):Promise<VacationsModel>{


        let oldVacation: VacationsModel | undefined;

        if (!vacation.image) {
            //If no new image is provided, retrieve the old vacation to keep the existing image
            oldVacation = await getOneVacation(vacation.vacationID);
            vacation.imageName = oldVacation.imageName;
        } else {
        // If a new image is provided, save the new image
            const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
            vacation.imageName = uuid() + extension;
            await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        }

    const error = vacation.validation()
    if(error) throw new ValidationErrorModel(error)

   

     const sql= ` UPDATE vacations SET 
                    destination= ?,
                    description= ?,
                    placesToVisit= ?,
                    arrivalDate=?,
                    departureDate=?,
                    price= ?,
                    imageName=? 
                    WHERE vacationID= ?`;

    const info:OkPacket= await dal.execute(sql, [vacation.destination, vacation.description, vacation.placesToVisit, vacation.arrivalDate, vacation.departureDate, vacation.price, vacation.imageName, vacation.vacationID])

    if(info.affectedRows === 0) throw new RessourceNotFound(vacation.vacationID)

    return vacation
    
}

async function deleteVacation(vacationID: number):Promise<void>{

    const sql= `DELETE FROM vacations WHERE vacationID = ?`;

    const info: OkPacket= await dal.execute(sql, [vacationID])

    if(info.affectedRows === 0) throw new RessourceNotFound(vacationID)
}




async function follow(follow:FollowModel): Promise<number> {
    
    const sql = `INSERT INTO follows (vacationID, userID) VALUES (?, ?)`;
    await dal.execute(sql, [follow.vacationID, follow.userID]);

    return follow.userID
    
   
}

async function unFollow(follow: FollowModel): Promise<void> {
   
    const sql = `DELETE FROM follows WHERE vacationID = ? AND userID = ?`;
  
    const info: OkPacket = await dal.execute(sql, [follow.vacationID, follow.userID]);

    if (info.affectedRows === 0) throw new RessourceNotFound(follow.vacationID);
    
    
}




async function addMessage(contact: ContactsModel):Promise<ContactsModel>{

  

    const error = contact.validation()
    if(error) throw new ValidationErrorModel(error)


    const sql= ` INSERT INTO contacts VALUES (?, ?, ?)`;

    const info :OkPacket= await dal.execute(sql, [contact.name, contact.email, contact.message])

   

    return contact


}


export default {
    getAllVacation, getOneVacation, updateVacation, deleteVacation, addVacation, follow, unFollow, addMessage
}