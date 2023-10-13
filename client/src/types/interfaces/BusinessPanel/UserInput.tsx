// react-hook-form input interface for UserForm
import Permission from "../../enums/Permission"

interface UserInput {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    disableLogin: boolean
    articlePermissions: Permission
    userPermissions: Permission
    notes: string
}

export type { UserInput }