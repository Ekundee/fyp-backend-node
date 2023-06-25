import { Router } from "express";
import { protectedRoute } from "../service/utility.service";
import { CreateSessionController, getConsultantSessionController, getUserSessionController } from "../controller/session.controller";

var route = Router()

route.post("/createSession", protectedRoute, CreateSessionController)

route.get("/getUserSession", protectedRoute, getUserSessionController)

route.get("/getConsultantSession", protectedRoute, getConsultantSessionController)

export default route