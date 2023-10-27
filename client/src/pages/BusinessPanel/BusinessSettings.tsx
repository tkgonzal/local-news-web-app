import { useForm, SubmitHandler } from "react-hook-form"

import BusinessPanelPage from "./BusinessPanelPage"

import { SettingsInput } from "../../types/interfaces/BusinessPanel/SettingsInput"

// Page for business settings, only has toggle for comment notifications
const BusinessSettings: React.FC = () => {
    const { register, handleSubmit } = useForm<SettingsInput>();
    const submitSettings: SubmitHandler<SettingsInput> = data => {
        console.log(data)
    }

    return (
        <BusinessPanelPage>
            <form
                className="business-panel--settings"
                onSubmit={handleSubmit(submitSettings)}
            >
                <div className="business-panel--page-header">
                    <h1>SETTINGS</h1>
                    <button type="submit">Save</button>
                </div>

                <h2>Notifications</h2>
                <span className="business-panel--settings-input">
                    <input
                        type="checkbox"
                        id="allowComments"
                        {...register("allowComments")}
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