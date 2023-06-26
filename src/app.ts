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
import sessionRoute from "./route/session.route"
import mockRoute from "./route/mock.route"
import { adminProtectedRouteChecker, apiKeyProtector, dbConnect, sessionChecker } from "./service/utility.service";
import { KNNsymptom, symptomDiagnosis } from "./service/ai.service";
import MessageModel from "./model/message.model";
import { getUserFriend } from "./service/message.service"
import mongoose from "mongoose"
import { getUserFriendDto } from "./inteface/message.interface"
import ChatroomModel from "./model/chatroom.model"
import { getChatRoomByParticipants, getChatRoomParticipants } from "./service/authorization.service"
import { ISessionCheckerDto } from "./inteface/utility.interface"

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
app.use(sessionRoute)
app.use(mockRoute)



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
          // AuthToken: Requester.defaults.headers.common['Authorization'],
          //           ChatRoom : id,
          //           Text : values.message 
          //      })

          var participant : any = await ChatroomModel.findById(data.ChatRoom)

          // const model : ISessionCheckerDto = {
          //      ConsultantId : ,
          //      UserId : decodedToken.Id
          // }
          
          // const session = await sessionChecker(model)
          // if(sessionChecker)
          console.log(participant)
          var newMessageObject = new MessageModel({
               Sender : decodedToken.Id,
               Receiver : participant[0] == decodedToken.Id ? participant[1] : participant[0],
               Text : data.Text,
               ChatRoom: data.ChatRoom,
               Timestamp : new Date()
          })

          var savedUserMessage = await newMessageObject.save()
          socket.emit("showChat", savedUserMessage)
     })
})

// getChatRoomParticipants({ChatRoom : "6493a1d07e167e1e575fdfca"})
// var getMessage = await
// var userMessage = new MessageModel({
//      ChatRoom : "6493a1d07e167e1e575fdfca",
//      Text : "Are you mad",
//      Sender : "6493606ef3f25058c6ec7c14",
//      Receiver : "649362f2f3ef872c2dd436c6",
//      Timestamp : new Date()
// })
// userMessage.save()

// var newCR = new ChatroomModel({
//      Participant: ["649362f2f3ef872c2dd436c6", "6493606ef3f25058c6ec7c14"]
// })
// newCR.save()

// getUserFriend({Id : '6493606ef3f25058c6ec7c14'}).then(resp=>{
//      console.log(resp.Data)
// })
KNNsymptom()