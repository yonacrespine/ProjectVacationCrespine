import axios from "axios";
import VacationsModel from "../02-Models/VacationsModel";
import { myConfig } from "../01-Utils/Configs";
import { vacationActionType, vacationStore } from "../Redux/VacationState";
import ContactsModel from "../02-Models/ContactsModel";


class VacationsService {

    public async getAllVacation(): Promise<VacationsModel[]> {

        let vacations= vacationStore.getState().vacations

        if(!vacations){
            const response = await axios.get<VacationsModel[]>(myConfig.vacationUrl)
            vacations = response.data

            vacationStore.dispatch({type:vacationActionType.FetchVacation,payload:vacations})
        }

      
      
     
        return vacations
    }

    public async get4Vacations(): Promise<VacationsModel[]> {

        let vacations= vacationStore.getState().vacations
        if(!vacations){
            const response = await axios.get<VacationsModel[]>(myConfig.vacationUrl)
            vacations = response.data

            vacationStore.dispatch({type:vacationActionType.FetchVacation,payload: vacations})
        }
      
        const fourVacations = []
        for (let i = 0; i < 4; i++) {
            fourVacations.push(vacations[i])
            
        }

        return fourVacations

    }
    

    public async getOneVacation(id:number):Promise<VacationsModel>{

        let vacations= vacationStore.getState().vacations

// when we refresh the page, vacations undefined
        if(!vacations){
            const response = await axios.get<VacationsModel[]>(myConfig.vacationUrl)
            vacations = response.data
            vacationStore.dispatch({type:vacationActionType.FetchVacation,payload: vacations})
        }
        let vacation= vacations.find(v=>v.vacationID===id)

        if(!vacation ){
            const response= await axios.get<VacationsModel>(myConfig.vacationUrl +id)
            vacation= response.data
        }

        return vacation     
    }
   
    public async addVacation(vacation:VacationsModel):Promise<void>{
        const myFormData= new FormData()
        myFormData.append("destination", vacation.destination)
        myFormData.append("description", vacation.description)
        myFormData.append("placesToVisit", vacation.placesToVisit)
        myFormData.append("arrivalDate", vacation.arrivalDate.toLocaleString())
        myFormData.append("departureDate", vacation.departureDate.toLocaleString())
        myFormData.append("price", vacation.price.toString())
        myFormData.append("image", vacation.image[0])
      


        const response= await axios.post<VacationsModel>(myConfig.addVacationUrl, myFormData)

        const addedVacation= response.data

        vacationStore.dispatch({type:vacationActionType.AddVacation, payload:addedVacation})

        const updatedVacations = vacationStore.getState().vacations;

    
    this.sortVacations(updatedVacations);

       
    }

    public async updateVacation(vacation:VacationsModel):Promise<void>{

        
            const myFormData= new FormData()
            myFormData.append("destination", vacation.destination)
            myFormData.append("description", vacation.description)
            myFormData.append("placesToVisit", vacation.placesToVisit)
            myFormData.append("arrivalDate", vacation.arrivalDate.toLocaleString())
            myFormData.append("departureDate", vacation.departureDate.toLocaleString())
            myFormData.append("price", vacation.price.toString())
         
            myFormData.append("image", vacation.image[0])
            
            const response= await axios.put<VacationsModel>(myConfig.updateVacationUrl+ vacation.vacationID, myFormData)
    
            const updatedVacation= response.data
            
            vacationStore.dispatch({type:vacationActionType.UpdateVacation, payload:updatedVacation})



        const updatedVacations = vacationStore.getState().vacations;

    
        this.sortVacations(updatedVacations);
      
    }





    public async deleteVacation(id:number):Promise<void>{
         const response= await axios.delete<void>(myConfig.vacationUrl +id)

         vacationStore.dispatch({type:vacationActionType.DeleteVacation, payload:id})
    }



