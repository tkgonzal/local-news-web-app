import { useForm, SubmitHandler } from "react-hook-form"

import axios from "axios"

import { useUserContext } from "../../contexts/UserContext"

import BusinessPanelPage from "./BusinessPanelPage"

import { SettingsInput } from "../../types/interfaces/BusinessPanel/SettingsInput"

// Page for business settings, only has toggle for comment notifications
const BusinessSettings: React.FC = () => {
    const { user } = useUserContext()
    const { register, handleSubmit } = useForm<SettingsInput>()

    // Event Handlers
    // Updates the user's comment notification settings
    const submitSettings: SubmitHandler<SettingsInput> = async data => {
        try {
            await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/business/notifications`,
                {
                    "_id": user?._id,
                    "valuesToUpdate": {
                        "receivesCommentNotifications": data.enableCommentNotifications
                    }
                }
            )
            alert("Notifications settings successfully updated")
        } catch (error: any) {
            if (error.response && 
                error.response.data && 
                error.response.data.message) {
                    alert(error.response.data.message)
            } else {
                alert("An error occured, notification settings could not be updated")
            }
        }
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
                        id="enableCommentNotifications"
                        {...register("enableCommentNotifications")}
                    />

                    <label htmlFor="enableCommentNotifications">
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