import mongoose from "mongoose";
import { userRole } from "../enum/utility.enum";

export interface IApiResponse {
     Status : number,
     StatusMessage : string,
     Message : string,
     Data : any
}


export interface IMessageConfig {
    subject : string,
    html : string,
    attachments? : any[]
}

export interface TokenPayload {
    Id : mongoose.Types.ObjectId,
    Role : userRole,
    IsAdmin : boolean
}


export interface ISessionCheckerDto {
    UserId : mongoose.Types.ObjectId,
    ConsultantId : mongoose.Types.ObjectId,
}