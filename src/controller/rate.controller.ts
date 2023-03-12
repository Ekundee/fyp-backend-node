import { Request, Response } from "express";
import { rateUserDto } from "../inteface/rate.interface";
import { getAllUserStarRating, getTodayRating, getUserRating, getUserStarRating, getUserTodayRating, rateUser } from "../service/rating.service";

// rate user
export const rateUserController = async(req : Request, res : Response) =>{
    /**
     
        #swagger.summary = "This is to rate users"
        #swagger.tags = ["Rating and Reviews"]
        #swagger.parameters['body'] = {
            in : 'body',
            schema :  { 
                RateeId : "1246789043423456435", 
                StarRating : 5, 
                ReviewMessage : "This is my review message"
            }
        }

        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    try{
        const { Id } = res.locals.decodedToken
        const { RateeId, StarRating, ReviewMessage } = req.body
        const rateUserDto : rateUserDto = {
            RaterId : Id,
            RateeId : RateeId,
            StarRating : StarRating,
            ReviewMessage : ReviewMessage,
        }
        const rate_user = await rateUser(rateUserDto)
        return res.status(200).json(rate_user)
    }catch(e : any){
        return  res.status(200).json(e.message)
    }
}

// get the rating for today
export const getTodayRatingController = async(req : Request, res : Response) =>{
    /** 
     
        #swagger.summary = "This is to get all ratings and reviews for today"
        #swagger.tags = ["Rating and Reviews"]
    
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    try{
        const getRate = await getTodayRating()
        return res.status(200).json(getRate)
    }catch(e : any){
        return e.message
    }
}


// get a user ratings
export const getUserRatingController = async(req : Request, res : Response) =>{
    /** 
     
        #swagger.summary = "This is to get a user ratings and reviews"
        #swagger.tags = ["Rating and Reviews"]
    
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]

        
        #swagger.parameters['id'] = {
            in : 'query',
        }
    */
    try{
        const { id } = req.query

        const get_user_today_rating = await getUserRating(id)
        return res.status(200).json(get_user_today_rating)
    }catch(e : any){
        return e.message
    }
}


// get a user rating for today
export const getUserTodayRatingController = async(req : Request, res : Response) =>{
    /** 
     
        #swagger.summary = "This is to get a user ratings and reviews for today"
        #swagger.tags = ["Rating and Reviews"]
    
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]

        
        #swagger.parameters['id'] = {
            in : 'query',
        }
    */
    try{
        const { id } = req.query

        const get_user_today_rating = await getUserTodayRating(id)
        return res.status(200).json(get_user_today_rating)
    }catch(e : any){
        return e.message
    }
}



// get the rating for today
export const getUserStarRatingController = async(req : Request, res : Response) =>{
    /** 
     
        #swagger.summary = "This is to get user star rating"
        #swagger.tags = ["Rating and Reviews"]
    
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]

        #swagger.parameters['id'] = {
            in : 'query',
        }
    */
    try{
        const { id } = req.query

        const get_user_star_rating = await getUserStarRating(id)
        return res.status(200).json(get_user_star_rating)
    }catch(e : any){
        return e.message
    }
}


// get the rating for today
export const getAllUserStarRatingController = async(req : Request, res : Response) =>{
    /** 
     
        #swagger.summary = "This is to get all user star rating"
        #swagger.tags = ["Rating and Reviews"]
    
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    try{

        const get_all_user_star_rating = await getAllUserStarRating()
        return res.status(200).json(get_all_user_star_rating)
    }catch(e : any){
        return e.message
    }
}

