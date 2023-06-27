import { ISymptomDiagnoseDTO, IVisualSkinDiagnoseDTO } from "../inteface/ai.interface";
import * as tf from "@tensorflow/tfjs-node"
import { Apiresponse, generateDiagnosisCode } from "./utility.service";
import { statusMessage } from "../enum/utility.enum";
import DiagnosisModel from "../model/diagnosis.model";


function findMinNMax(a : any){
     let arrMin = a[0]
     let arrMax = a[0]
     let arrMinIndex = 0
     let arrMaxIndex = 0
     for(let i = 0; i < a.length; i++){
          if(a[i] < arrMin){
               arrMin = a[i]
               arrMinIndex = i
          }
          if(a[i] > arrMax){
               arrMax = a[i]
               arrMaxIndex = i
          }
     }
     return { arrMin, arrMax, arrMinIndex, arrMaxIndex }
}

function MinMaxScalarJs (a : any) {
     const { arrMin, arrMax } = findMinNMax(a)
     var scaledArray = []
    
     for(let i = 0; i < a.length; i++){
          let scaledValue = (a[i] - arrMin) / (arrMax - arrMin)
          scaledArray[i] = scaledValue
     }
     return {scaledArray, arrMin, arrMax}
}

function MinMaxScalarInverseJs (a : any ,xmin : number ,xmax : number) {
     let Xmin = xmax
     let Xmax = xmax
     var originalArray = []

     for(let i = 0; i < a.length; i++){
          let originalValue = (a[i] * (Xmax - Xmin)) + Xmin
          originalArray[i] = originalValue
     }
     return originalArray
}



export const visualSkinDiagnosis = async (DTOData : IVisualSkinDiagnoseDTO ) => {
     try{
          const skinPic = DTOData.SkinPic
          // const b = Buffer.from(skinPic, "base64");
          var skinPicTensor = tf.node.decodeImage(skinPic!.buffer,3)
          var resizedSkinPicTensor = tf.image.resizeBilinear(skinPicTensor, [64,64], true) // this is a 3d tensor but we need a 4d tensor so we switch normal js array before 4d tensor
          const resizedSkinPicTensorToArray = resizedSkinPicTensor.dataSync();
          const resizedSkinPicTensorToJSArray = Array.from(resizedSkinPicTensorToArray);    
          
          // Load model
          const model = tf.loadLayersModel("file://./src/AI_Model/skinDiseaseModel/model.json")
          const skinDiseaseLabels : any = [
               'Acne and Rosacea Photos', 'Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions', 'Atopic Dermatitis Photos', 'Bullous Disease Photos',
               'Cellulitis Impetigo and other Bacterial Infections', 'Eczema Photos', 'Exanthems and Drug Eruptions', 'Hair Loss Photos Alopecia and other Hair Diseases', 
               'Herpes HPV and other STDs Photos', 'Light Diseases and Disorders of Pigmentation', 'Lupus and other Connective Tissue diseases', 'Melanoma Skin Cancer Nevi and Moles', 
               'Nail Fungus and other Nail Disease', 'Poison Ivy Photos and other Contact Dermatitis', 'Psoriasis pictures Lichen Planus and related diseases', 
               'Scabies Lyme Disease and other Infestations and Bites', 'Seborrheic Keratoses and other Benign Tumors', 'Systemic Disease', 'Tinea Ringworm Candidiasis and other Fungal Infections', 
               'Urticaria Hives', 'Vascular Tumors', 'Vasculitis Photos', 'Warts Molluscum and other Viral Infections'
          ]
          
          const modelConfig : any = (await model).getConfig();
          var inputShape = modelConfig["layers"][0]["config"]["batchInputShape"]
          inputShape[0] = 1
          const skinPic4Dtensor = tf.tensor4d(resizedSkinPicTensorToJSArray,  inputShape)
          
          // Predicting
          var predictProbabilityTensor = ((await model).predict(skinPic4Dtensor) as tf.Tensor)
          const predictProbabilityTensorToArray = predictProbabilityTensor.dataSync();
          const predictProbabilityTensorToJSArray = Array.from(predictProbabilityTensorToArray);
          const { arrMaxIndex } = findMinNMax(predictProbabilityTensorToJSArray)
          
          var resultsArray : any= []
          for(let k : any = 0; k < predictProbabilityTensorToJSArray.length; k++){
               const skinDisease = skinDiseaseLabels[k]
               resultsArray[k] = { 
                         Disease : skinDisease,
                         Probability : predictProbabilityTensorToJSArray[k] * 100
                    }
          }
          
          const confirmedDisease = skinDiseaseLabels[arrMaxIndex]
 
          // Find the indices of the three highest elements in the original array
          const originalIndices = predictProbabilityTensorToJSArray
          .map((_, index) => index)
          .sort((a, b) => predictProbabilityTensorToJSArray[b] - predictProbabilityTensorToJSArray[a])
          .slice(0, 3);

          console.log(originalIndices)
          const newDiagnosis = new DiagnosisModel({
               UserId : DTOData.UserId,
               ServiceType: "Visual Diagnosis",
               DiagnosisCode: "VDS" + await generateDiagnosisCode(),   
               Service: "Diagnosis",
               Condition : [skinDiseaseLabels[originalIndices[0]],skinDiseaseLabels[originalIndices[1]],skinDiseaseLabels[originalIndices[2]]],
               TimeStamp : new Date()
          })
   
          const savedDiagnosis = await newDiagnosis.save()
          const response = {
               Diagnosis : savedDiagnosis, 
          }
         return await Apiresponse(200,statusMessage.SUCCESSFUL, "Disease classified", response)  
         
 
     }catch(e : any){
          console.log(e.message)
         return await Apiresponse(200, statusMessage.UNSUCCESSFUL, e.message, null) 
     }
 }




 
