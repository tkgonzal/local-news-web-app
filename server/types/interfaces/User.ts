import { ObjectId } from "mongodb";

import { Name } from "./Name";
import Permission from "../enums/Permission";
import { UserAccountType } from "../types/UserAccountType";

interface User {
    _id?: string | null | ObjectId;
    name?: Name;
    password: string;
    email: string;
    phone?: string;
    accType: UserAccountType;
    // For non-Business User accounts, indicates the _id of 
    // a Business User account they're associated with
    businessId?: string;
    businessName?: string;
    businessWebsite?: string;
    articlePermissions?: Permission;
    userPermissions?: Permission;
    hasDisabledLogin?: boolean;
    // For Business Accounts, Indicates whether or not the account should receive
    // an email about new comment notifcation
    receivesCommentNotifications?: boolean;
    notes?: string;
};

export type { User };