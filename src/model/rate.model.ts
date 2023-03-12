import mongoose, { Schema } from "mongoose";

export interface IRate {
    RaterId : mongoose.Types.ObjectId,
    RateeId : mongoose.Types.ObjectId,
    StarRating : number,
    ReviewMessage : string,
    Date : string
}

const rateSchema = new Schema<IRate>({
    RateeId : {
        type : Schema.Types.ObjectId
    },
    RaterId : {
        type : Schema.Types.ObjectId
    },
    StarRating : {
        type : Number
    },
    ReviewMessage : {
        type : String
    },
    Date : {
        type : String
    }
},{timestamps : true})

export const RateModel = mongoose.model("rating", rateSchema)