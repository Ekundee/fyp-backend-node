import mongoose from "mongoose";
import { statusMessage } from "../enum/utility.enum";
import { rateUserDto } from "../inteface/rate.interface";
import { RateModel } from "../model/rate.model";
import UserModel from "../model/user.model";
import { Apiresponse } from "./utility.service";

// rate user
export const rateUser = async(rateUserDto : rateUserDto) =>{
    try{
        const {  RaterId, RateeId, StarRating, ReviewMessage } = rateUserDto
        const newRating = new RateModel({
            RaterId : RaterId,
            RateeId : RateeId,
            StarRating : StarRating,
            ReviewMessage : ReviewMessage,
            Date : new Date().toLocaleString()
        })

        const savedRating = await newRating.save()
      
        return await Apiresponse(200, statusMessage.SUCCESSFUL, "User rated", savedRating)
        
    }catch(e : any){
        return await  Apiresponse(400, statusMessage.UNSUCCESSFUL, e.message, null)
    }
}

// get all the ratings for the day
export const getTodayRating = async() =>{
    try{
        const todayDate = new Date().toLocaleDateString();
        const ratings = await RateModel.find({ Date : {$gte : todayDate} })
        const response = {
            Rating : ratings
        }

        return await Apiresponse(200,statusMessage.SUCCESSFUL, "Successful", response)
    }catch(e : any){
        return await  Apiresponse(400, statusMessage.UNSUCCESSFUL, e.message, null)
    }
}

// get all the ratings for a user
export const getUserRating = async(Id : any) =>{
    try{
        const ratings = await RateModel.find({ RateeId : Id})
        const response = {
            Rating : ratings
        }

        return await Apiresponse(200,statusMessage.SUCCESSFUL, "Successful", response)
    }catch(e : any){
        return await  Apiresponse(400, statusMessage.UNSUCCESSFUL, e.message, null)
    }
}

// get all the ratings for a user for today
export const getUserTodayRating = async(Id : any) =>{
    try{
        const todayDate = new Date().toLocaleDateString();
        const ratings = await RateModel.find({ RateeId : Id, Date : {$gte : todayDate}})
        const response = {
            Rating : ratings
        }

        return await Apiresponse(200,statusMessage.SUCCESSFUL, "Successful", response)
    }catch(e : any){
        return await  Apiresponse(400, statusMessage.UNSUCCESSFUL, e.message, null)
    }
}



// get the cummulative star rating for all users✅
export const getAllUserStarRating = async() =>{
    try{
        const user = await UserModel.find({});

        var starRatingDict : Record<string,number>= {}
        var cummStarRating
        for(let i = 0; i < user.length; i++){
            cummStarRating = (await getUserStarRating(user[i]!._id)).Data.Rating
            starRatingDict[user[i]!._id] = cummStarRating
        }

        const response = {
            Rating : starRatingDict
        }

        return await Apiresponse(200,statusMessage.SUCCESSFUL, "Successful", response)
    }catch(e : any){
        return await  Apiresponse(400, statusMessage.UNSUCCESSFUL, e.message, null)
    }
}


// get the cummulative star rating for a particular user by id✅
export const getUserStarRating = async(Id : any) =>{
    try{
        const ratings = await RateModel.find({ RateeId : Id})
        var cummStarRating
        if (ratings.length != 0) {
            const starRating = ratings.map((x) => x.StarRating)
            cummStarRating = starRating.reduce((a,b)=>a+b)/ratings.length
        }else{
            cummStarRating = 0
        }
        const response = {
            Rating : cummStarRating
        }

        return await Apiresponse(200,statusMessage.SUCCESSFUL, "Successful", response)
    }catch(e : any){
        return await Apiresponse(400, statusMessage.UNSUCCESSFUL, e.message, null)
    }
}

