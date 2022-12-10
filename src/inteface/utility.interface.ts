export interface IApiResponse{
    Message : string,
    Data : any
}


export interface IMessageConfig {
    subject : string,
    html : string,
    attachments? : any[]
}
