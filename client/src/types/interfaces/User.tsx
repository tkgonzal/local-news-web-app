// Interface currently only accounds for members needed for BusinessPanel
import { Name } from "./Name"
import { UserAccountType } from "../types/UserAccountType"
import Permission from "../enums/Permission"

interface User {
    _id: string | null
    name?: Name
    email: string
    phone?: string
    accType: UserAccountType
    // For non-Business User accounts, indicates the _id of 
    // a Business User account they're associated with
    businessId?: string
    businessName?: string
    businessWebsite?: string
    articlePermissions?: Permission
    userPermissions?: Permission
    hasDisabledLogin?: boolean
    // For Business Accounts, Indicates whether or not the account should receive
    // an email about new comment notifcation
    receivesCommentNotifications?: boolean
    notes?: string
}

export type { User }