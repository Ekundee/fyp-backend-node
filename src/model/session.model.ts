import mongoose, { model, Mongoose, Schema, Types } from "mongoose";
import { userRole, userStatus } from "../enum/utility.enum";
import { consultantSpecializationConfig, states } from "../status";

export interface ISessionSchema  extends mongoose.Document{
    Reference : string,
    UserId : mongoose.Types.ObjectId,
    TimeOfSessionStart : Date,
    TimeOfSessionEnd : Date,
    ConsultantId : mongoose.Types.ObjectId,
}

const SessionSchema = new Schema<ISessionSchema>({
    Reference : {
        type : String
    },
    UserId : {
        type : Schema.Types.ObjectId
    },
    TimeOfSessionStart : {
        type : Date
    },
    TimeOfSessionEnd : {
        type : Date
    },
    ConsultantId : {
        type : Schema.Types.ObjectId
    }
}, { timestamps : true })

const SessionModel = model("session", SessionSchema)

export default SessionModel;