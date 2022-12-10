import { IMessageConfig } from "./inteface/utility.interface";

export const registrationMail = (data : any)=> {
    try{
        const mail : IMessageConfig = {
            subject : "Registration mail",
            html : `This is your otp ${data.otp}`
        }
        return mail 
    }catch(e : any){
        return e.data.response ? e.data.response : e.message
    }
}