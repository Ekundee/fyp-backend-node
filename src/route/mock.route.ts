import { Router } from "express"
import { mockedDepositController } from "../controller/mock.controller"
import { protectedRoute } from "../service/utility.service"

var route = Router()

route.post("/mockDeposit", protectedRoute, mockedDepositController)

export default route