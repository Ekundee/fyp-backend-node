require("dotenv").config({})
import { IApiResponse, IMessageConfig, TokenPayload } from "../inteface/utility.interface";
import bcrypt from "bcrypt"
import nodemailer, { SendMailOptions, Transporter } from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
import mongoose, { Schema } from "mongoose";
import { statusMessage, userRole } from "../enum/utility.enum";
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import UserModel from "../model/user.model";
import OtpModel from "../model/otp.model";
import axios from "axios";
import winston from "winston"

var response : IApiResponse

// initialized axios
export const useAxios  = axios.create({})


// Database conn
export const dbConnect = () =>{
     console.log("process.env.MONGO_URI")
     console.log(process.env.MONGO_URI)
    try{
          mongoose.connect(process.env.MONGO_URI ? process.env.MONGO_URI : "tool").then(()=>{
               console.log("******-----Connected to Database{FYP}-----******")
          })
    }catch(e : any){
          console.log(e)
        return e.data.response ? e.data.response : e.message
    }
}


// Auth token generator
export const generateToken = async(id : mongoose.Types.ObjectId, role : userRole) =>{
    try{
        const payload = {
            Id : id,
            Role : role,
        }
        const token = jwt.sign(payload, process.env.SECRET ? process.env.SECRET : "secret")
        return token
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


// user Otp
export const userOtpGenerator = async(id : mongoose.Types.ObjectId)=>{
    try{
        var value1 = Math.floor(Math.random() * 10)  == 0 ? 2 : Math.floor(Math.random() * 10)
        var value2 = Math.floor(Math.random() * 10)
        var value3 = Math.floor(Math.random() * 10)
        var value4 = Math.floor(Math.random() * 10)
        var value5 = Math.floor(Math.random() * 10)
        var value6 = Math.floor(Math.random() * 10)
        var otpString = value1 + "" + value2 + "" + value3 + "" + value4 + "" + value5 + "" + value6
        var otp : number = parseInt(otpString)

        const user = await UserModel.findById(id)
        const userOtp = await OtpModel.findOne({ UserId : id })

        if(userOtp == null){
            const newUserOtp = new OtpModel({
                UserId : id,
                Token : otp,
                ExpiresAt : (new Date()).toLocaleString()
            })
            const savedUserOtp = await newUserOtp.save()
            user!.Otp = savedUserOtp._id
            await user!.save()
            return savedUserOtp
        }

        userOtp!.Token = otp
        userOtp!.ExpiresAt = (new Date()).toLocaleString()

        const updatedUserOtp = await userOtp.save()

        user!.Otp = updatedUserOtp._id
        await user!.save()
        
        return updatedUserOtp

    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}


// Protected Route
export const protectedRoute = async(req : Request, res : Response, next : NextFunction) =>{
     try{
          const { authorization } : any = req.headers;
          const token : string = authorization.split(" ")[1]
          const secret : string = process.env.SECRET ? process.env.SECRET : "secret"
          const decodedToken = jwt.verify(token, secret)
          res.locals.decodedToken = decodedToken
          return next()
     }catch(e : any){
          return res.status(401).json(await Apiresponse(200,statusMessage.UNSUCCESSFUL, "User is not authorized to use this route", null))
     }
}


// Generate reference
export const generateReference = async()=>{
     try {
          var referenceNo = ((Date.now() + Math.random()) * 1000).toString()
          var reference = "T"+referenceNo.slice(0,15)
          return reference
     }catch(e : any){
          return e.data.response ? e.data.response : e.message
     }
}


// Apiresponse
export const Apiresponse = async(status : number, sMessage : string, message : string, data : any)=>{
    try{
          response = {
               Status : status ? status : 400 ,
               StatusMessage : sMessage ? sMessage : "successful",
               Message : message ? message : "message",
               Data : data ? data : "data"
          } 
          return response
    }catch(e : any){
          response = {
               Status : 400,
               StatusMessage : sMessage,
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
export const apiKeyProtector = async(req : Request, res : Response, next : NextFunction) =>{
    try{
        const { apikey } : any = req.headers;
        if (apikey != 123456789) res.status(401).json(await Apiresponse(statusMessage.UNAUTHORIZED, null))
        return next()
    }catch(e : any){
        return res.status(401).json(await Apiresponse(statusMessage.UNAUTHORIZED, null))
    }
}


// Super admin system
export const adminProtectedRouteChecker = async(req : Request, res : Response, next : NextFunction) =>{
    try {
        const { authorization } : any = req.headers;
        if(authorization == null) return next()
        const token : string = authorization.split(" ")[1]
        const secret : string = process.env.SECRET ? process.env.SECRET : "secret"
        var decodedToken : any = jwt.verify(token, secret)
        if (decodedToken.Role  == userRole.ADMIN){
            // check for user Id
            var {id} = req.query
            if (id == null) id = decodedToken.Id
            const user = await UserModel.findById(id)
            const newAuthToken = await generateToken(user?._id, user!.Role)
            decodedToken = {
                Id : newAuthToken,
                Role : user!.Role,
                IsAdmin : true
            }
            res.locals.decodedToken = decodedToken
        }
        
        return next()
    }catch(e : any){
        return next()
    }
}

export const adminProtectedRouteValidator = async(req : Request, res : Response, next : NextFunction) =>{
    try {
        const {decodedToken} = res.locals
        if(!decodedToken) return res.status(401).json(await Apiresponse(401,statusMessage.UNAUTHORIZED, "Please login as an admin", null))
        if(!decodedToken.IsAdmin) return res.status(401).json(await Apiresponse(statusMessage.UNAUTHORIZED, null))
        return next()
    }catch(e : any){
        return next()
    }
}


// Transaction system



// Message Id and account number
export const systemIdGenerator = async() =>{
    try {
        var id = ((Date.now() + Math.random()) * 10000).toString().slice(5)
        return id
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}


// logger function
export const logger =  winston.createLogger({
     format : winston.format.simple(),
     transports : [new winston.transports.Console]
})

export function onlyUnique(value : any, index : any, array : any) {
     return array.indexOf(value) === index;
}
  