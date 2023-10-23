import "./AccessDenied.css"

const AccessDenied: React.FC = () => {
    return (
        <main className="access-denied--container">
            <h1>Access Denied</h1>
            <p>User must log in or have sufficient page</p>
        </main>
    )
}

export default AccessDenied