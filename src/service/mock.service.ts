import { serviceCodes, statusMessage } from "../enum/utility.enum"
import { TransactionChannel, TransactionStatus, TransactionType, postingType } from "../enum/wallet.enum"
import { mockedDepositDto } from "../inteface/mock.interface"
import TransactionModel from "../model/transaction.model"
import UserModel from "../model/user.model"
import { Apiresponse, generateReference } from "./utility.service"
import bcrypt from "bcrypt"

export const mockedDeposit = async(userData :  mockedDepositDto) =>{
    try{
        const user  = await UserModel.findById(userData.Id)
        const isPasswordMatch = await bcrypt.compare(userData.Password, user!.Password)
        console.log(isPasswordMatch)
        if (isPasswordMatch == false) return await Apiresponse(400, statusMessage.SUCCESSFUL, "Incorrect password", null)

        const fee = 0
        const newTransaction = new TransactionModel({
            UserId : userData.Id,
            Reference : await generateReference(),
            ThirdPartyReference : await generateReference(),
            AccountNumber : user?.SystemId,
            AccountName : user?.Firstname + " " + user?.Lastname,
            Channel : TransactionChannel.CARD, //wallet, mobile money, bank, Card
            Description : "Deposit",
            Currency : "₦",
            Amount : userData.Amount,
            ExchangeRate : 1.0,
            PostingType : postingType.CR,
            IsInternalAccount : false,
            BalanceAfterTransaction : user!.Balance + userData.Amount,
            DateOfTransaction : new Date(),
            Type : TransactionType.TRANSACTION,  //commission, transaction
            Status : TransactionStatus.SUCCESSFUL,
            BalanceBeforeTransaction : user!.Balance,
            TrxAmount : userData.Amount - fee, 
            TrxFee : fee,
            StatusCode : "400",
            StatusDescription : "SUCCESSFUL",
            Service : serviceCodes.CONSULTANCY, // Consultancy
        })

        user!.Balance = user!.Balance + userData.Amount
        await user?.save()
        const savedTransaction = await newTransaction.save()

        const response = {
            Transaction : savedTransaction
        }
        return await Apiresponse(200, statusMessage.SUCCESSFUL, "Deposit completed", response)
    }catch(e : any){
        return await Apiresponse(400, statusMessage.UNSUCCESSFUL, e.message, null) 
    }
}

