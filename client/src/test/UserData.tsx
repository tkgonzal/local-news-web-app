import { User } from "../types/interfaces/User"
import Permission from "../types/enums/Permission"

const UserData: User[] = [
    {
        _id: "1",
        name: {
            first: "Jane",
            last: "Remover"
        },
        email: "frailty@swag.net",
        phone: "(555)555-555",
        businessId: "1",
        password: "",
        articlePermissions: Permission.READ_ONLY,
        userPermissions: Permission.READ_ONLY,
        accType: "User",
    },
    {
        _id: "2",
        name: {
            first: "Jeff",
            last: "Rosenstock"
        },
        email: "jeff@quoteunquote.net",
        phone: "(666)666-6666",
        businessId: "1",
        password: "",
        articlePermissions: Permission.WRITE,
        userPermissions: Permission.WRITE,
        accType: "User",
    },
    {
        _id: "3",
        name: {
            first: "Solange",
            last: "Knowles"
        },
        email: "seat@table.org",
        phone: "(777)777-7777",
        articlePermissions: Permission.DELETE,
        businessId: "1",
        password: "",
        userPermissions: Permission.DELETE,
        accType: "User",
    }
]

export default UserData