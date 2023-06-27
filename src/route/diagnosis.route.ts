import { getUserDiagnosisController, saveDiagnosisController } from "../controller/diagnosis.controller";
import { Router } from "express";
import { protectedRoute } from "../service/utility.service";

const route = Router()

route.post("/saveDiagnosis", protectedRoute, saveDiagnosisController)

route.get("/getUserDiagnosis", protectedRoute, getUserDiagnosisController)


export default route