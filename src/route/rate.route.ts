import { Router } from "express";
import { getAllUserStarRatingController, getTodayRatingController, getUserRatingController, getUserStarRatingController, getUserTodayRatingController, rateUserController } from "../controller/rate.controller";
import { protectedRoute } from "../service/utility.service";

const route = Router()

route.post("/rate/user", protectedRoute, rateUserController)

route.get("/users/today/rating", getTodayRatingController)

route.get("/user/rating", getUserRatingController)

route.get("/user/today/rating", getUserTodayRatingController)

route.get("/user/star/rating", getUserStarRatingController)

route.get("/users/star/rating", getAllUserStarRatingController)




export default route