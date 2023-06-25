import { Request, Response } from "express";
import { ISymptomDiagnoseDTO, IVisualSkinDiagnoseDTO } from "../inteface/ai.interface";
import { symptomDiagnosis, visualSkinDiagnosis } from "../service/ai.service";

export async function visualSkinDiagnosisController(req : Request, res : Response){
     try{
          /*
               #swagger.summary = "Visual diagnosis for skin"
               #swagger.tags = ["Diagnose"]
               #swagger.security = [{
                    "Api_Key" : [],
                    "Authorization" : [],
               }]
               
               #swagger.parameters['pic'] = {
                    in: 'formData',
                    type: 'file',
                    required: 'true',
                    description: 'skin disease diagnosis',
               } 
               
          */
          const visualSkinDiagnoseDTO : IVisualSkinDiagnoseDTO = {
               SkinPic : req.file
          }
          const response = await visualSkinDiagnosis(visualSkinDiagnoseDTO)
          res.json(response)

     }catch(e : any){
          return e.data.response ? e.data.response : e.message
     }
}



export async function symptomDiagnosisController(req : Request, res : Response){
     try{
          /*
               #swagger.summary = "Visual diagnosis for skin"
               #swagger.tags = ["Diagnose"]
               #swagger.security = [{
                    "Api_Key" : [],
                    "Authorization" : [],
               }]
               
               #swagger.parameters['body'] = {
                    in: 'body',
                    schema: {
                         SymptomArray:'[1,2,3,4]'
                    }
               } 
               
          */
          const symptomDiagnoseDTO : ISymptomDiagnoseDTO = {
               SymptomArray : req.body.SymptomArray
          }
          const response = await symptomDiagnosis(symptomDiagnoseDTO)
          res.json(response)

     }catch(e : any){
          return e.data.response ? e.data.response : e.message
     }
}
