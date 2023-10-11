import { User } from "../../types/interfaces/User"
import { Article } from "../../types/interfaces/Article"

import "./PanelTable.css"

type TableType = "User" | "Article"

interface Props {
    tableType: TableType
    tableContents: User[] | Article[]
}

// Table Utils
const isUser = (tableRow: User | Article): tableRow is User => {
    return (tableRow as User).email !== undefined
}

const isArticle = (tableRow: User | Article): tableRow is Article => {
    return (tableRow as Article).heading !== undefined
}

const getUserFullname = (user: User): string => {
    return `${user.name?.first} ${user.name?.last}`
}

// Table to display either users or articles for a Business as well as their
// actions the business can take on each one
const PanelTable: React.FC<Props> = ({ tableType, tableContents }) => {
    const articleHeaderNames: string[] = [
        "ID", 
        "Title", 
        "Impressions", 
        "Actions"
    ]
    const userHeaderNames: string[] = [
        "Name", 
        "Mobile Phone No", 
        "Email", 
        "Actions"
    ]

    let tableHeaderNames = tableType == "Article" ? 
        articleHeaderNames : userHeaderNames

    const tableHeaders: JSX.Element[] = tableHeaderNames.map(
        headerName => <th key={headerName} colSpan={1}>{headerName}</th>
    )

    const tableData: JSX.Element[] = tableContents.map(
        row => 
            <tr key={row.id}>
                <td>
                    {isUser(row) && getUserFullname(row) || row.id}    
                </td>
                <td>
                    {
                        isUser(row) && row.phone || 
                        isArticle(row) && row.heading
                    }
                </td>
                <td>
                    {
                        isUser(row) && row.email || 
                        isArticle(row) && row.heading
                    }
                </td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
    );

    return (
        <table className="business-panel--table">
            <thead>
                <tr>{tableHeaders}</tr>
            </thead>
            <tbody>
                {tableData}
            </tbody>
        </table>
    )
}

export default PanelTable