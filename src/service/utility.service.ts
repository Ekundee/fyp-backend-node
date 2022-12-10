import { IApiResponse, IMessageConfig } from "../inteface/utility.interface";
import bcrypt from "bcrypt"
import nodemailer, { SendMailOptions, Transporter } from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Schema } from "mongoose";
import { userRole } from "../enum/utility.enum";


var response : IApiResponse



// Auth token generator
export const generateToken = async(id : Schema.Types.ObjectId, role : userRole) =>{
    try{

    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}

// Mailer
export const mailer = async(messageConfig : IMessageConfig, To : string[], mailConfig : SMTPTransport.Options | null) =>{
    try{
        const defaultMailConfig : SMTPTransport.Options = {
            host : "smtp.gmail.com",
            port : 465,
            // secure : false,
            auth : {
                user : "infos.tipit@gmail.com",
                pass : "jbyxnipxdbpsckhr"
            },
            tls: {
                rejectUnauthorized: false
            }
        }
        if (mailConfig == null) mailConfig = defaultMailConfig

        const transporter : Transporter = nodemailer.createTransport(mailConfig)

        var response : Record<string,any>[] = []
        var sendMail : SendMailOptions = {}

        for(let i = 0; i<To.length; i++){
            sendMail  = await transporter.sendMail({
                to : To[i],
                from : "Tipit",
                subject : messageConfig.subject,
                html : messageConfig.html
            })
            response.push(sendMail)
        }

        return response
    }catch (e : any ) {
        return e.data.response ? e.data.response : e.message
    }
}


// Otp
export const OtpGenerator = async()=>{
    try{
        var value1 = Math.floor(Math.random() * 10)
        var value2 = Math.floor(Math.random() * 10)
        var value3 = Math.floor(Math.random() * 10)
        var value4 = Math.floor(Math.random() * 10)
        var otpString = value1 + "" + value2 + "" + value3 + "" + value4
        var otp = parseInt(otpString)
        return otp
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}

// Apiresonse
export const Apiresonse = async(message : string, data : any)=>{
    try{
        response = {
            Message : message,
            Data : data
        } 
        return response
    }catch(e : any){
        response = {
            Message : message,
            Data : e.data.response
        }
        return response 
    }
}

// Password Hasher
export const passwordHasher = async(password : string): Promise<string> => {
    try{
        const saltNumber = 10
        const salt = await bcrypt.genSalt(saltNumber)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}


// Strict similarity checker
export const strictSimilarityChecker = async(x : any, y : any) : Promise<boolean> =>{
    try{
        if(x == y) return true
        else return false
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}


// validator system

// Api-key protector

// Super admin system

// Transaction system

