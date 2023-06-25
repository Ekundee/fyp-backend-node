import { IMessageConfig } from "./inteface/utility.interface";
import fs from "fs"
import path from "path"

export const registrationMail = (data : any)=> {
     const token = (data.otp).toString()
     const filePath = path.join(__dirname, 'public/', 'onboarding2.png');
     console.log(filePath)
     const imageContent = fs.readFileSync(filePath);

     // Create an attachment object
     const attachment = {
          filename: 'wellighten_full_logo.svg',
          content: imageContent,
          cid: 'unique@nodemailer.com' // Use a unique CID here
     }
     const mail : IMessageConfig = {
          subject : "Registration mail",
          attachments: [attachment],
          html : `<!DOCTYPE html>
          <html>
          <head>
              <title>Gmail OTP Token</title>
              <style>
                  body {
                      background-color: #f2f2f2;
                      font-family: Arial, sans-serif;
                  }
          
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      padding: 40px;
                      box-sizing: border-box;
                      border-radius: 5px;
                      border: 2px solid blue;
                      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.488);
                  }
                  .CompanyName{
                      font-size: 15px;
                      color: white;
                      background-color: blue;
                      font-weight: 500;
                      font-family: Lucida Handwriting;
                      padding: 10px;
                      width: max-content;
                      border-radius: 10px;
                      right: -20px;
                      top: -15px;
                      position: relative;
                  }
          
                  h2 {
                      text-align: center;
                      color: #0066cc;
                  }
          
                  p {
                      text-align: center;
                      font-size: 18px;
                      margin-bottom: 0;
                      color: #333333;
                  }
          
                  .otp-token {
                      font-size: 30px;
                      color: #0066cc;
                      padding: 5px; 
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div
                      style="width: 100%; display: flex; justify-content: flex-end; "
                  >
                      <div class="CompanyName">
                          WELLIGHTEN
                      </div>
                  </div>    
                  <h2>Gmail OTP Token</h2>
                  <p>Your OTP token is: <br/><br/>
                    <span class="otp-token">${token[0]}</span>
                    <span class="otp-token">${token[1]}</span>
                    <span class="otp-token">${token[2]}</span>
                    <span class="otp-token">${token[3]}</span>
                    <span class="otp-token">${token[4]}</span>
                    <span class="otp-token">${token[5]}</span>
                  </p>
                
              </div>
          </body>
          </html>`
     }
    return mail 
}

