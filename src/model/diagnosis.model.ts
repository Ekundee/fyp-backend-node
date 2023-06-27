import mongoose, { Schema } from "mongoose";

export interface IDiagnosisSchema extends mongoose.Document{
    UserId: mongoose.Types.ObjectId,
    ServiceType: string,
    DiagnosisCode: string,
    Service : string,
    Charges : string,
    Condition: string[],
    TimeStamp: Date,
}

const DiagnosisSchema = new Schema<IDiagnosisSchema>({
    UserId : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    ServiceType : {
        type : String
    },
    DiagnosisCode : {
        type : String,
    },
    Service : {
        type : String
    },
    Charges : {
        type : String,
        default : "₦0.00",
    },      
    Condition : {
        type : [String],
    },
    TimeStamp : {
        type : Date
    }
})

const DiagnosisModel = mongoose.model("diagnosis", DiagnosisSchema)
export default DiagnosisModel