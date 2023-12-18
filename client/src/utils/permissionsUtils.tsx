// Util functions for permissions checking
import { User } from "../types/interfaces/User"
import Permission from "../types/enums/Permission"

/**
 * @param user A user, generally meant to be the user stored by the userContext
 * @returns {boolean} Whether or not the user has User editing permissions for the
 * Business Panel
 */
const hasUserEditPermissions = (user: User) => {
    return (user.userPermissions as Permission) >= Permission.WRITE
}

/**
 * @param user A user, generally meant to be the user stored by the userContext
 * @returns {boolean} Whether or not the user has Article editing permissions for 
 * the Business Panel
 */
const hasArticleEditPermissions = (user: User) => {
    return (user.articlePermissions as Permission) >= Permission.WRITE
}

/**
 * @param user A user, generally meant to be the user stored by the userContext
 * @returns {boolean} Whether or not the user has User deleting permissions for 
 * the Business Panel
 */
const hasUserDeletePermissions = (user: User) => {
    return (user.userPermissions as Permission) === Permission.DELETE
}

/**
 * @param user A user, generally meant to be the user stored by the userContext
 * @returns {boolean} Whether or not the user has User deleting permissions for 
 * the Business Panel
 */
const hasArticleDeletePermissions = (user: User) => {
    return (user.articlePermissions as Permission) === Permission.DELETE
}

/**
 * @param user {User} A user, generally meant to be the user logged in and 
 * stored by the userContext
 * @returns {boolean | null} Whether or not the current user as business admin
 * permissions to edit a business account
 */
const hasBusinessAdminPermissions = (user: User | null): boolean | null => {
    return user && user.businessId === user._id
}

export {
    hasUserEditPermissions,
    hasUserDeletePermissions,
    hasArticleEditPermissions,
    hasArticleDeletePermissions,
    hasBusinessAdminPermissions
}