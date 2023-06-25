import { Request, Response } from "express";
import { CreateSessionDto, getConsultantSessionDTO, getUserSessionDTO } from "../inteface/session.interface";
import { CreateSession, getConsultantSession, getUserSession } from "../service/session.service";

export const CreateSessionController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Create session"
        #swagger.tags = ["Session"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
        #swagger.parameters["body"] = {
            in : 'body',
            schema : {
                ConsultantId : "1232_3242311_23232132_232323",
                hours : 2
            }
        }
    */
    try{
        const { Id } = res.locals.decodedToken
        const { ConsultantId, Hours } = req.body


        const createSessionDto : CreateSessionDto = {
            UserId : Id,
            Hours : Hours,
            ConsultantId : ConsultantId, 
        }
        const response = await CreateSession(createSessionDto);
        res.status(200).json(response)
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}



export const getUserSessionController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Get User session"
        #swagger.tags = ["Session"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    try{
        const { Id } = res.locals.decodedToken

        const getUserSessionDTO : getUserSessionDTO = {
            UserId : Id
        }
        const response = await getUserSession(getUserSessionDTO);
        res.status(200).json(response)
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}


export const getConsultantSessionController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Get consultant session"
        #swagger.tags = ["Session"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
        #swagger.parameters["consultantId"] = {
            in : 'query'
        }
    */
    try{
        const { consultantId } : any = req.query

        const getConsultantSessionDTO : getConsultantSessionDTO = {
            ConsultantId : consultantId
        }
        const response = await getConsultantSession(getConsultantSessionDTO);
        res.status(200).json(response)
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}
