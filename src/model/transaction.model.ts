import mongoose, { Schema } from "mongoose";
import { postingType } from "../enum/wallet.enum";

export interface ITransactionSchema extends mongoose.Document {
    UserId : mongoose.Types.ObjectId,
    Reference : string,
    ThirdPartyReference : string,
    AccountNumber : number,
    AccountName : string,
    Channel : string, //wallet, mobile money, bank, Card
    Description : string,
    Currency : string,
    Amount : number,
    ExchangeRate : number,
    PostingType : postingType,
    IsInternalAccount : boolean,
    BalanceAfterTransaction : number,
    DateOfTransaction : string,
    Type : string,  //commission, transaction
    Status : string,
    BalanceBeforeTransaction : number,
    TrxAmount : number,
    TrxFee : number,
    StatusCode : string,
    StatusDescription : string,
    Service : string, // Consultancy
}

const transactionSchema = new Schema<ITransactionSchema>({
    UserId : {
        type : Schema.Types.ObjectId,
    },
    Reference : {
        type : String,
    },
    ThirdPartyReference : {
        type : String,
    },
    AccountNumber : {
        type : Number,
    },
    AccountName : {
        type : String,
    },
    Channel : {
        type : String, //wallet, mobile money, bank, Card
    },
    Description : {
        type : String,
    },
    Currency : {
        type : String,
    },
    Amount : {
        type : Number,
    },
    ExchangeRate : {
        type : Number,
    },
    PostingType : {
        type : String,
    },
    IsInternalAccount : {
        type : Boolean,
    },
    BalanceAfterTransaction : {
        type : Number,
    },
    DateOfTransaction : {
        type : String,
    },
    Type : {
        type : String,  //commission, transaction
    },
    Status : {
        type : String,
    },
    BalanceBeforeTransaction : {
        type : Number,
    },
    TrxAmount : {
        type : Number,
    },
    TrxFee : {
        type : Number,
    },
    StatusCode : {
        type : String,
    },
    StatusDescription : {
        type : String,
    },
    Service : {
        type : String, // Consultancy
    }
},{ timestamps : true})

const TransactionModel = mongoose.model("transaction", transactionSchema)

export default TransactionModel