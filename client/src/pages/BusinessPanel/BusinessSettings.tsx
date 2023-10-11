import BusinessPanelPage from "./BusinessPanelPage"

// Page for business settings
const BusinessSettings: React.FC = () => {
    return (
        <BusinessPanelPage>
            <form className="business-panel--settings">
                <div className="business-panel--page-header">
                    <h1>Settings</h1>

                    <button onClick={e => e.preventDefault()}>Save</button>
                </div>

                <span className="business-panel--settings-input">
                    <input
                        type="checkbox"
                        name="allowComments"
                        id="allowComments"
                    />

                    <label htmlFor="allowComments">
                        <b>New Comments</b> - Toggle here to be emailed a 
                        notification whenever articles receive a new 
                        comment
                    </label>
                </span>
            </form>
        </BusinessPanelPage>
    )
}

export default BusinessSettings