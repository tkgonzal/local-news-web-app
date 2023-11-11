// Interface currently only accounds for members needed for BusinessPanel
import { User as backendUser } from "../../../../server/models/User" 

interface User extends Omit<backendUser, "_id" | "businessId"> {
    _id: string,
    businessId: string
}

export type { User }