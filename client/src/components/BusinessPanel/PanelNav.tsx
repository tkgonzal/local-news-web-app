import { Link } from "react-router-dom"

import "./PanelNav.css"

// Navbar for Business Panel
const PanelNav: React.FC = () => {
    return (
        <nav className="business-panel--nav">
            <ul>
                <li>
                    <Link to="/business/articles">Dashboard</Link>
                </li>
                <li>
                    <Link to="/business/articles/form/new">New Post</Link>
                </li>
                <li>
                    <Link to="/business/users">Users</Link>
                </li>
                <li>
                    <Link to="/business/users/form/new">Add User</Link>
                </li>
                <li>
                    <Link to="/business/settings">Settings</Link>
                </li>
            </ul>
        </nav>
    )
}

export default PanelNav