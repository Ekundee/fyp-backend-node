import { serviceCodes, statusMessage } from "../enum/utility.enum"
import { TransactionChannel, TransactionStatus, TransactionType, postingType } from "../enum/wallet.enum"
import { CreateSessionDto, getConsultantSessionDTO, getUserSessionDTO } from "../inteface/session.interface"
import SessionModel from "../model/session.model"
import TransactionModel from "../model/transaction.model"
import UserModel from "../model/user.model"
import { Apiresponse, generateReference } from "./utility.service"

export async function CreateSession(userData : CreateSessionDto ){
    try{
        const existingUserSession = await SessionModel.findOne({ UserId : userData.UserId })
        const existingConsultantSession = await SessionModel.findOne({ ConsultantId : userData.ConsultantId })
        if(existingUserSession != null) return Apiresponse(400, statusMessage.UNSUCCESSFUL, "User has an existing session", null) 
        if(existingConsultantSession != null) return Apiresponse(400, statusMessage.UNSUCCESSFUL, "Consultant is booked currently", null) 
        
        var user = await UserModel.findById(userData.UserId)

        var currentTime = new Date().getTime()
        var sessionEnd = currentTime + (userData.Hours * 3600000)

        const fee = 0
        const reference =  await generateReference()

        var amount : number = 1000 * userData.Hours
        const newTransaction = new TransactionModel({
            UserId : userData.UserId,
            Reference : reference,
            ThirdPartyReference : await generateReference(),
            AccountNumber : user?.SystemId,
            AccountName : user?.Firstname + " " + user?.Lastname,
            Channel : TransactionChannel.CARD, //wallet, mobile money, bank, Card
            Description : "Deposit",
            Currency : "₦",
            Amount : amount,
            ExchangeRate : 1.0,
            PostingType : postingType.DR,
            IsInternalAccount : false,
            BalanceAfterTransaction : user!.Balance + amount,
            DateOfTransaction : new Date(),
            Type : TransactionType.TRANSACTION,  //commission, transaction
            Status : TransactionStatus.SUCCESSFUL,
            BalanceBeforeTransaction : user!.Balance,
            TrxAmount : amount - fee, 
            TrxFee : fee,
            StatusCode : "400",
            StatusDescription : "SUCCESSFUL",
            Service : serviceCodes.CONSULTANCY, // Consultancy
        })

        const savedTransaction = await newTransaction.save()

        const newSession = new SessionModel({
            Reference : reference,
            UserId : userData.UserId,
            TimeOfSessionStart : new Date(currentTime),
            TimeOfSessionEnd : new Date(sessionEnd),
            ConsultantId : userData.ConsultantId,
        })

        const savedSession = await newSession.save()
        
        const response = {
            Session : savedSession
        }
        return await Apiresponse(200, statusMessage.SUCCESSFUL, "Session saved", response)  
    }catch(e : any){
        return await Apiresponse(200, statusMessage.UNSUCCESSFUL, e.message, null) 
    }
}


export async function getUserSession(userData : getUserSessionDTO ){
    try{
        const userSession = await SessionModel.find({ UserId : userData.UserId })

        const response = {
            Session : userSession
        }
        return await Apiresponse(200, statusMessage.SUCCESSFUL, "User Session", response)  
    }catch(e : any){
        return await Apiresponse(200, statusMessage.UNSUCCESSFUL, e.message, null) 
    }
}



export async function getConsultantSession(userData : getConsultantSessionDTO ){
    try{
        const userSession = await SessionModel.find({ ConsultantId : userData.ConsultantId })

        const response = {
            Session : userSession
        }
        return await Apiresponse(200, statusMessage.SUCCESSFUL, "Consultant Session", response)  
    }catch(e : any){
        return await Apiresponse(200, statusMessage.UNSUCCESSFUL, e.message, null) 
    }
}