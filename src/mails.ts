import { IMessageConfig } from "./inteface/utility.interface";

export const registrationMail = (data : any)=> {
    const mail : IMessageConfig = {
        subject : "Registration mail",
        html : `This is your otp ${data.otp}`
    }
    return mail 
}