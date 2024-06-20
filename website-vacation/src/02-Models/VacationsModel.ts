class VacationsModel{
    public vacationID: number
    public destination: string
    public description: string
    public placesToVisit: string
    public arrivalDate: Date
    public departureDate:Date
    public price: number
    public imageName: string
    public image: FileList
    public follow: number[]= []
   


    public static destinationValidation = {
        required: {value: true, message: "Missing destination"},
        minLength: {value: 2, message: "Destination too short"},
        maxLength: {value:100, message: "Destination too long"}
    }

    public static descriptionValidation = {
        required: {value: true, message: "Missing description"},
        minLength: {value: 7, message: "Description too short"},
        maxLength: {value:500, message: "Description too long"}
    }

    public static placeToVisitValidation = {
        required: {value: true, message: "Missing place to visit"},
        minLength: {value: 7, message: "Place to Visit too short"},
        maxLength: {value:500, message: "Place to visit too long"}
    }

    
    public static arrivalDateValidation = {
        required: {value: true, message: "Missing arrival date"},
        validate: {
            notPastDate: (value: Date) => {
                const today = new Date().toISOString().split("T")[0];
                return value.toString() >= today || "Arrival date cannot be in the past";
            }
        }
       
    }

    public static departureDateValidation = {
        required: {value: true, message: "Missing departure date"},
        validate: (value: Date, context: any) => {
            const arrivalDate = context.arrivalDate;
            return value > arrivalDate || "Departure date cannot be before or the same as the arrival date";
        }
       
    }

    public static priceValidation = {
        required: {value: true, message: "Missing price"},
        min: {value: 0, message: "price cant be negative"},
        max: {value:10000, message: "price cant exceed 1000"}
    }

    // public static imageValidation = {
    //     required: {value: true, message: "Missing image"}
       
    // }

   
}

export default VacationsModel