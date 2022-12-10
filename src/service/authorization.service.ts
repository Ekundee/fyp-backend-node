import { statusMessage } from "../enum/utility.enum";
import { signInDto, signUpDto } from "../inteface/authorization.interface";
import { registrationMail } from "../mails";
import UserModel, { IUserSchema } from "../model/user.model";
import { Apiresonse, mailer, OtpGenerator, passwordHasher } from "./utility.service";
import bcrypt from "bcrypt"

export const signUp = async (userData : signUpDto ) => {
    try{
        if (userData.Email || userData.Password) return await Apiresonse(statusMessage.NULL_VALUES, null);

        // hash password
        const hashedPassword : string = await passwordHasher(userData!.Password) 

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
            IsEmailVerified : false,
            IsPhoneNoVerified : false,
        })
        const savedUser = await newUser.save()

        // generate otp
        const otp = await OtpGenerator();
        const mail = await mailer(registrationMail({otp : otp}),[userData.Email],null)
        
        return savedUser
    }catch(e : any){
        return e
    }
}

export const signIn = async (userData : signInDto ) => {
    try{
        if (userData.Email == null || userData.Password == null) return statusMessage.NULL_VALUES;

        const user : IUserSchema | null = await UserModel.findOne({Email : userData.Email})
        if (user == null) return statusMessage.INEXISTENT

        const isPasswordCorrect = await bcrypt.compare(userData.Password, user!.Password)

        if (!isPasswordCorrect) return statusMessage.INCORRECT_DATA

        

    }catch(e : any){
        return e
    }
}