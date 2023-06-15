require("dotenv").config({})

import  express, { Application } from "express"
import cors from "cors"
import  { Server } from "socket.io"
import { createServer } from "http"
import jwt from "jsonwebtoken"
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
import { symptomDiagnosis } from "./service/ai.service";
import MessageModel from "./model/message.schema";

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

const server = createServer(app)
export const io = new Server(server, {
     cors : {
          origin : ["http://localhost:3000","http://10.0.2.2:3000"]
     }
})



server.listen(PORT, 
()=>{
     console.log("\n\n\n\n\Running on http://localhost:" + process.env.port + "/doc\n\n\n\n")
})


dbConnect()



io.on("connection", (socket)=>{
     socket.on("saveChat", async (data)=>{
          const authorization = data.AuthToken;
          const token : string = authorization.split(" ")[1]
          const secret : string = process.env.SECRET ? process.env.SECRET : "secret"
          const decodedToken : any = jwt.verify(token, secret)

          // console.log(data.Participant)
          console.log(decodedToken)
          var userMessage = new MessageModel({
               Participant : data.Participant,
               Sender : decodedToken.Id,
               Message : data.Message,
               Timestamp : new Date().toLocaleString()
          })
        
          const savedUserMessage = await userMessage!.save()
          socket.emit("showChat", savedUserMessage)
     })
})
