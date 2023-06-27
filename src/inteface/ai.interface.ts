import mongoose from "mongoose"

export interface IVisualSkinDiagnoseDTO{
     UserId : mongoose.Types.ObjectId,
     SkinPic : Express.Multer.File | undefined
}

export interface ISymptomDiagnoseDTO{
     SymptomArray : Number[]
}