require("dotenv").config({})

import  express, { Application } from "express"
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

// routes
import aiRoute from "./route/ai.route" 
import authorizationRoute from "./route/authorization.route" 
import profileRoute from "./route/profile.route" 
import accountRoute from "./route/account.route" 
import walletRoute from "./route/wallet.route" 
import rateRoute from "./route/rate.route" 
import messagingRoute from "./route/message.route"
import { adminProtectedRouteChecker, apiKeyProtector, dbConnect } from "./service/utility.service";

const app : Application = express()
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.use(express.json())
app.use(express.urlencoded({extended : false}))

// app.use(apiKeyProtector)
app.use(adminProtectedRouteChecker)
app.use(aiRoute)
app.use(authorizationRoute)
app.use(profileRoute)
app.use(accountRoute)
app.use(walletRoute)
app.use(rateRoute)
app.use(messagingRoute)

app.listen(process.env.PORT, ()=>{
    console.log("\n\n\n\n\Running on http://localhost:" + process.env.port + "/doc\n\n\n\n")
})
dbConnect()
