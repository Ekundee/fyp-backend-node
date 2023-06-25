import mongoose from "mongoose";
import { statusMessage, userRole } from "../enum/utility.enum";
import { getProfileResponse, updateProfileDto } from "../inteface/profile.interface";
import UserModel from "../model/user.model";
import { Apiresponse } from "./utility.service";

// Get profile
export const getProfile = async(id : any) =>{
    try{
        const user = await UserModel.findById(id)
        if (user == null) return  Apiresponse(400, statusMessage.UNSUCCESSFUL, "User does not exist", null) 

        const profile : getProfileResponse = {
            Firstname : user.Firstname,
            Lastname : user.Lastname,
            Email : user.Email,
            Role : user.Role,
            Phonenumber : user.Phonenumber,
            Username : user.Username,
            Balance : user.Balance,
            IsEmailVerified : user.IsEmailVerified,
            IsPhoneNoVerified : user.IsPhoneNoVerified,
        }

        const response = {
            User : profile
        }

        return await Apiresponse(200, statusMessage.SUCCESSFUL, "User profile retrieved", response)
        
    }catch(e : any){
        return await Apiresponse(400, statusMessage.UNSUCCESSFUL, e.message, null) 
    }
}

export const updateProfile = async(userData : updateProfileDto) =>{
    try{
        const user = await UserModel.findById(userData.Id)
        if (user == null) return await Apiresponse(400,statusMessage.UNSUCCESSFUL, "User does not exist", null) 

        user.Firstname = userData.Firstname != null ? userData.Firstname : user.Firstname
        user.Lastname = userData.Lastname != null ? userData.Lastname : user.Lastname
        user.Username = userData.Username != null ? userData.Username : user.Username

        await user.save();
        
        const response = {
            User : user
        }
        return await Apiresponse(200, statusMessage.SUCCESSFUL, "User profile retrieved", response)
    }catch(e : any){
        return await Apiresponse(400, statusMessage.UNSUCCESSFUL, e.message, null) 
    }
}



// Get profile
export const getAllConsultants = async() =>{
    try{
        const consultants = await UserModel.find({ Role : userRole.CONSULTANT })

        const response = {
            Consultant : consultants
        }
        return await Apiresponse(200, statusMessage.SUCCESSFUL, "All consultants retrieved", response)
    }catch(e : any){
        return await Apiresponse(400, statusMessage.UNSUCCESSFUL, e.message, null) 
    }
}