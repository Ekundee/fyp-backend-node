import mongoose from "mongoose";

export interface CreateSessionDto {
    UserId : mongoose.Types.ObjectId,
    Hours : number,
    ConsultantId : mongoose.Types.ObjectId,
}


export interface getUserSessionDTO {
    UserId : mongoose.Types.ObjectId,
}

export interface getConsultantSessionDTO {
    ConsultantId : mongoose.Types.ObjectId,
}
