import { Request, Response } from "express";
import { statusMessage } from "../enum/utility.enum";
import { signUpDto, signInDto, changePasswordDto, getRefreshTokenDto, changeEmailDto, changePhoneNumberDto, validateEmailDto, getChatRoomParticipantsDto, getChatRoomByParticipantsDto } from "../inteface/authorization.interface";
import { activateUser, changeEmail, changePassword, changePhoneNumber, deActivateUser, getChatRoomByParticipants, getChatRoomParticipants, getRefreshToken, signIn, signUp, validateEmail } from "../service/authorization.service";
import { Apiresponse, userOtpGenerator } from "../service/utility.service";
import ChatroomModel from "../model/chatroom.model";


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
                 "Password": "1234567!",
                 "State" : "Lagos"
             }
         } 
         #swagger.security = [{
             "Api_Key" : [],
             "Authorization" : [],
         }]
     */
     
      try{
          const {Firstname, Lastname, Role, Email, Password, State, Specialization, LicenseNumber } = req.body
           
          const userData : signUpDto = {
               Firstname : Firstname,
               Lastname : Lastname,
               Role : Role,
               Email : Email,
               Password : Password,
               State : State,
               LicenseNumber : LicenseNumber,
               Specialization : Specialization
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
                 "Password": "1234567!",
                 "Role" : "U"
             }
         } 
         
     */
     try{
         const {Email, Password, Role} = req.body
         
           const userData : signInDto = {
                Email : Email,
                Password : Password,
                Role : Role
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
        const response = await Apiresponse(200, statusMessage.SUCCESSFUL, "User Email successfully changed", generateOtp)
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
        const response = await Apiresponse(200, statusMessage.SUCCESSFUL, "User Activated",  activate_user)
        res.status(200).json(response)
    }catch(e : any){
        return e.message
    }
}


export const deActivateUserController = async (req : Request, res : Response)=> {
     /*
         #swagger.tags=["Authorization"]
         #swagger.summary="de-activate user"
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
         const response = await Apiresponse(200, statusMessage.SUCCESSFUL, "User successfully deactivated", activate_user)
         res.status(200).json(response)
     }catch(e : any){
         return e.message
     }
 }

 
 export const validateEmailController = async (req : Request, res : Response)=> {
     /*
          #swagger.tags=["Authorization"]
          #swagger.summary="Activate user"
          #swagger.security=[{
               "Api_Key" : [],
               "Authorization" : [],
          }]
 
          #swagger.parameters['body'] = {
               in : 'body',
               schema : {
                    "Otp" : 123456
               }
          }
     */
     try{
          const { Id } = res.locals.decodedToken
          const { Otp } = req.body

          const userData : validateEmailDto = { 
               Id : Id,
               Otp : Otp
          }
          const response = await validateEmail(userData);
          res.status(200).json(response)
     }catch(e : any){
         return e.message
     }
 }
 

 export const getChatRoomParticipantsController = async (req : Request, res : Response)=> {
    /*
         #swagger.tags=["Authorization"]
         #swagger.summary="Get chatroom participant"
         #swagger.security=[{
              "Api_Key" : [],
              "Authorization" : [],
         }]

         #swagger.parameters['ChatRoom'] = {
              in : 'query',
         }
    */
    try{
        const { Id } = res.locals.decodedToken
        const { ChatRoom } : any = req.query

        const userData : getChatRoomParticipantsDto = { 
            ChatRoom: ChatRoom
        }
        const response = await getChatRoomParticipants(userData);
        res.status(200).json(response)
    }catch(e : any){
        return e.message
    }
}



export const getChatRoomByParticipantsController = async (req : Request, res : Response)=> {
    /*
         #swagger.tags=["Authorization"]
         #swagger.summary="Get chatroom participant"
         #swagger.security=[{
              "Api_Key" : [],
              "Authorization" : [],
         }]

         #swagger.parameters['body'] = {
              in : 'body',
              schema : {
                Participant : "fiojokdfeij"
              }
         }
    */
    try{
        const { Id } = res.locals.decodedToken
        const { Participants } : any = req.body

        const userData : getChatRoomByParticipantsDto = { 
            Participants: [Id, Participants]
        }

        const response = await getChatRoomByParticipants(userData);
        res.status(200).json(response)
    }catch(e : any){
        return e.message
    }
}
