import { statusMessage } from "../enum/utility.enum"
import { getUserDiagnosisDto, saveDiagnosisDto } from "../inteface/diagnosis.interface"
import DiagnosisModel from "../model/diagnosis.model"
import { Apiresponse, generateDiagnosisCode } from "./utility.service"

export const saveDiagnosis = async(saveDiagnosisDto : saveDiagnosisDto) =>{
    try{
        const newDiagnosis = new DiagnosisModel({
            UserId : saveDiagnosisDto.UserId,
            ServiceType: "Symptom Diagnosis",
            DiagnosisCode: "FSD" + await generateDiagnosisCode(),   
            Service: "Diagnosis",
            Condition : saveDiagnosisDto.Condition,
            TimeStamp : new Date()
        })

        const savedDiagnosis = await newDiagnosis.save()
        const response = {
            Diagnosis : savedDiagnosis,
        }
        return await Apiresponse(200, statusMessage.SUCCESSFUL,"Diagnosis stored", response)  

    }catch(e : any){
        return await Apiresponse(200, statusMessage.UNSUCCESSFUL, e.message, null) 
    }
}

export const getUserDiagnosis = async(getUserDiagnosisDto : getUserDiagnosisDto) =>{
    try{
        const userDiagnosis = await DiagnosisModel.find({ UserId : getUserDiagnosisDto.UserId }).sort({ TimeStamp : -1 })
        const response = {
            Diagnosis : userDiagnosis,
        }
        return await Apiresponse(200, statusMessage.SUCCESSFUL,"Diagnosis retrieved", response)  

    }catch(e : any){
        return await Apiresponse(200, statusMessage.UNSUCCESSFUL, e.message, null) 
    }
}
