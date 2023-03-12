import mongoose from "mongoose";
import { statusMessage } from "../enum/utility.enum";
import { getAllUserMessageDto, getMessageDto, sendMessageDto } from "../inteface/message.interface";
import MessageModel from "../model/message.schema";
import UserModel from "../model/user.model";
import { Apiresponse } from "./utility.service";

// Send message
export const sendMessage = async(sendMessageDto : sendMessageDto) =>{
    try{

        var userMessage = new MessageModel({
            Participant : sendMessageDto.ParticipantId,
            Sender : sendMessageDto.SenderId,
            Message : sendMessageDto.Message,
            Timestamp : new Date().toLocaleString()
        })
     
        const savedUserMessage = await userMessage!.save()

        const response = {
            UserMessage : savedUserMessage
        }
        return await Apiresponse( statusMessage.SUCCESSFUL, response)  
    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}

// get message Note: there is pagination (later)
export const getMessage = async(getMessageDto : getMessageDto) =>{
    try{

        const userMessages = await MessageModel.find({ Sender : getMessageDto.Id, Participant : getMessageDto.Participant })
        const response = {
            UserMessage : userMessages
        }
        return await Apiresponse( statusMessage.SUCCESSFUL, response)  

    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}


// get message Note: there is pagination (later)
export const getAllUserMessage = async(getAllUserMessageDto : getAllUserMessageDto) =>{
    try{

        const userMessages = await MessageModel.find({ Sender : getAllUserMessageDto.Id })
        const response = {
            UserMessage : userMessages
        }
        return await Apiresponse( statusMessage.SUCCESSFUL, response)  

    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}