import { Request, Response } from "express";
import { postingType } from "../enum/account.enum";
import { statusMessage } from "../enum/utility.enum";
import { signUp } from "../service/authorization.service";
import { Apiresonse } from "../service/utility.service";

export const signUpController = async (req : Request, res : Response)=> {
    try{
        const signup = await signUp();
        var response = await Apiresonse(statusMessage.SUCCESSFUL, signUp)
        res.status(200).json(response)
    }catch(e : any){
        return e
    }
}