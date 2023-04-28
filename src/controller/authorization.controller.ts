import { Request, Response } from "express";
import { statusMessage } from "../enum/utility.enum";
import { signUpDto, signInDto, changePasswordDto, getRefreshTokenDto, changeEmailDto, changePhoneNumberDto } from "../inteface/authorization.interface";
import { activateUser, changeEmail, changePassword, changePhoneNumber, deActivateUser, getRefreshToken, signIn, signUp } from "../service/authorization.service";
import { Apiresponse, userOtpGenerator } from "../service/utility.service";


export const getRefreshTokenController = async(req : Request, res : Response)=>{
    /**
        #swagger.summary = "Get refresh token from expired token"
        #swagger.tags = ["Authorization"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    
        try{
            const {Id, Role} = res.locals.decodedToken
            
            const userData : getRefreshTokenDto = {
               Id : Id,
               Role : Role
            } 
    
            const token = await getRefreshToken(userData);
            res.status(200).json(token)
        }catch(e : any){
            return e.message
        }
}

export const signUpController = async (req : Request, res : Response)=> {
    /**
        #swagger.summary = "Signup for users"
        #swagger.tags = ["Authorization"]
        #swagger.parameters["body"] = {
            in:'body',
            schema : {
                "Firstname": "isaiah",
                "Lastname": "Ekundayo",
                "Role": "User",
                "Email": "isaiahekundayo17@gmail.com",
                "Password": "1234567!"
            }
        } 
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    
    try{
          console.log("ji")
        const {Firstname, Lastname, Role, Email, Password} = req.body
        
        const userData : signUpDto = {
            Firstname : Firstname,
            Lastname : Lastname,
            Role : Role,
            Email : Email,
            Password : Password
        } 

        const signup = await signUp(userData);
        res.status(200).json(signup)
    }catch(e : any){
        return e.message
    }
}

export const signInController = async (req : Request, res : Response)=> {
    /*
        #swagger.summary = "Signin for users"
        #swagger.tags = ["Authorization"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
        
        #swagger.parameters["body"] = {
            in:'body',
            schema : {
                "Email": "isaiahekundayo17@gmail.com",
                "Password": "1234567!"
            }
        } 
        
    */
    try{
        const {Email, Password} = req.body
        
        const userData : signInDto = {
            Email : Email,
            Password : Password
        } 

        const signin = await signIn(userData);
        res.status(200).json(signin)
    }catch(e : any){
        return e.message
    }
}

export const changePasswordController = async (req : Request, res : Response)=> {
    /*
        #swagger.tags=["Authorization"]
        #swagger.summary="Change user password"
        #swagger.security=[{
            "Api_Key" : [],
            "Authorization" : [],
        }]
        #swagger.parameters["body"]={
            in : "body",
            schema : {
                OldPassword : "1234567!", 
                NewPassword : "1234567!"
            }
        }
    */
    try{
        const {OldPassword, NewPassword} = req.body
        const {Id} = res.locals.decodedToken

        const userData : changePasswordDto = {
            Id : Id,
            OldPassword : OldPassword,
            NewPassword : NewPassword
        } 

        const changepassword = await changePassword(userData);
        res.status(200).json(changepassword)
    }catch(e : any){
        return e.message
    }
}


export const changeEmailController = async (req : Request, res : Response)=> {
    /*
        #swagger.tags=["Authorization"]
        #swagger.summary="Change user email"
        #swagger.security=[{
            "Api_Key" : [],
            "Authorization" : [],
        }]
        #swagger.parameters["body"]={
            in : "body",
            schema : {
                NewEmail : "isaiahekundayo17@gmail.com"
            }
        }
    */
    try{
        const { Id } = res.locals.decodedToken
        const { NewEmail } = req.body

        const userData : changeEmailDto = {
            Id : Id,
            NewEmail : NewEmail
        } 

        const change_email = await changeEmail(userData);
        res.status(200).json(change_email)
    }catch(e : any){
        return e.message
    }
}


export const changePhoneNumberController = async (req : Request, res : Response)=> {
    /*
        #swagger.tags=["Authorization"]
        #swagger.summary="Change user phone no"
        #swagger.security=[{
            "Api_Key" : [],
            "Authorization" : [],
        }]
        #swagger.parameters["body"]={
            in : "body",
            schema : {
                NewPhoneNo : "+2347036115256"
            }
        }
    */
    try{
        const { Id } = res.locals.decodedToken
        const { NewPhoneNo } = req.body

        const userData : changePhoneNumberDto = {
            Id : Id,
            NewPhoneNo : NewPhoneNo
        } 

        const change_phonenumber = await changePhoneNumber(userData);
        res.status(200).json(change_phonenumber)
    }catch(e : any){
        return e.message
    }
}

export const generateOtpController = async (req : Request, res : Response)=> {
    /*
        #swagger.tags=["Authorization"]
        #swagger.summary="Change user email"
        #swagger.security=[{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    try{
        const { Id } = res.locals.decodedToken
        const generateOtp = await userOtpGenerator(Id);
        const response = await Apiresponse(statusMessage.SUCCESSFUL, generateOtp)
        res.status(200).json(response)
    }catch(e : any){
        return e.message
    }
}

export const activateUserController = async (req : Request, res : Response)=> {
    /*
        #swagger.tags=["Authorization"]
        #swagger.summary="Activate user"
        #swagger.security=[{
            "Api_Key" : [],
            "Authorization" : [],
        }]

        #swagger.parameters['id'] = {
            in : 'query'
        }
    */
    try{
        const { Id } = res.locals.decodedToken
        const activate_user = await activateUser(Id);
        const response = await Apiresponse(statusMessage.SUCCESSFUL, activate_user)
        res.status(200).json(response)
    }catch(e : any){
        return e.message
    }
}


export const deActivateUserController = async (req : Request, res : Response)=> {
    /*
        #swagger.tags=["Authorization"]
        #swagger.summary="Activate user"
        #swagger.security=[{
            "Api_Key" : [],
            "Authorization" : [],
        }]

        #swagger.parameters['id'] = {
            in : 'query'
        }
    */
    try{
        const { Id } = res.locals.decodedToken
        const activate_user = await deActivateUser(Id);
        const response = await Apiresponse(statusMessage.SUCCESSFUL, activate_user)
        res.status(200).json(response)
    }catch(e : any){
        return e.message
    }
}

