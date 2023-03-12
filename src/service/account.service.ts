import mongoose from "mongoose";
import { statusMessage } from "../enum/utility.enum";
import { AddInternalAccountDto } from "../inteface/account.interface";
import InternalAccountModel from "../model/internalAccount.model";
import { Apiresponse } from "./utility.service";

// Get all internal account
export const getAllInternalAccount = async() =>{
    try{
        const internalAccounts = await InternalAccountModel.find({})
        
        const response = {
            InternalAccount : internalAccounts
        }
        return await Apiresponse( statusMessage.SUCCESSFUL, response)  
        
        
    }catch(e : any){
        return await Apiresponse(e.data.response ? e.data.response : e.message, null) 
    }
}

// Get an internal account
export const getInternalAccountById = async(Id : any) =>{
    try{
        const internalAccount = await InternalAccountModel.findById(Id)
        
        const response = {
            InternalAccount : internalAccount
        }
        return await Apiresponse( statusMessage.SUCCESSFUL, response)  
        
        
    }catch(e : any){
        return await Apiresponse(e.data.response ? e.data.response : e.message, null) 
    }
}

// Add internal account
export const addInternalAccount = async(addInternalAccountDto : AddInternalAccountDto) =>{
    try{
        const newInternalAccount = new InternalAccountModel({
            AccountNumber : addInternalAccountDto.AccountNumber, 
            AccountName : addInternalAccountDto.AccountName,
            Currency : addInternalAccountDto.Currency,
            Code : addInternalAccountDto.Code,
            Balance : addInternalAccountDto.Balance,
            Status : addInternalAccountDto.Status,
            Category : addInternalAccountDto.Category, // consultancy
            Description : addInternalAccountDto.Description,
            DateMapped : addInternalAccountDto.DateMapped
        })
        
        const savedInternalAccount = await newInternalAccount.save()
        const response = {
            InternalAccount : savedInternalAccount
        }
        return await Apiresponse( statusMessage.SUCCESSFUL, response)  
        
        
    }catch(e : any){
        return await Apiresponse(e.data.response ? e.data.response : e.message, null) 
    }
}