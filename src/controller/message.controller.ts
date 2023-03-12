import { Request, Response } from "express";
import { getAllUserMessageDto, getMessageDto, sendMessageDto } from "../inteface/message.interface";
import { getAllUserMessage, getMessage, sendMessage } from "../service/message.service";

export const sendMessageController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Send Message"
        #swagger.tags = ["Consultation"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
        #swagger.parameters["body"] = {
            in : 'body',
            schema : {
              Participant : "123KJKHNOIHJ23KJLOI4K56",
              Message : "How are you doing?" 
            }
        }
    */
    try{
    
        const { Id } = res.locals.decodedToken
        const { Participant, Message } = req.body

        const sendMessageDto : sendMessageDto = {
            SenderId : Id,
            ParticipantId : Participant,
            Message : Message,
        }

        const sendMessageResponse = await sendMessage(sendMessageDto);
        res.status(200).json(sendMessageResponse)
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}

export const getMessageController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Get Message"
        #swagger.tags = ["Consultation"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
        #swagger.parameters["query"] = {
            name : "Participant"
        }
    */
    try{
    
        const { Id } = res.locals.decodedToken
        const { Participant } : any = req.query

        const getMessageDto : getMessageDto = {
            Id : Id,
            Participant : Participant
        }

        const getMessageResponse = await getMessage(getMessageDto);
        res.status(200).json(getMessageResponse)
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}


export const getAllUserMessageController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Get All user's Messages"
        #swagger.tags = ["Consultation"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    try{
    
        const { Id } = res.locals.decodedToken

        const getAllMessageDto : getAllUserMessageDto = {
            Id : Id,
        }
        const getAllUserMessageResponse = await getAllUserMessage(getAllMessageDto);
        res.status(200).json(getAllUserMessageResponse)
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}
