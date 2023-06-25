import { Request, Response } from "express"
import { mockedDepositDto } from "../inteface/mock.interface"
import { mockedDeposit } from "../service/mock.service"

// rate user
export const mockedDepositController = async(req : Request, res : Response) =>{
    /**
     
        #swagger.summary = "A mock deposit server"
        #swagger.tags = ["Mock"]
        #swagger.parameters['body'] = {
            in : 'body',
            schema :  { 
                Amount : 300, 
                CardNumber : "1234-1231-1231-1333", 
                ExpiryMonth : "04", 
                ExpiryYear : "89", 
                Password : "Password",
                Cvv : "456" 
                }
        }

        #swagger.security = [{
            "Api_Key" : [],
            "Authorization" : [],
        }]
    */
    try{
        const { Id } = res.locals.decodedToken
        const { Amount, CardNumber, ExpiryMonth, ExpiryYear, Password, Cvv } = req.body
        const mockedDepositDto : mockedDepositDto = {
            Id: Id,
            Amount: Amount,
            CardNumber: CardNumber,
            ExpiryMonth: ExpiryMonth,
            ExpiryYear: ExpiryYear,
            Password: Password,
            Cvv: Cvv
        }
        const response = await mockedDeposit(mockedDepositDto)
        return res.status(200).json(response)
    }catch(e : any){
        return  res.status(200).json(e.message)
    }
}