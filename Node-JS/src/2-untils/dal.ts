import mysql from "mysql";
import appConfig from "./app-configSql";

const connection = mysql.createPool({
    host: appConfig.host,
    user: appConfig.user,
    password: appConfig.password,
    database: appConfig.database
});


// values pour enlever les hacher sql injection
function execute(sql: string, values?:any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql,values, (err, result)=>{
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

export default {
    execute
};




// SELECT v.vacationID, v.destination, v.placesToVisit,v.arrivalDate, v.departureDate,v.price,v.imageName,GROUP_CONCAT(f.userID SEPARATOR ', ') AS follow

// FROM vacations v
// INNER JOIN follows f ON v.vacationID = f.vacationID
// GROUP BY  v.vacationID, v.destination, v.placesToVisit,v.arrivalDate, v.departureDate,v.price,v.imageName;