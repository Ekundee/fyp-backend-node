import mongoose from "mongoose";

export interface saveDiagnosisDto{
    UserId : mongoose.Types.ObjectId,
    Condition : string[],
}

export interface getUserDiagnosisDto{
    UserId : mongoose.Types.ObjectId,
}