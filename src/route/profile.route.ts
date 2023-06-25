import { Router } from "express";
import { getAllConsultantsController, getProfileByIdController, getProfileByTokenController, updateProfileController } from "../controller/profile.controller";
import { adminProtectedRouteValidator, protectedRoute } from "../service/utility.service";

const route = Router()

route.get("/getProfilebyId", protectedRoute, getProfileByIdController)

route.get("/getProfile", protectedRoute, getProfileByTokenController)

route.post("/update/profile", protectedRoute, updateProfileController)

route.get("/getAllConsultants",getAllConsultantsController)

export default route