import { Link } from "react-router-dom"

import "./PanelNav.css"

// Navbar for Business Panel
const PanelNav: React.FC = () => {
    return (
        <nav className="business-panel--nav">
            <ul>
                    <Link to="/business/articles">
                        <li>DASHBOARD</li>
                    </Link>
                    <Link to="/business/articles/form/new">
                        <li>NEW POST</li>
                    </Link>
                    <Link to="/business/users">
                        <li>USERS</li>
                    </Link>
                    <Link to="/business/users/form/new">
                        <li>ADD USER</li>
                    </Link>
                    <Link to="/business/settings">
                        <li>SETTINGS</li>
                    </Link>
            </ul>
        </nav>
    )
}

export default PanelNav