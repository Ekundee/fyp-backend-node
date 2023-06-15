import { Console } from "winston/lib/winston/transports";
import { statusMessage, userRole, userStatus } from "../enum/utility.enum";
import { changeEmailDto, changePasswordDto, changePhoneNumberDto, getRefreshTokenDto, signInDto, signUpDto, validateEmailDto } from "../inteface/authorization.interface";
import { registrationMail } from "../mails";
import OtpModel from "../model/otp.model";
import UserModel, { IUserSchema } from "../model/user.model";
import { Apiresponse, generateToken, logger, mailer, OtpGenerator, passwordHasher, systemIdGenerator, userOtpGenerator } from "./utility.service";
import bcrypt from "bcrypt"
import { response } from "express";
import mongoose from "mongoose";

export const getRefreshToken = async(userdata : getRefreshTokenDto)=>{
    try{

        const token = await generateToken(userdata.Id, userdata.Role);
        const response = {
            AuthToken : token
        }
        return await Apiresponse(200,statusMessage.SUCCESSFUL,response)
    }catch(e : any){
        return await Apiresponse(200,e.message, null) 
    }
}


export const signUp = async (userData : signUpDto ) => {
     try{
          var response;

          if (userData.Email == null || userData.Password == null) return await Apiresponse(400, statusMessage.UNSUCCESSFUL, "User does not exist", null);

          const user = await UserModel.findOne({Email : userData.Email})
          if (user != null) return await Apiresponse(400, statusMessage.UNSUCCESSFUL, "User already exists", null) 

          // hash password
          const hashedPassword : string = await passwordHasher(userData!.Password) 

          
          // Generate message id and account number
          const systemId = await systemIdGenerator()
        
          var newUser;
          {
               userData.Role == userRole.USER ? 

               newUser = new UserModel({
                    Firstname : userData.Firstname ? userData.Firstname : null,
                    Lastname : userData.Lastname ? userData.Lastname : null,
                    Username : userData.Firstname,
                    Email : userData.Email ? userData.Email : null,
                    Phonenumber : null,
                    Password : hashedPassword,
                    Role : userData.Role,
                    ConsultantInformation : null,
                    Balance : 0,
                    Otp : null,
                    SystemId : systemId,
                    IsEmailVerified : false,
                    IsPhoneNoVerified : false,
               })

               :

               newUser = new UserModel({
                    Firstname : userData.Firstname ? userData.Firstname : null,
                    Lastname : userData.Lastname ? userData.Lastname : null,
                    Username : userData.Firstname,
                    Email : userData.Email ? userData.Email : null,
                    Phonenumber : null,
                    Password : hashedPassword,
                    Role : userData.Role,
                    ConsultantInformation : {
                         LicenseNumber : userData.LicenseNumber,
                         Specialization : "userData.Specialization"
                    },
                    Balance : 0,
                    Otp : null,
                    SystemId : systemId,
                    IsEmailVerified : false,
                    IsPhoneNoVerified : false,
               })
          }

             
          const savedUser = await newUser.save()

          // generate otp
          const otp = await userOtpGenerator(savedUser._id);
          // await mailer(registrationMail({otp : otp.T}),[userData.Email],null)
     
          const data = {
               User : savedUser,
               AuthToken : await generateToken(savedUser._id, savedUser.Role)
          }

        return await Apiresponse(200,statusMessage.SUCCESSFUL,"Registration successful", data)

     }catch(e : any){
               return await Apiresponse(200,statusMessage.UNSUCCESSFUL, e.message, null) 
     }
}

export const signIn = async (userData : signInDto) => {
     try{
          if (userData.Email == null || userData.Password == null || userData.Role == null) return await Apiresponse(400,statusMessage.UNSUCCESSFUL, "Please fill all fields",null) ;

          const user = await UserModel.findOne({Email : userData.Email, Role : userData.Role})
          if (user == null) return await  Apiresponse(400, statusMessage.UNSUCCESSFUL, "User does not exist", null)  

          const isPasswordCorrect = await bcrypt.compare(userData.Password, user!.Password)

          if (!isPasswordCorrect) return await Apiresponse(400, statusMessage.UNSUCCESSFUL, "Incorrect password", null)  

          const response = {
               User : user,
               AuthToken : await generateToken(user._id, user.Role)
          }
          return await Apiresponse(200, statusMessage.SUCCESSFUL, "Login successful", response)  
     }catch(e : any){
          return await Apiresponse(200,statusMessage.UNSUCCESSFUL, e.message, null) 
     }
}

