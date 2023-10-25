import { NavigateFunction, useNavigate } from "react-router-dom"

import { useUserContext } from "../../contexts/UserContext"

import { User } from "../../types/interfaces/User"
import { Article } from "../../types/interfaces/Article"

import {
    hasUserEditPermissions,
    hasUserDeletePermissions,
    hasArticleEditPermissions,
    hasArticleDeletePermissions
} from "../../utils/permissionsUtils"

import EditIcon from "/assets/BusinessPanel/pen-to-square.svg"
import TrashIcon from "/assets/BusinessPanel/trash.svg"

import "./PanelTable.css"

type TableType = "User" | "Article"

interface Props {
    tableType: TableType
    tableContents: User[] | Article[]
}

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

// Table to display either users or articles for a Business as well as their
// actions the business can take on each one
const PanelTable: React.FC<Props> = ({ tableType, tableContents }) => {
    const { user } = useUserContext()
    const formNavigate: NavigateFunction = useNavigate()

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
    const openEntryForm = (id: string | null) => {
        formNavigate(`/business/${tableType.toLowerCase()}s/form/${id}`)
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
            <tr key={row.id}>
                <td>
                    {isUser(row) && getUserFullname(row) || row.id}    
                </td>
                <td>
                    {isUser(row) && row.phone || isArticle(row) && row.heading}
                </td>
                <td>
                    {isUser(row) && row.email || isArticle(row) && row.impressions}
                </td>
                <td>
                    {
                        hasEditPermissions &&
                        <button
                            className="business-panel--table-button"
                            onClick={() => openEntryForm(row.id)}
                        >
                            <img src={EditIcon} alt="Edit Button" />
                        </button>
                    }
                    {
                        hasDeletePermissions && 
                        <button className="business-panel--table-button">
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