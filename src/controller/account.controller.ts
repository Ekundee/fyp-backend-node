import { Request, Response } from "express";
import { AddInternalAccountDto } from "../inteface/account.interface";
import { addInternalAccount, getAllInternalAccount, getInternalAccountById } from "../service/account.service";


export const getAllInternalAccountController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Get all internal accounts"
        #swagger.tags = ["Account"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    try{

        const internalAccounts = await getAllInternalAccount();
        res.status(200).json(internalAccounts)
    }catch(e : any){
        return e
    }
}

export const getInternalAccountByIdController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Get internal account by Id"
        #swagger.tags = ["Account"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]

        #swagger.parameters['id'] = {
            in : "query",

        }
    */
    try{

        const { id } = req.query

        const internalAccount = await getInternalAccountById(id);
        res.status(200).json(internalAccount)
    }catch(e : any){
        return e
    }
}

export const addInternalAccountController = async (req : Request, res : Response) =>{
    /*
        #swagger.summary = "Add internal account"
        #swagger.tags = ["Account"]
        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
   
        #swagger.parameters["body"] = {
            in : 'body',
            schema : {
                AccountNumber : 1234567890, 
                AccountName : "FYP_POOL_Account",
                Currency : "string",
                Code : "code",
                Balance : 0.0,
                Status : "Active",
                Category : "string",
                Description : "string"
              
            }
        }


    */
    try{

        const { AccountNumber, AccountName, Currency, Code, Balance, Status, Category, Description} = req.body
        const addInternalAccountDto : AddInternalAccountDto = {
            AccountNumber : AccountNumber, 
            AccountName : AccountName,
            Currency : Currency,
            Code : Code,
            Balance : Balance,
            Status : Status,
            Category : Category, // consultancy
            Description : Description,
            DateMapped : (new Date()).toLocaleString()
        }
        const internalAccount = await addInternalAccount(addInternalAccountDto);
        res.status(200).json(internalAccount)
    }catch(e : any){
        return e
    }
}

