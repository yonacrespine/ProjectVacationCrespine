import { OkPacket } from "mysql";
import UsersModel from "../4-Models/usersModel";
import cyber from "../2-untils/cyber";
import dal from "../2-untils/dal";
import CredentialsModel from "../4-Models/credentialsModel";
import { RessourceNotFound, UnauthorizedErrorModel, ValidationErrorModel } from "../4-Models/errorModel";
import RoleModel from "../4-Models/roleModel";



async function register(user: UsersModel): Promise<string> {

    const error = user.validation();
    if (error) throw new ValidationErrorModel(error);

    if (await isUsernameTaken(user.username)) throw new ValidationErrorModel(`Username ${user.username} already taken`);


        user.password= cyber.hash(user.password)
    
    const sql= `INSERT INTO users VALUES (DEFAULT,?,?,?,?,'User')`;
    
    const info:OkPacket=await dal.execute(sql, [user.firstname,user.lastname,user.username,user.password]);
    user.userID= info.insertId
    user.role = RoleModel.User
    

    const token = cyber.getNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    const error = credentials.validation();
    if (error) throw new ValidationErrorModel(error);

    credentials.password= cyber.hash(credentials.password)

    const sql= `SELECT * FROM users WHERE username= ? AND password= ? `

    const users = await dal.execute(sql,[credentials.username,credentials.password]);

    if (users.length===0){
     
     throw new UnauthorizedErrorModel("Incorrect username or password");}

    const user = users[0];

    const token = cyber.getNewToken(user);
    return token;
}



async function isUsernameTaken(username: string): Promise<boolean> {
    const sql = `SELECT * FROM users WHERE username = ?`;
    const result = await dal.execute(sql, [username]);
    return result.length > 0;
}



export default {
    register,
    login,
    
}
