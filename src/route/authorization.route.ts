import { Router } from "express";
import { signUpController } from "../controller/authorization.controller";

const route = Router()

route.get("/f", signUpController)

export default route