// Interface currently only accounds for members needed for BusinessPanel
import { Name } from "./Name"
import Permission from "../enums/Permission"

interface User {
    id: string
    name?: Name
    email: string
    phone?: string
    articlePermissions?: Permission
    userPermissions?: Permission
}

export type { User }