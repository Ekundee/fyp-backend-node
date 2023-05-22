export enum statusMessage {
    SUCCESSFUL = "SUCCESSFUL",
    UNSUCCESSFUL = "UNSUCCESSFUL",
    NULL_VALUES = "Fill in all the details",
    INEXISTENT = "Does not exist",
    INCORRECT_DATA = "Incorrect information",
    EXISTS = "Data already exist",
    UNAUTHORIZED = "User is not allowed to visit this route"
} 

export enum userRole {
    USER = "User",
    CONSULTANT = "Consultant",
    ADMIN = "Admin",
}

export enum serviceCodes {
    CONSULTANCY = "Consultancy",
    DIAGNOSTICS = "Diagnostics"
}

export enum userStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
}