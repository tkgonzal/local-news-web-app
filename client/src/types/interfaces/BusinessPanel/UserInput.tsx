// react-hook-form input interface for UserForm
interface UserInput {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    disableLogin: boolean
    articlePermissions: "READ_ONLY" | "WRITE" | "DELETE"
    userPermissions: "READ_ONLY" | "WRITE" | "DELETE"
    notes: string
}

export type { UserInput }