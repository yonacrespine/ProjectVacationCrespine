class ErrorModel{
    public constructor(public message: string, public status: number){}
}

export class RouteNotFound extends ErrorModel{
    public constructor(route:string){
        super(`Route ${route} not exist`, 404)
    }
}

export class RessourceNotFound extends ErrorModel{
    public constructor(id:number){
        super(`id ${id} not exist`, 404)
    }
}

export class ValidationErrorModel extends ErrorModel{
    public constructor(message:string){
        super(message, 404)
    }
}

export class UnauthorizedErrorModel extends ErrorModel{
    public constructor(message: string){
        super(message, 401)
    }
}


export class FollowErrorModel extends ErrorModel{
    public constructor(message: string){
        super(message, 401)
    }
}