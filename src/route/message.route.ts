import { Router } from "express";
import { getAllUserMessageController, getMessageController, sendMessageController } from "../controller/message.controller";
import { protectedRoute } from "../service/utility.service";

var route : Router = Router()

route.post("/message", protectedRoute, sendMessageController)

route.get("/message", protectedRoute, getMessageController)

route.get("/all_user/message", protectedRoute, getAllUserMessageController)

export default route