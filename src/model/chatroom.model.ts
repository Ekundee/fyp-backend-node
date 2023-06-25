import mongoose, { Schema } from "mongoose";

export interface IChatroomSchema extends mongoose.Document{
    Participant : mongoose.Types.ObjectId[],
}

const ChatroomSchema = new Schema<IChatroomSchema>({
    Participant : {
        type : [mongoose.Types.ObjectId],
        ref: 'user'
    }
})

const ChatroomModel = mongoose.model("chatroom", ChatroomSchema)
export default ChatroomModel