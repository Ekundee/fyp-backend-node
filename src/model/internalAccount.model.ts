import mongoose, { Schema } from "mongoose";

export interface IInternalAccount  extends mongoose.Document{
    AccountNumber : number, 
    AccountName : string,
    Currency : string,
    Code : string,
    Balance : number,
    Status : string,
    Category : string, // consultancy
    Description : string,
    DateMapped : string
}


const InternalAccountSchema = new mongoose.Schema<IInternalAccount> ({
    AccountNumber : {
        type : Number, 
    },
    AccountName : {
        type : String,
    },
    Currency : {
        type : String,
    },
    Code : {
        type : String,
    },
    Balance : {
        type : Number,
    },
    Status : {
        type : String,
    },
    Category : {
        type : String // consultancy
    },
    Description : {
        type : String,
    },
    DateMapped : {
        type : String
    },
},{ timestamps : true})

const InternalAccountModel = mongoose.model("internal_account", InternalAccountSchema)

export default InternalAccountModel