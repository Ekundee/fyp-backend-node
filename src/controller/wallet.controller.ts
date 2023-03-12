import { Request, Response } from "express";
import { CardFundingDto, transferFundDto } from "../inteface/wallet.interface";
import { cardFunding, transferFunds } from "../service/wallet.service";




export const transferFundsController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Transfer funds"
        #swagger.tags = ["Wallet"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
        #swagger.parameters["body"] = {
            in : 'body',
            schema : {
                ConsultantId : "1232_3242311_23232132_232323",
                Description : "This is a successful transaction",
                Amount : 50000
            }
        }
    */
    try{
        const { Id } = res.locals.decodedToken
        const { ConsultantId, Description, Amount } = req.body

        const transferFundDto : transferFundDto = {
            UserId : Id,
            ConsultantId : ConsultantId,
            Description : Description,
            Amount : Amount, 
        }
        const transfer_funds = await transferFunds(transferFundDto);
        res.status(200).json(transfer_funds)
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}

// Session payment
export const sessionPaymentController = async(req : Request, res : Response) =>{
    try{
        return "string"
    }catch(e : any) {
        return e.data.response ? e.data.response : e.message
    }
}






export const cardFundingController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Deposit with card"
        #swagger.tags = ["Wallet"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
        #swagger.parameters["body"] = {
            in : 'body',
            schema : {
                Amount : "40000",
                Cvv : "408",
                CardNumber : "4084084084084081",
                ExpiryDate : "01/99",
            }
        }
    */
    try{
        const { Id } = res.locals.decodedToken
        const { Amount, Cvv, CardNumber, ExpiryDate } = req.body

        const CardFundingDto : CardFundingDto = {
            Id : Id,
            Amount : Amount,
            Cvv : Cvv,
            CardNumber : CardNumber,
            ExpiryDate : ExpiryDate,
        }
        const transfer_funds = await cardFunding(CardFundingDto);
        res.status(200).json(transfer_funds)
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}
