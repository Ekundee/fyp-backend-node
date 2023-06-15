import { Router } from "express";
import { getAllUserMessageController, getMessageController, getMessageWithParticipantController, getUserFriendController, sendMessageController } from "../controller/message.controller";
import { protectedRoute } from "../service/utility.service";

var route : Router = Router()

route.post("/message", protectedRoute, sendMessageController)

route.get("/getMessageWithParticipant", protectedRoute, getMessageWithParticipantController)

route.get("/all_user/message", protectedRoute, getAllUserMessageController)

route.get("/all_user/friends", protectedRoute, getUserFriendController)
export default route