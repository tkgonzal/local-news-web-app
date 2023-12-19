import { User } from "./User.js";

interface UsersResponse {
    message: string;
    users?: User[]
}

export type { UsersResponse };