    public async follow(vacationId:number):Promise<number>{
        let userID: number= null
        try{
            const response= await axios.post(myConfig.followVacationUrl + vacationId)
            userID= response.data
            const vacations=await this.getAllVacation()
            let vacation= vacations.find(v=>v.vacationID === vacationId)
            if (vacation  ) {
                const userIds= vacation.follow  || [];
        
                userIds.push(userID)
        
                vacationStore.dispatch({ type: vacationActionType.Follow, payload: { vacationId, userIds}});
                return userIds.length
            } else {
                throw new Error("Vacation not found");
            }
        }
        catch(error:any){
             alert("Is already follow")
        }
     }
 
 
    public async unFollow(vacationId:number):Promise<number>{
         let userID: number= null
          try{
                const response= await axios.delete(myConfig.unfollowVacationUrl + vacationId)
                userID= response.data
            
                const vacations=await this.getAllVacation()
                if(vacations){
                    let vacation= vacations.find(v=>v.vacationID === vacationId)  
                    if (vacation ) {
               
                    const userIds = vacation.follow.filter(id => id !== userID)
                    vacation.follow = userIds;
           
                 vacationStore.dispatch({ type: vacationActionType.UnFollow, payload: { vacationId, userIds}});
                 return userIds.length
             } else {
                 throw new Error("Vacation not found");
             }
          }
          }
          catch(error:any){
              alert("Is already follow")
          }
  
  
      }
 
      public async getLikedVacationsByUser(userId: number):Promise< VacationsModel[]> {
        const likedVacations: VacationsModel[] = [];
        let vacations = vacationStore.getState().vacations;
    
        if (!vacations) {
         
        
                const response = await axios.get<VacationsModel[]>(myConfig.vacationUrl)
                vacations = response.data
    
                vacationStore.dispatch({type:vacationActionType.FetchVacation,payload:vacations})
                
        }
    
        //Browse all vacations to find those liked by the user
        vacations.forEach(vacation => {
            if (vacation.follow && vacation.follow.includes(userId)) {
                likedVacations.push(vacation);
            }
        });
    
        return likedVacations;
    }


 


public async getUpcomingVacations(): Promise<VacationsModel[]> {
    let vacations = vacationStore.getState().vacations;

    if (!vacations) {
        const response = await axios.get<VacationsModel[]>(myConfig.vacationUrl);
        vacations = response.data;
        vacationStore.dispatch({ type: vacationActionType.FetchVacation, payload: vacations });
    }

    const currentDate = new Date();

    const upcomingVacations = vacations.filter(vacation =>{ 
       
        
      
        return new Date(vacation.arrivalDate) >= currentDate;
    });
       
   
     
    return upcomingVacations;
}





public async getCurrentVacations(): Promise<VacationsModel[]> {
    let vacations = vacationStore.getState().vacations;

    if (!vacations) {
        const response = await axios.get<VacationsModel[]>(myConfig.vacationUrl);
        vacations = response.data;
        vacationStore.dispatch({ type: vacationActionType.FetchVacation, payload: vacations });
    }

    
    const currentDate = new Date();

        const currentVacations= vacations?.filter(vacation =>{ 
           
            return currentDate <  new Date(vacation.departureDate) && currentDate > new Date(vacation.arrivalDate)

        });
           
       


  
    return currentVacations
}


    
public sortVacations<T extends { arrivalDate: Date }>(vacations: T[]) {
    vacations.sort((a, b) => {
        const partsA = a.arrivalDate.toString().split('/');
        const partsB = b.arrivalDate.toString().split('/');
        const dateA = new Date(parseInt(partsA[2]), parseInt(partsA[1]) - 1, parseInt(partsA[0]));
        const dateB = new Date(parseInt(partsB[2]), parseInt(partsB[1]) - 1, parseInt(partsB[0]));
        return dateA.getTime() - dateB.getTime();
        
    });
}


    public async addMessage(contact:ContactsModel):Promise<void>{
        
        const response= await axios.post<VacationsModel>(myConfig.contactUrl,contact)
        const addedMessage= response.data
    }



     public async getCoordinatesFromAddress(address: string): Promise<{ lat: number, lng: number }> {

        address = address.trim();

        //Check if the address is empty after removing spaces
        if (address === '') {
            throw new Error('Empty address.');
        }
        try {
            const response = await axios.get(`http://localhost:3001/api/maps/`+address);
         

            if (response.data.results.length > 0) {
                const { lat, lng } = response.data.results[0].geometry.location;
                return { lat, lng };
            } else {
                throw new Error('Address not found.');
            }
        } catch (error) {
            console.error('Error retrieving coordinates:', error);
            throw error;
        }
    }
      
 }



 const myVacationService = new VacationsService()

 export default myVacationService