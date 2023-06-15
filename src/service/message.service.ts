import mongoose from "mongoose";
import { statusMessage } from "../enum/utility.enum";
import { getAllUserMessageDto, getMessageDto, getUserFriendDto, sendMessageDto } from "../inteface/message.interface";
import MessageModel from "../model/message.schema";
import UserModel from "../model/user.model";
import { Apiresponse, onlyUnique } from "./utility.service";

// Send message
export const sendMessage = async(sendMessageDto : sendMessageDto) =>{
    try{
        var userMessage = new MessageModel({
            Participant : sendMessageDto.ParticipantId,
            Sender : sendMessageDto.SenderId,
            Message : sendMessageDto.Message,
            Timestamp : new Date().toLocaleString()
        })
     
        const savedUserMessage = await userMessage!.save()

        const response = {
            UserMessage : savedUserMessage
        }
        return await Apiresponse(200, statusMessage.SUCCESSFUL, "Message sent", response)  
    }catch(e : any){
        return await Apiresponse(200, statusMessage.UNSUCCESSFUL, e.message, null) 
    }
}

// get message Note: there is pagination (later)
export const getMessageWithParticipant = async(getMessageDto : getMessageDto) =>{
    try{
     console.log(getMessageDto)
          const sentMessages = await MessageModel.find({ Sender : getMessageDto.Id, Participant : getMessageDto.Participant })
          const receivedMessages = await MessageModel.find({ Sender : getMessageDto.Participant , Participant : getMessageDto.Id})

          console.log(sentMessages)
          const userMessages = [...sentMessages,...receivedMessages]
          console.log(userMessages)
          const User = await UserModel.findById(getMessageDto.Id)
          
          const response = {
               UserId : User!._id ,
               UserMessage : userMessages
          }
          console.log(response)
          return await Apiresponse(200, statusMessage.SUCCESSFUL,"Message retrieved", response)  

    }catch(e : any){
        return await Apiresponse(200, statusMessage.UNSUCCESSFUL, e.message, null) 
    }
}


// get message Note: there is pagination (later)
export const getAllUserMessage = async(getAllUserMessageDto : getAllUserMessageDto) =>{
     try{
         const userMessages = await MessageModel.find({ Sender : getAllUserMessageDto.Id })
         const response = {
             UserMessage : userMessages
         }
         return await Apiresponse(200, statusMessage.SUCCESSFUL, "Messages retrieved", response)  
 
     }catch(e : any){
         return await Apiresponse(200, statusMessage.UNSUCCESSFUL, e.message, null) 
     }
 }


 
// get already contacted consultants
export const getUserFriend = async(getUserFriendDto : getUserFriendDto) =>{
     try{
          console.log(getUserFriendDto.Id)
          const sentMessages = await MessageModel.where("Sender",getUserFriendDto.Id)
          const receivedMessages = await MessageModel.where("Participant",getUserFriendDto.Id)
          const userMessages = [...sentMessages,...receivedMessages].filter(message=>{
               if(message.Sender != getUserFriendDto.Id) return message
          })
          console.log(userMessages)
          var friends : any = userMessages.map((userMessage) => (userMessage.Participant).toString())
          var uniqueFriend =  [...new Set(friends)];
          
          var UserConsultantFriendResponse = []
          for(let i = 0; i < uniqueFriend.length; i++){
               var friend = uniqueFriend[i]
               var id, name, lastTruncatedMessage :any = "", lastMessageTime  : any = 0, profilePic
               for(let j = 0; j < userMessages.length; j++){
                    if(friend == userMessages[j].Participant.toString()){
                         const messageTime = new Date(userMessages[j].Timestamp).getTime() 
                         if(messageTime > new Date(lastMessageTime).getTime()){
                              lastMessageTime = new Date(messageTime).toLocaleString()
                              lastTruncatedMessage = userMessages[j].Message
                         }
                    }
               }
               // console.log(friend.to)
               const user = await UserModel.findById(friend)
               const x = {
                    id : user?._id,
                    name : user?.Username,
                    lastMessageTime,
                    lastTruncatedMessage,
               }
               UserConsultantFriendResponse.push(x)
          }


          const response = {
               UserConsultantFriend : UserConsultantFriendResponse
          }
          return await Apiresponse(200, statusMessage.SUCCESSFUL, "Messages retrieved", response)  
 
     }catch(e : any){
         return await Apiresponse(200, statusMessage.UNSUCCESSFUL, e.message, null) 
     }
 }