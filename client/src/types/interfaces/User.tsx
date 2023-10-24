// Interface currently only accounds for members needed for BusinessPanel
import { Name } from "./Name"
import { UserAccountType } from "../types/UserAccountType"
import Permission from "../enums/Permission"

interface User {
    id: string | null
    name?: Name
    email: string
    phone?: string
    accType: UserAccountType
    businessName?: string
    businessWebsite?: string
    articlePermissions?: Permission
    userPermissions?: Permission
}

export type { User }