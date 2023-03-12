import { Request, Response } from "express";
import { IVisualSkinDiagnoseDTO } from "../inteface/ai.interface";
import { visualSkinDiagnosis } from "../service/ai.service";

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
          console.log("hi")
          return e.data.response ? e.data.response : e.message
     }
}
