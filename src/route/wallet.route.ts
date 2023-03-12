import { Router } from "express";
import { cardFundingController, transferFundsController } from "../controller/wallet.controller";
import { protectedRoute } from "../service/utility.service";

const route = Router()

route.get("/transfer/funds", protectedRoute, transferFundsController)

route.post("/fund_with_card", protectedRoute, cardFundingController)

export default route




