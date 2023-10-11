// import { User } from "../../types/interfaces/User"
import { Article } from "../../types/interfaces/Article"

import "./PanelTable.css"

interface Props {
    tableContents: Article[]
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
    // const userHeaderNames: string[] = [
    //     "Name", 
    //     "Email", 
    //     "Mobile Phone No", 
    //     "Actions"
    // ]

    const tableHeaders: JSX.Element[] = articleHeaderNames.map(
        headerName => <th key={headerName} colSpan={1}>{headerName}</th>
    )

    const tableData: JSX.Element[] = tableContents.map(
        row => 
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.heading}</td>
                <td>{row.impressions}</td>
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