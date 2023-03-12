import mongoose from "mongoose";

export interface rateUserDto {
    RaterId : mongoose.Types.ObjectId,
    RateeId : mongoose.Types.ObjectId,
    StarRating : number,
    ReviewMessage : string,
}