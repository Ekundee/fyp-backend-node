import mongoose from "mongoose"

export interface mockedDepositDto {
    Id: mongoose.Types.ObjectId,
    Amount: number,
    CardNumber: string,
    ExpiryMonth: string,
    ExpiryYear: string,
    Password: string,
    Cvv: string
}