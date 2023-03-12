import fs from "fs"
import path from "path"
const swaggerAutogen = require('swagger-autogen')()
import dotenv from "dotenv"
dotenv.config()


const port : string | number = process.env.PORT || 4055
interface docsInfo {
    info : Record<string,any>,
    securityDefinitions : Record<string,any>,
    host : string,
    schemes : string[] ,
    consumes : string[], 
    produces : string[]  
}

const doc : docsInfo={
    info :{
        title : "FYP",
        description : "My APIs"
    },
    securityDefinitions : {
        Api_Key : {
            type  : "apiKey",
            in : "header",
            name : "apiKey",
            desription : "Put in the api key"
        },
        Authorization : {
            type  : "apiKey",
            in : "header",
            name : "authorization",
            desription : "Put in your bearer token"
        }
    }
    ,
    host :  `${process.env.BASE_URL || `localhost:${process.env.PORT}`}`,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
}



const docsOutputFile : string = "./src/swagger_output.json"
const route : string = "./src/route"
var endpointFiles : string[] = []

try{

    const getFilesRecursively = (directory : string) => {
      const filesInDirectory = fs.readdirSync(directory);
      for (const file of filesInDirectory) {
        const absolute = path.join(directory, file);
        if (fs.statSync(absolute).isDirectory()) {
            getFilesRecursively(absolute);
        } else {
            endpointFiles.push("./"+absolute);
        }
      }
    };
    
    getFilesRecursively(route)
    
    endpointFiles = endpointFiles.map((file)=>{
        return file.split("\\").join("/")
    })
    swaggerAutogen(docsOutputFile, endpointFiles, doc).then(() : void => {
        require('./src/app.ts')
    })
}catch(error){
    console.log(error)
}