export const symptomDiagnosis = async (DTOData : ISymptomDiagnoseDTO ) => {
     try{
          // const skinPic = DTOData.SkinPic
          // var skinPicTensor = tf.node.decodeImage(skinPic!.buffer,3)
          // var resizedSkinPicTensor = tf.image.resizeBilinear(skinPicTensor, [64,64], true) // this is a 3d tensor but we need a 4d tensor so we switch normal js array before 4d tensor
          // const resizedSkinPicTensorToArray = resizedSkinPicTensor.dataSync();
          // const resizedSkinPicTensorToJSArray = Array.from(resizedSkinPicTensorToArray);    
          
          // Load model
          const model = tf.loadLayersModel("file://./src/AI_Model/symptomDiagnosis1/model.json")
          // const skinDiseaseLabels : any = [
          //      'Acne and Rosacea Photos', 'Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions', 'Atopic Dermatitis Photos', 'Bullous Disease Photos',
          //      'Cellulitis Impetigo and other Bacterial Infections', 'Eczema Photos', 'Exanthems and Drug Eruptions', 'Hair Loss Photos Alopecia and other Hair Diseases', 
          //      'Herpes HPV and other STDs Photos', 'Light Diseases and Disorders of Pigmentation', 'Lupus and other Connective Tissue diseases', 'Melanoma Skin Cancer Nevi and Moles', 
          //      'Nail Fungus and other Nail Disease', 'Poison Ivy Photos and other Contact Dermatitis', 'Psoriasis pictures Lichen Planus and related diseases', 
          //      'Scabies Lyme Disease and other Infestations and Bites', 'Seborrheic Keratoses and other Benign Tumors', 'Systemic Disease', 'Tinea Ringworm Candidiasis and other Fungal Infections', 
          //      'Urticaria Hives', 'Vascular Tumors', 'Vasculitis Photos', 'Warts Molluscum and other Viral Infections'
          // ]
          
          // const modelConfig : any = (await model).getConfig();
          // var inputShape = modelConfig["layers"][0]["config"]["batchInputShape"]
          // inputShape[0] = 1
          
          const modelConfig : any = (await model).getConfig();
          var inputShape = modelConfig["layers"][0]["config"]["batchInputShape"]
          inputShape[0] = 1

          const testArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0]
          const testArrayTensor = tf.tensor3d(testArray,  inputShape)
          
          // Predicting
          var predictProbabilityTensor = ((await model).predict(testArrayTensor) as tf.Tensor)
          const predictProbabilityTensorToArray = predictProbabilityTensor.dataSync();
          const predictProbabilityTensorToJSArray = Array.from(predictProbabilityTensorToArray);
          console.log(MinMaxScalarInverseJs(predictProbabilityTensorToJSArray,100,500))
          console.log(predictProbabilityTensorToJSArray)
          // const { arrMaxIndex } = findMinNMax(predictProbabilityTensorToJSArray)
          
          // var resultsArray : any= []
          // for(let k : any = 0; k < predictProbabilityTensorToJSArray.length; k++){
          //      const skinDisease = skinDiseaseLabels[k]
          //      resultsArray[k] = { 
          //                Disease : skinDisease,
          //                Probability : predictProbabilityTensorToJSArray[k] * 100
          //           }
          // }
          
          // const confirmedDisease = skinDiseaseLabels[arrMaxIndex]
 
          const response = {
               ConfirmedDisease : "confirmedDisease", 
               OtherDisease : "resultsArray"
          }
         return await Apiresponse(200, statusMessage.SUCCESSFUL,"Predicted", response)  
         
 
     }catch(e : any){
          console.log(e.message)
         return await Apiresponse(200, statusMessage.UNSUCCESSFUL, e.message, null) 
     }
 }