export const changePassword = async (userData : changePasswordDto ) => {
    try{

        const user = await UserModel.findById(userData.Id)
        if (user == null) return await Apiresponse(400,statusMessage.UNSUCCESSFUL, "User not found", null)  

        const isPasswordCorrect = await bcrypt.compare(userData.OldPassword, user!.Password)
        if (!isPasswordCorrect) return await Apiresponse(400, statusMessage.UNSUCCESSFUL, "Put the correct old password!", null)  
        
        user!.Password =  await passwordHasher(userData.NewPassword)
        const savedUser = await user.save()

        const response = {
            User : savedUser,
        }
        return await  Apiresponse(200, statusMessage.SUCCESSFUL, "Password Changed",response)  

    }catch(e : any){
        return await Apiresponse(400, statusMessage.UNSUCCESSFUL ,e.message, null) 
    }
}



export const changeEmail = async (userData : changeEmailDto ) => {
    try{

        const user = await UserModel.findById(userData.Id)
        if (user == null) return await Apiresponse(200,statusMessage.INEXISTENT,null)

        const ifEmailExists = await UserModel.findOne({ Email : userData.NewEmail})
        if(ifEmailExists != null) return await Apiresponse(200,statusMessage.EXISTS,null)
         
        user.Email = userData.NewEmail
        user.IsEmailVerified = false
         
        const savedUser = await user.save()
        
        const response = {
            User : savedUser,
        }
        return  await Apiresponse(200,statusMessage.SUCCESSFUL, response)
        
    }catch(e : any){
        return await Apiresponse(200,e.message, null) 
    }
}



export const changePhoneNumber = async (userData : changePhoneNumberDto ) => {
    try{

        const user = await UserModel.findById(userData.Id)
        if (user == null) return await Apiresponse(200,statusMessage.INEXISTENT,null)

        user.Phonenumber = userData.NewPhoneNo
        user.IsPhoneNoVerified = false
         
        const savedUser = await user.save()
        
        const response = {
            User : savedUser,
        }
        return await Apiresponse(200,statusMessage.SUCCESSFUL, response)

    }catch(e : any){
        return await Apiresponse(200,e.message, null) 
    }
}



export const activateUser = async (Id : any ) => {
    try{

        const user = await UserModel.findById(Id)
        if (user == null) return await Apiresponse(200,statusMessage.INEXISTENT,null)

        user.Status = userStatus.ACTIVE

        await user.save()
       
        return await Apiresponse(200,statusMessage.SUCCESSFUL, null)

    }catch(e : any){
        return await Apiresponse(200,e.message, null) 
    }
}


export const deActivateUser = async (Id : any ) => {
    try{

        const user = await UserModel.findById(Id)
        if (user == null) return await Apiresponse(200,statusMessage.INEXISTENT,null)

        user.Status = userStatus.INACTIVE

        await user.save()
     
        return await Apiresponse(200,statusMessage.SUCCESSFUL, response)

    }catch(e : any){
        return await Apiresponse(200,e.message, null) 
    }
}

export const validateEmail = async (userData : validateEmailDto ) => {
     try{
          const user = await UserModel.findById(userData.Id)

          console.log(userData)
          if (user == null) return await Apiresponse(400,statusMessage.UNSUCCESSFUL, "User does not exist",null)

          const otp = await OtpModel.findById(user!.Otp)
          if (otp == null) return await Apiresponse(400,statusMessage.UNSUCCESSFUL, "OTP expired",null)
          
          if(otp.Token != userData.Otp) return await Apiresponse(400,statusMessage.UNSUCCESSFUL, "Wrong OTP",null)
          
          user.IsEmailVerified = true
          const savedUser = await user.save()
          
          const response = {
               User : savedUser,
          }
          return await Apiresponse(200,statusMessage.SUCCESSFUL, "Email Authorized", response)

     }catch(e : any){
          return await Apiresponse(400, statusMessage.UNSUCCESSFUL ,e.message, null) 
     }
}