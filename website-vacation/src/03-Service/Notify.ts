import { Notyf } from "notyf"

class NotifyService {

    private notification = new Notyf({duration: 5000, position: {x: "center", y:"top"}})

    public successMsg(message:string):void {
        this.notification.success(message)
    }

    public errorMsg(err:any):void {
        const message = this.extractErrorMessage(err)
        this.notification.error(message)
    }
    

    private extractErrorMessage(err:any):string {

        if(typeof err === "string") return err

        if(typeof err.response?.data === "string") return err.response.data

        if(Array.isArray(err.response?.data)) return err.response.data[0]

        if(typeof err.message === "string") return err.message
        
        return "Some error, please try again..."

    }
}

const notify = new NotifyService()

export default notify