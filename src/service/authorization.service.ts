import { statusMessage, userRole, userStatus } from "../enum/utility.enum";
import { changeEmailDto, changePasswordDto, changePhoneNumberDto, getRefreshTokenDto, signInDto, signUpDto, validateEmailDto } from "../inteface/authorization.interface";
import { registrationMail } from "../mails";
import UserModel, { IUserSchema } from "../model/user.model";
import { Apiresponse, generateToken, logger, mailer, OtpGenerator, passwordHasher, systemIdGenerator } from "./utility.service";
import bcrypt from "bcrypt"
import { response } from "express";
import mongoose from "mongoose";

export const getRefreshToken = async(userdata : getRefreshTokenDto)=>{
    try{

        const token = await generateToken(userdata.Id, userdata.Role);
        const response = {
            AuthToken : token
        }
        return await Apiresponse(statusMessage.SUCCESSFUL,response)
    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}


export const signUp = async (userData : signUpDto ) => {
    try{
          console.log("hi")
          logger.info("hi")
        var response;

        if (userData.Email == null || userData.Password == null) return await Apiresponse(statusMessage.NULL_VALUES, null);

        const user = await UserModel.findOne({Email : userData.Email})
        if (user != null) return await Apiresponse( statusMessage.EXISTS, null) 

        // hash password
        const hashedPassword : string = await passwordHasher(userData!.Password) 

        
        // Generate message id and account number
        const systemId = await systemIdGenerator()
        

        const newUser = new UserModel({
            Firstname : userData.Firstname ? userData.Firstname : null,
            Lastname : userData.Lastname ? userData.Lastname : null,
            Username : userData.Firstname,
            Email : userData.Email ? userData.Email : null,
            Phonenumber : null,
            Password : hashedPassword,
            Role : userData.Role,
            Balance : 0,
            Otp : null,
            SystemId : systemId,
            IsEmailVerified : false,
            IsPhoneNoVerified : false,
        })
        const savedUser = await newUser.save()

        // generate otp
        const otp = await OtpGenerator();
        // await mailer(registrationMail({otp : otp}),[userData.Email],null)
     
        const data = {
            User : savedUser,
            AuthToken : await generateToken(savedUser._id, savedUser.Role)
        }
        return await Apiresponse(statusMessage.SUCCESSFUL, data)

    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}

export const signIn = async (userData : signInDto ) => {
    try{
        if (userData.Email == null || userData.Password == null) return await Apiresponse(statusMessage.NULL_VALUES, null) ;

        const user = await UserModel.findOne({Email : userData.Email})
        if (user == null) return await  Apiresponse(statusMessage.INEXISTENT, null)  

        const isPasswordCorrect = await bcrypt.compare(userData.Password, user!.Password)

        if (!isPasswordCorrect) return await Apiresponse( statusMessage.INCORRECT_DATA, null)  

        const response = {
            User : user,
            AuthToken : await generateToken(user._id, user.Role)
        }
        return await Apiresponse( statusMessage.SUCCESSFUL, response)  
        

    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}

export const changePassword = async (userData : changePasswordDto ) => {
    try{

        const user = await UserModel.findById(userData.Id)
        if (user == null) return await Apiresponse(statusMessage.INEXISTENT, null)  

        const isPasswordCorrect = await bcrypt.compare(userData.OldPassword, user!.Password)
        if (!isPasswordCorrect) return await Apiresponse( statusMessage.INCORRECT_DATA, null)  
        
        user!.Password = userData.NewPassword
        const savedUser = await user.save()

        const response = {
            User : savedUser,
        }
        return await  Apiresponse( statusMessage.SUCCESSFUL, response)  

    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}



export const changeEmail = async (userData : changeEmailDto ) => {
    try{

        const user = await UserModel.findById(userData.Id)
        if (user == null) return await Apiresponse(statusMessage.INEXISTENT,null)

        const ifEmailExists = await UserModel.findOne({ Email : userData.NewEmail})
        if(ifEmailExists != null) return await Apiresponse(statusMessage.EXISTS,null)
         
        user.Email = userData.NewEmail
        user.IsEmailVerified = false
         
        const savedUser = await user.save()
        
        const response = {
            User : savedUser,
        }
        return  await Apiresponse(statusMessage.SUCCESSFUL, response)
        
    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}



export const changePhoneNumber = async (userData : changePhoneNumberDto ) => {
    try{

        const user = await UserModel.findById(userData.Id)
        if (user == null) return await Apiresponse(statusMessage.INEXISTENT,null)

        user.Phonenumber = userData.NewPhoneNo
        user.IsPhoneNoVerified = false
         
        const savedUser = await user.save()
        
        const response = {
            User : savedUser,
        }
        return await Apiresponse(statusMessage.SUCCESSFUL, response)

    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}



export const activateUser = async (Id : any ) => {
    try{

        const user = await UserModel.findById(Id)
        if (user == null) return await Apiresponse(statusMessage.INEXISTENT,null)

        user.Status = userStatus.ACTIVE

        await user.save()
       
        return await Apiresponse(statusMessage.SUCCESSFUL, null)

    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}


export const deActivateUser = async (Id : any ) => {
    try{

        const user = await UserModel.findById(Id)
        if (user == null) return await Apiresponse(statusMessage.INEXISTENT,null)

        user.Status = userStatus.INACTIVE

        await user.save()
     
        return await Apiresponse(statusMessage.SUCCESSFUL, response)

    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}

// export const validateEmail = async (userData : validateEmailDto ) => {
//     try{

//         const user = await UserModel.findById(userData.Id)
//         if (user == null) return await Apiresponse(statusMessage.INEXISTENT,null)

//         user.Phonenumber = userData.NewPhoneNo
//         user.IsPhoneNoVerified = false
         
//         await user.save()
        
//         const response = {
//             User : user,
//         }
//         return await Apiresponse(statusMessage.SUCCESSFUL, response)

//     }catch(e : any){
//         return await Apiresponse(e.message, null) 
//     }
// }