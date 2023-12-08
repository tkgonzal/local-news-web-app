import { NavigateFunction, useNavigate } from "react-router-dom"

import { useUserContext } from "../../contexts/UserContext"

import { User } from "../../types/interfaces/User"
import { Article } from "../../types/interfaces/Article"
import Permission from "../../types/enums/Permission"

import axios from "axios"
import Cookies from "js-cookie"

import {
    hasUserEditPermissions,
    hasUserDeletePermissions,
    hasArticleEditPermissions,
    hasArticleDeletePermissions,
    hasBusinessAdminPermissions
} from "../../utils/permissionsUtils"

import ReadIcon from "/assets/BusinessPanel/book.svg"
import EditIcon from "/assets/BusinessPanel/pen-to-square.svg"
import TrashIcon from "/assets/BusinessPanel/trash.svg"

import "./PanelTable.css"

// Types
type TableType = "User" | "Article"

interface Props {
    tableType: TableType
    tableContents: User[] | Article[]
    // state setter from usePanelTableState hook, used for re-retrieving
    // data from db after deleting
    setShouldRefresh?: React.Dispatch<React.SetStateAction<boolean>>
}

// Constants
const BASE_SERVER_URL = import.meta.env.VITE_SERVER_URL

// Table Utils
/**
 * Type guard for User
 * @param tableRow A row to generate for the table.
 * @returns Whether or not tableRow is User
 */
const isUser = (tableRow: User | Article): tableRow is User => {
    return (tableRow as User).email !== undefined
}

/**
 * Type guard for Article
 * @param tableRow A row to generate for the table.
 * @returns Whether or not tableRow is Article
 */
const isArticle = (tableRow: User | Article): tableRow is Article => {
    return (tableRow as Article).heading !== undefined
}

/**
 * @param user 
 * @returns The user's full name as a string
 */
const getUserFullname = (user: User): string => {
    return `${user.name?.first} ${user.name?.last}`
}

/**
 * @param tableRow A row to generate for the table
 * @param user A user, generally meant to be the user logged in and stored by the 
 * userContext
 * @returns {boolean} Whether or not the user has the permissions to edit a table
 * entry
 */
const checkForEditPermissions = 
    (tableType: TableType, user: User | null): boolean | null => {
        return user && ((tableType === "User" && hasUserEditPermissions(user))
        || (tableType === "Article" && hasArticleEditPermissions(user)))
}

/**
 * @param tableRow A row to generate for the table
 * @param user A user, generally meant to be the user logged in and stored by the 
 * userContext
 * @returns {boolean} Whether or not the user has the permissions to delete a table
 * entry
 */
const checkForDeletePermissions = 
    (tableType: TableType, user: User | null): boolean | null => {
        return user && ((tableType === "User" && hasUserDeletePermissions(user))
        || (tableType === "Article" && hasArticleDeletePermissions(user)))
}

/**
 * @param userRowData {User} The data for a User to be rendered on a row in
 * the table. Only set to User | Article for typescript compilation
 * @returns {boolean} Whether or not the account is for a business account
 */
const isBusinessAccount = (userRowData: User | Article): boolean => {
    // If the user is pulled for table but has a blank business id, then their
    // business id is their own id and they are a business account
    return (userRowData as User).businessId === ""
}

