import { Request, Response } from "express";
import { updateProfileDto } from "../inteface/profile.interface";
import { getAllConsultants, getProfile, updateProfile } from "../service/profile.service";

export const getProfileByIdController = async (req : Request, res : Response)=> {
    /**
        #swagger.summary = "Get profile by Id"
        #swagger.tags = ["Profile"]
        #swagger.parameters["id"] = {
            in:'query',
        } 
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    try{
        const { id } = req.query
        const profile = await getProfile(id);
        res.status(200).json(profile)
    }catch(e : any){
        return e
    }
}

export const getProfileByTokenController = async (req : Request, res : Response)=> {
    /**
        #swagger.summary = "Get profile"
        #swagger.tags = ["Profile"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    try{
        const { Id } = res.locals.decodedToken
        const profile = await getProfile(Id);
        res.status(200).json(profile)
    }catch(e : any){
        return e
    }
}

export const updateProfileController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Update user profile"
        #swagger.tags = ["Profile"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
        #swagger.parameters["body"] = {
            in : 'body',
            schema : {
                Firstname : "isaiah",
                Lastname : "Ekundayo",
                Username : "Ekundee"
            }
        }
    */
    try{
        const { Id } = res.locals.decodedToken
        const { Firstname, Lastname, Username } = req.body

        const userData : updateProfileDto = {
            Id : Id,
            Firstname : Firstname  ? Firstname : null,
            Lastname : Lastname ? Lastname : null,
            Username : Username ? Username : null,
        }
        const profile = await updateProfile(userData);
        res.status(200).json(profile)
    }catch(e : any){
        return e
    }
}


export const  getAllConsultantsController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Update user profile"
        #swagger.tags = ["Profile"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    try{
        const response = await getAllConsultants();
        res.status(200).json(response)
    }catch(e : any){
        return e
    }
}

