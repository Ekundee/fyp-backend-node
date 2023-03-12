import { Router } from "express";
import { addInternalAccountController, getAllInternalAccountController, getInternalAccountByIdController } from "../controller/account.controller";
import { adminProtectedRouteValidator } from "../service/utility.service";

const route = Router()

route.get("/internalAccounts", adminProtectedRouteValidator, getAllInternalAccountController)

route.get("/internalAccount", adminProtectedRouteValidator, getInternalAccountByIdController)

route.post("/internalAccount", adminProtectedRouteValidator, addInternalAccountController)

export default route