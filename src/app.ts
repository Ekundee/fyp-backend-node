require("dotenv").config({})

import  express, { Application } from "express"
import authorizationRoute from "./route/authorization.route" 

const app : Application = express()

// Authorization
app.use(authorizationRoute)


app.listen(process.env.PORT)