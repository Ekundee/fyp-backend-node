import mongoose from "mongoose";

export interface sendMessageDto {
    SenderId : mongoose.Types.ObjectId,
    ParticipantId : mongoose.Types.ObjectId,
    Message : string,
}

export interface getMessageDto {
    Id : mongoose.Types.ObjectId,
    ChatRoom : mongoose.Types.ObjectId,
}


export interface getAllUserMessageDto {
     Id : mongoose.Types.ObjectId,
 }

 export interface getUserFriendDto {
     Id : mongoose.Types.ObjectId,
 }