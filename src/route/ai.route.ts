import multer from "multer";
import { Router } from "express";
import { symptomDiagnosisController, visualSkinDiagnosisController } from "../controller/ai.controller";

const route : Router = Router()


const upload = multer()

route.post("/diagnoseSkinPic", upload.single("pic"),visualSkinDiagnosisController)

route.post("/diagnoseSymptom", symptomDiagnosisController)

export default route