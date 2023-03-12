import mongoose, { Schema } from "mongoose";

export interface IMessageSchema extends mongoose.Document{
    Participant : mongoose.Types.ObjectId,
    Sender : mongoose.Types.ObjectId,
    Message : string,
    Timestamp : string
}

const MessageSchema = new Schema<IMessageSchema>({
    Participant : {
        type : Schema.Types.ObjectId
    },
    Sender : {
        type : Schema.Types.ObjectId
    },
    Message : {
        type : String
    },
    Timestamp : {
        type : String
    }
})

const MessageModel = mongoose.model("message", MessageSchema)
export default MessageModel