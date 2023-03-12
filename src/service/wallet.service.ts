import { serviceCodes, statusMessage } from "../enum/utility.enum";
import { postingType, transactionStatus } from "../enum/wallet.enum";
import { CardFundingDto, paystackCardDto, transferFundDto, transferFundResponse } from "../inteface/wallet.interface";
import TransactionModel from "../model/transaction.model";
import UserModel from "../model/user.model";
import { Apiresponse, generateReference, useAxios } from "./utility.service";


// Transfer
export const transferFunds = async(transferFundDto : transferFundDto) =>{
    try{
        // generate reference
        const trxReference = await generateReference();
        const user = await UserModel.findById(transferFundDto.UserId)
        const consultant = await UserModel.findById(transferFundDto.ConsultantId)
        const dateNTime = (new Date()).toLocaleDateString()
        // debit user
        const debitUser = new TransactionModel({
            UserId : transferFundDto.UserId,
            Reference : trxReference,
            ThirdPartyReference : trxReference,
            AccountNumber : 1234567890,
            AccountName : user?.Firstname + " " + user?.Lastname,
            Channel : "Wallet", //wallet, mobile money, bank, Card
            Description : transferFundDto.Description,
            Currency : "NGN",
            Amount : transferFundDto.Amount,
            ExchangeRate : 1.0,
            PostingType : postingType.DR,
            IsInternalAccount : false,
            BalanceAfterTransaction : user!.Balance - transferFundDto.Amount,
            DateOfTransaction : dateNTime,
            // Type : string,  //commission, transaction
            Status : transactionStatus.SUCCESSFUL,
            BalanceBeforeTransaction : user!.Balance,
            TrxAmount : transferFundDto.Amount,
            // TrxFee : ,
            StatusCode : "00",
            StatusDescription : "Successful payment",
            Service : serviceCodes.CONSULTANCY, // Consultancy
        })

        user!.Balance = user!.Balance - transferFundDto.Amount
        await user?.save()

        // credit consultant
        const creditConsultant = new TransactionModel({
            UserId : transferFundDto.ConsultantId,
            Reference : trxReference,
            ThirdPartyReference : trxReference,
            AccountNumber : 1234567890,
            AccountName : consultant?.Firstname + " " + consultant?.Lastname,
            Channel : "Wallet", //wallet, mobile money, bank, Card
            Description : transferFundDto.Description,
            Currency : "NGN",
            Amount : transferFundDto.Amount,
            ExchangeRate : 1.0,
            PostingType : postingType.CR,
            IsInternalAccount : false,
            BalanceAfterTransaction : consultant!.Balance - transferFundDto.Amount,
            DateOfTransaction : dateNTime,
            // Type : string,  //commission, transaction
            Status : transactionStatus.SUCCESSFUL,
            BalanceBeforeTransaction : consultant!.Balance,
            TrxAmount : transferFundDto.Amount,
            // TrxFee : ,
            StatusCode : "00",
            StatusDescription : "Successful payment",
            Service : serviceCodes.CONSULTANCY, // Consultancy
        })

        consultant!.Balance = consultant!.Balance - transferFundDto.Amount
        await consultant?.save()


        // Constructing transfer response
        const response : transferFundResponse = {
            Amount : transferFundDto.Amount,
            Date : dateNTime,
            DestName : consultant!.Firstname + " " + consultant!.Lastname,
            DestNumber : 123456789,
            Reference : trxReference
        }
        return await Apiresponse(statusMessage.SUCCESSFUL, response) 


        // save changes
    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}

// Deposit

export const cardFunding = async (cardFundingDto : CardFundingDto) =>{
    try{

        const user = await UserModel.findById(cardFundingDto.Id)
        if(user == null) return await Apiresponse(statusMessage.INEXISTENT, null)

        const paystackCardDto : paystackCardDto  = {
            email : user!.Email,
            amount : cardFundingDto.Amount.toString(),
            card : {
                cvv : cardFundingDto.Cvv,
                number : cardFundingDto!.CardNumber.toString(),
                expiry_month : cardFundingDto!.ExpiryDate.split("/")[0],
                expiry_year : cardFundingDto!.ExpiryDate.split("/")[1]
            }
        }

        const x = await paystackPayWithCard(paystackCardDto);
        console.log(x)

        // const creditAccountResponse = await fundWallet(id, role, amount)

        return await Apiresponse(statusMessage.SUCCESSFUL, null) 
   
    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}

export const paystackPayWithCard = async (paystackCardDto : paystackCardDto) => {
    try{
        const payWithCardPaystack = await useAxios.post("https://api.paystack.co/charge", 
        paystackCardDto,
        {
            headers : { 
                'Authorization': `Bearer ${process.env.PAYSTACK_SECRET}`, 
                'Content-Type': 'application/json'
            }
        })

        return payWithCardPaystack.data
    }catch(e : any){
        return await Apiresponse(e.message, null) 
    }
}


// Withdraw