import axios from "axios"
import { authStore } from "../Redux/AuthState"


class InterceptorService{

    public createInterceptors():void{
        axios.interceptors.request.use(request=>{
            if(authStore.getState().token){
                request.headers.Authorization= "Bearer " + authStore.getState().token
            }
            return request
        })
    }
}


 const interceptService= new InterceptorService()
 export default interceptService