// Table to display either users or articles for a Business as well as their
// actions the business can take on each one
const PanelTable: React.FC<Props> = ({ 
    tableType, 
    tableContents, 
    setShouldRefresh 
}) => {
    const { user } = useUserContext()
    const tableNavigate: NavigateFunction = useNavigate()

    const articleHeaderNames: string[] = [
        "ID", 
        "Title", 
        "Engagements", 
        "Actions"
    ]
    const userHeaderNames: string[] = [
        "Name", 
        "Mobile Phone No", 
        "Email", 
        "Actions"
    ]

    // Event Handlers
    /**
     * @param id Opens the form for the corressponding Article or User based
     * on its id
     */
    const openEntryForm = (id: string | null | undefined) => {
        tableNavigate(`/business/${tableType.toLowerCase()}s/form/${id}`)
    }

    /**
     * Deletes a user from a business by reseting their relevant user values
     * related to the business panel
     * @param id {string} The id for a User 
     */
    const deleteUserFromBusiness = async (id: string | null | undefined) => {
        try {
            axios.put(`${BASE_SERVER_URL}/api/users/id/${id}`,
                {
                    "userId": id,
                    "userValues": {
                        "businessId": "",
                        "businessName": "",
                        "businessWebsite": "",
                        "articlePermission": Permission.READ_ONLY,
                        "userPermission": Permission.READ_ONLY
                    }
                },
                {
                    "headers": {
                        "Authorization": `Bearer ${Cookies.get("access_token")}`
                    }
                }
            )

            alert("User successfully deleted from business")
            setShouldRefresh && setShouldRefresh(true)
        } catch (error: any) {
            console.log("Error occurred deleting user: ", error)
            alert("Error occurred while deleting user")
        }
    }

    /**
     * Deletes an article
     */
    const deleteArticle = async (id: string | null ) => {
        try {
            axios.delete(
                `${BASE_SERVER_URL}/api/article/${id}`,
                {
                    "headers": {
                        "Authorization": `Bearer ${Cookies.get("access_token")}`
                    }
                }
            )

            alert("Article successfully deleted")
            setShouldRefresh && setShouldRefresh(true)
        } catch (error: any) {
            console.log("Error occurred deleting article", error)
            alert("Error occurred while deleting user")
        }
    }

    let tableHeaderNames = tableType == "Article" ? 
        articleHeaderNames : userHeaderNames

    const tableHeaders: JSX.Element[] = tableHeaderNames.map(
        headerName => 
            <th key={headerName} colSpan={1}>{headerName.toUpperCase()}</th>
    )

    const hasEditPermissions: boolean | null = 
        checkForEditPermissions(tableType, user)
    const hasDeletePermissions: boolean | null =
        checkForDeletePermissions(tableType, user)

    const tableData: JSX.Element[] = tableContents.map(
        row => 
            <tr key={row._id}>
                <td>
                    {isUser(row) && getUserFullname(row) || row._id}    
                </td>
                <td>
                    {isUser(row) && row.phone || isArticle(row) && row.heading}
                </td>
                <td>
                    {isUser(row) && row.email || isArticle(row) && row.engagements}
                </td>
                <td>
                    {
                        tableType === "Article" && 
                        <button
                            className="business-panel--table-button"
                            onClick={() => tableNavigate(`/article/${row._id}`)}
                        >
                            <img src={ReadIcon} alt="Read Article Button" />
                        </button>
                    }
                    {
                        hasEditPermissions &&
                        (tableType === "User" && isBusinessAccount(row) ?
                            hasBusinessAdminPermissions(user) : true) && 
                        <button
                            className="business-panel--table-button"
                            onClick={() => openEntryForm(row._id)}
                        >
                            <img src={EditIcon} alt="Edit Button" />
                        </button>
                    }
                    {
                        hasDeletePermissions && 
                        (tableType === "User" && isBusinessAccount(row) ?
                            hasBusinessAdminPermissions(user) : true) && 
                        <button 
                            className="business-panel--table-button"
                            onClick={
                                tableType === "User" ? 
                                () => deleteUserFromBusiness(row._id) :
                                () => row._id && deleteArticle(row._id)
                            }
                        >
                            <img src={TrashIcon} alt="Trash Button" />
                        </button>
                    }
                </td>
            </tr>
    )

    return (
        <div className="business-panel--table-container">
            <div className="business-panel--table-top"></div>
            <table className="business-panel--table">
                <thead>
                    <tr>{tableHeaders}</tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        </div>
    )
}

export default PanelTable