import { User } from "../types/interfaces/User"
import Permission from "../types/enums/Permission"

const UserData: User[] = [
    {
        id: "1",
        name: {
            first: "Jane",
            last: "Remover"
        },
        email: "frailty@swag.net",
        articlePermissions: Permission.READ_ONLY,
        userPermissions: Permission.READ_ONLY
    },
    {
        id: "2",
        name: {
            first: "Jeff",
            last: "Rosenstock"
        },
        email: "jeff@quoteunquote.net",
        articlePermissions: Permission.WRITE,
        userPermissions: Permission.WRITE
    },
    {
        id: "3",
        name: {
            first: "Solange",
            last: "Knowles"
        },
        email: "seat@table.org",
        articlePermissions: Permission.DELETE,
        userPermissions: Permission.DELETE
    }
]

export default UserData