import { useForm, SubmitHandler } from "react-hook-form"

import axios from "axios"
import Cookies from "js-cookie"

import { useUserContext } from "../../contexts/UserContext"

import BusinessPanelPage from "./BusinessPanelPage"
import AccessDenied from "../AccessDenied"

import { SettingsInput } from "../../types/interfaces/BusinessPanel/SettingsInput"

import { hasBusinessAdminPermissions } from "../../utils/permissionsUtils"
import { useSnackbar } from "../../contexts/SnackbarContext"

// Page for business settings, only has toggle for comment notifications
const BusinessSettings: React.FC = () => {
    const { user } = useUserContext()
    const { setSnackbar } = useSnackbar()
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
                },
                {
                    "headers": {
                        "Authorization": `Bearer ${Cookies.get("access_token")}`
                    }
                }
            )

            setSnackbar({severity:"success", message:"Notifications settings successfully updated"})
        } catch (error: any) {
            if (error.response && 
                error.response.data && 
                error.response.data.message) {
                    setSnackbar({severity:"error", message:error.response.data.message})
            } else {
                setSnackbar({severity:"error", message:"An error occured, notification settings could not be updated"})
            }
        }
    }
    console.log(user)
    console.log(user && hasBusinessAdminPermissions(user))

    return (
        <BusinessPanelPage>
            {
                user && hasBusinessAdminPermissions(user) ? 
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
                </form> :
                <AccessDenied />
            }
        </BusinessPanelPage>
    )
}

export default BusinessSettings