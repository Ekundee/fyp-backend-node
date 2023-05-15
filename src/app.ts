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
import cors from "cors"

const app : Application = express()
app.use(cors({
     // origin : "*"
     origin : ["http://localhost:3000","http://10.0.2.2:3000"],
     credentials: true
}))


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


app.get("/h",(req,res)=>{
     console.log("hi")
     res.json({j : "t"})
})

const PORT = parseInt(process.env.PORT as string) || 3030

app.listen(PORT, 
     ()=>{
    console.log("\n\n\n\n\Running on http://localhost:" + process.env.port + "/doc\n\n\n\n")
})
dbConnect()
