import mongoose, { Schema } from "mongoose";

export interface IMessageSchema extends mongoose.Document{
    ChatRoom : mongoose.Types.ObjectId,
    Text : string,
    Sender : mongoose.Types.ObjectId,
    Receiver : mongoose.Types.ObjectId,
    Timestamp : Date
}

const MessageSchema = new Schema<IMessageSchema>({
     ChatRoom : {
          type : Schema.Types.ObjectId
     },
     Text : {
          type: String,
     },
     Sender : {
          type : Schema.Types.ObjectId
     },
     Receiver : {
          type : Schema.Types.ObjectId
     },
     Timestamp : {
          type : Date
     }
})

const MessageModel = mongoose.model("message", MessageSchema)
export default MessageModel