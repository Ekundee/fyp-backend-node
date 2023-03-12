import mongoose from "mongoose";

export interface transferFundDto {
    UserId : mongoose.Types.ObjectId,
    ConsultantId : mongoose.Types.ObjectId,
    Description : string,
    Amount : number, 
}

export interface transferFundResponse {
    Amount : number,
    Date : string,
    DestName : string,
    DestNumber : number,
    Reference : string
}

export interface CardFundingDto {
    Id : mongoose.Types.ObjectId,
    Amount : number,
    Cvv : string,
    CardNumber : string,
    ExpiryDate : string,
}

export interface paystackCardDto {
    email: string,
    amount: string,
    metadata?: {
        custom_fields: Record<string,any>[]
    },
    card: {
        cvv: string,
        number: string,
        expiry_month: string,
        expiry_year: string,
    }
}