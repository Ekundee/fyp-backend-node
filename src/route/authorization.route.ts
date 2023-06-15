import { Router } from "express";
import { activateUserController, changeEmailController, changePasswordController, changePhoneNumberController, deActivateUserController, generateOtpController, getRefreshTokenController, signInController, signUpController, validateEmailController } from "../controller/authorization.controller";
import { changePhoneNumber } from "../service/authorization.service";
import { adminProtectedRouteValidator, protectedRoute } from "../service/utility.service";

const route = Router()

route.get("/get/refreshToken", protectedRoute, getRefreshTokenController)

route.post("/generate/otp", protectedRoute, generateOtpController)

route.post("/signup", signUpController)

route.post("/signin", signInController)

route.post("/change/password", protectedRoute, changePasswordController)

route.post("/change/email", protectedRoute, changeEmailController)

route.post("/change/phoneNo", protectedRoute, changePhoneNumberController)

route.post("/validate/email", protectedRoute, validateEmailController)

route.post("/validate/phone", protectedRoute, changePasswordController)

route.post("/activate/user", adminProtectedRouteValidator, protectedRoute, activateUserController)

route.post("/deactivate/user", adminProtectedRouteValidator, protectedRoute, deActivateUserController)



export default route