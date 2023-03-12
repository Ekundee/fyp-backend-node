import mongoose from "mongoose";
import { statusMessage } from "../enum/utility.enum";
import { getProfileResponse, updateProfileDto } from "../inteface/profile.interface";
import UserModel from "../model/user.model";
import { Apiresponse } from "./utility.service";

// Get profile by ID
export const getProfile = async(id : any) =>{
    try{
        const user = await UserModel.findById(id)
        if (user == null) return  Apiresponse(statusMessage.INEXISTENT, null) 

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

        return await Apiresponse(statusMessage.SUCCESSFUL, profile)
        
    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}

export const updateProfile = async(userData : updateProfileDto) =>{
    try{
        const user = await UserModel.findById(userData.Id)
        if (user == null) return await Apiresponse(statusMessage.INEXISTENT, null) 

        user.Firstname = userData.Firstname != null ? userData.Firstname : user.Firstname
        user.Lastname = userData.Lastname != null ? userData.Lastname : user.Lastname
        user.Username = userData.Username != null ? userData.Username : user.Username

        await user.save();
        
        const response = {
            User : user
        }
        return response
    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}


