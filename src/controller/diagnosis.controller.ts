import { Request, Response } from "express";
import { getUserDiagnosisDto, saveDiagnosisDto } from "../inteface/diagnosis.interface";
import { getUserDiagnosis, saveDiagnosis } from "../service/diagnostic.service";

export const saveDiagnosisController = async (req : Request, res : Response)=> {
    /*
         #swagger.tags=["Diagnosis"]
         #swagger.summary="Save diagnosis"
         #swagger.security=[{
              "Api_Key" : [],
              "Authorization" : [],
         }]

         #swagger.parameters['body'] = {
              in : 'body',
              schema : {
                condition : ["hi", "hi", "hi"]
              }
         }
    */
    try{
        const { Id } = res.locals.decodedToken
        const { Condition } : any = req.body

        const userData : saveDiagnosisDto = { 
            UserId : Id,
            Condition : Condition
        }
        const response = await saveDiagnosis(userData);
        res.status(200).json(response)
    }catch(e : any){
        return e.message
    }
}


export const getUserDiagnosisController = async (req : Request, res : Response)=> {
    /*
         #swagger.tags=["Diagnosis"]
         #swagger.summary="Get user Diagnosis"
         #swagger.security=[{
              "Api_Key" : [],
              "Authorization" : [],
         }]

       
    */
    try{
        const { Id } = res.locals.decodedToken

        const userData : getUserDiagnosisDto = { 
            UserId : Id,
        }
        const response = await getUserDiagnosis(userData);
        res.status(200).json(response)
    }catch(e : any){
        return e.message
    }
}