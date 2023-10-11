import { User } from "../../types/interfaces/User"
import { Article } from "../../types/interfaces/Article"

import "./PanelTable.css"

interface Props {
    tableContents: User[] | Article[]
}

// Table to display either users or articles for a Business as well as their
// actions the business can take on each one
const PanelTable: React.FC<Props> = ({ tableContents }) => {
    const articleHeaderNames: string[] = [
        "ID", 
        "Title", 
        "Impressions", 
        "Actions"
    ]
    const userHeaderNames: string[] = [
        "Name", 
        "Email", 
        "Mobile Phone No", 
        "Actions"
    ]

    const tableHeaders: JSX.Element[] = articleHeaderNames.map(
        headerName => <th colSpan={1}>{headerName}</th>
    )

    return (
        <table className="business-panel--table">
            <tr>{tableHeaders}</tr>
        </table>
    )
}

export default PanelTable