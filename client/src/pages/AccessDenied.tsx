// Page to display when the user has insufficient permissions to access a page
const AccessDenied: React.FC = () => {
    return (
        <main className="access-denied--container">
            <h1>Access Denied</h1>
            <p>User must log in or have sufficient permissions to access page</p>
        </main>
    )
}

export default AccessDenied