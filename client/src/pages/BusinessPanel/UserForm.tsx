import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useParams, useNavigate } from "react-router-dom"

import { useUserContext } from "../../contexts/UserContext"

import axios from "axios"
import Cookies from "js-cookie"

import ReactQuill from "react-quill"
import BusinessPanelPage from "./BusinessPanelPage"

import { UserInput } from "../../types/interfaces/BusinessPanel/UserInput"
import Permission from "../../types/enums/Permission"

import "react-quill/dist/quill.snow.css"
import "./BusinessForm.css"

// Constants 
const MIN_NAME_LEN: number = 2
const MAX_NAME_LEN: number = 30
const BASE_SERVER_URL = import.meta.env.VITE_SERVER_URL

// Utility Functions
/**
 * @param permission {Permission} A permission set for the user's permissions
 * @returns A string literal value to use for the permissions drop down
 */
const convertPermissionToStringLiteral = (permission: Permission): 
    "READ_ONLY" | "WRITE" | "DELETE" => {
    if (permission === Permission.READ_ONLY) {
        return "READ_ONLY"
    } else if (permission === Permission.WRITE) {
        return "WRITE"
    } else {
        return "DELETE"
    }
}

// Form that allows for the creation of new Users or editing of existing ones
const UserForm: React.FC = () => {
    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch,
        setError,
        formState: { errors } 
    } = useForm<UserInput>()
    const { user } = useUserContext()
    const formNavigate = useNavigate()
    const { userId } = useParams()
    const [isNewUser] = useState<boolean>(userId === "new")

    
    // Side effects
    // Use effect to control the content of the react quill notes editor 
    useEffect(() => {
        register("notes")
    }, [register])

    useEffect(() => {
        // Helper function for filling in the form with existing user data if
        // editing an existing user
        const fillInFormForUser = async () => {
            const userResponse = await axios.get(`${BASE_SERVER_URL}/api/users/id/${userId}`,
                {
                    "headers": {
                        "Authorization": `Bearer ${Cookies.get("access_token")}`
                    }
                }
            )

            const { userById } = userResponse.data

            if (userById) {
                setValue("firstName", userById.name.first)
                setValue("lastName", userById.name.last)
                setValue("email", userById.email)
                setValue("phoneNumber", userById.phone)
                setValue("disableLogin", userById.hasDisabledLogin)
                setValue("articlePermissions", 
                    convertPermissionToStringLiteral(userById.articlePermissions)
                )
                setValue("userPermissions", 
                    convertPermissionToStringLiteral(userById.userPermissions)
                )
                userById.notes && setValue("notes", userById.notes)
            }
        }

        if (!isNewUser) {
            fillInFormForUser()
        }
    }, [userId])
    
    // Event Handlers
    // Form Submit Handler, attempts to either add or update user
    const submitUser: SubmitHandler<UserInput> = async data => {
        try {
            if (isNewUser) {
                const emailResponse = await axios.post(`${BASE_SERVER_URL}/api/users/email`,
                    {
                        "email": data.email
                    },
                    {
                        "headers": {
                            "Authorization": `Bearer ${Cookies.get("access_token")}`
                        }
                    }
                )

                const { userByEmail } = emailResponse.data

                if (userByEmail) {
                    if (userByEmail.accType === "Business" || userByEmail.businessId !== "") {
                        setError("email", {
                            type: "manual",
                            message: `Email is either already associated with a business or a business account, cannot be added`
                        })

                        return 
                    } else {
                        submitUserValues(userByEmail._id, data)
                    }
                } else {
                    setError("email", {
                        type: "manual",
                        message: `No user by email of ${data.email} exists`
                    })

                    return
                }
            } else if (userId) {
                submitUserValues(userId, data)
            } else {
                alert(`No valid user id for form could be found. Returning to users table`)
                formNavigate("/business/users")
            }

            alert(`User successfully ${isNewUser ? "added": "updated"}`)
            formNavigate("/business/users")
        } catch (error: any) {
            console.log(error)
            alert("An error occured while make changes to user")
        }
    }

    /**
     * onChange handler for ReactQuill element
     * @param editorState The state of the react quill input
     */
    const onEditorStateChange = (editorState: string) => {
        setValue("notes", editorState)
    }

    /**
     * Cancels whatever changes are being made to the user and navigates the 
     * user to the users table
     * @param event {React.FormEvent} A form event
     */
    const cancelFormChanges: React.FormEventHandler = (event: React.FormEvent) => {
        event.preventDefault()
        formNavigate("/business/users")
    }

    // Utility Functions
    /**
     * Submits the values to update for the user of a given id
     * @param id {string} The id for a user
     * @param data {UserInput} The data to reference when updating the user's 
     * values
     */
    const submitUserValues = async (id: string, data: UserInput) => {
        await axios.put(`${BASE_SERVER_URL}/api/users/id/${id}`,
            {
                "userId": id,
                "userValues": {
                    "name": {
                        "first": data.firstName,
                        "last": data.lastName 
                    },
                    "email": data.email,
                    "phone": data.phoneNumber,
                    "businessId": user?.accType === "Business" ? 
                        user._id : user?.businessId,
                    "businessName": user?.businessName,
                    "businessWebsite": user?.businessWebsite,
                    "articlePermissions": Permission[data.articlePermissions],
                    "userPermissions": Permission[data.userPermissions],
                    "hasDisabledLogin": data.disableLogin,
                    "notes": data.notes
                }
            },
            {
                "headers": {
                    "Authorization": `Bearer ${Cookies.get("access_token")}`
                }
            }
        )
    }

    const richTextEditorContent = watch("notes")

    return (
        <BusinessPanelPage>
            <form
                className="business-panel--form business-panel--user-form" 
                onSubmit={handleSubmit(submitUser)}
            >
                <div className="business-panel--page-header">
                    <h1>{isNewUser ? "NEW" : "EDIT"} USER</h1>

                    <span className="business-panel--header-buttons">
                        <button type="submit">
                            {isNewUser ? "Add User" : "Save Changes"}
                        </button>
                        <button onClick={cancelFormChanges}>Cancel</button>
                    </span>
                </div>

                <div className={
                    `business-panel--form-half
                     business-panel--user-first-half`
                }>
                    {/* Primary User Information */}
                    <h2>User Info</h2>
                    <span className="business-panel--input">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            {...register(
                                "firstName", 
                                { 
                                    required: "User must have a first name",
                                    minLength: {
                                        value: MIN_NAME_LEN,
                                        message: `First name must be at least ${MIN_NAME_LEN} characters long`
                                    },
                                    maxLength: {
                                        value: MAX_NAME_LEN,
                                        message: `First name must be no more than ${MAX_NAME_LEN} characters long`
                                    }
                                }
                            )}
                        />
                    </span>
                    {
                        errors.firstName && 
                        <span className="error-message">
                            {errors.firstName.message}
                        </span>
                    }

                    <span className="business-panel--input">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            {...register(
                                "lastName", 
                                { 
                                    required: "User must have last name",
                                    minLength: {
                                        value: MIN_NAME_LEN,
                                        message: `Last name must be at least ${MIN_NAME_LEN} characters long`
                                    },
                                    maxLength: {
                                        value: MAX_NAME_LEN,
                                        message: `Last name must be no more than ${MAX_NAME_LEN} characters long`
                                    }
                                }
                            )}
                        />
                    </span>
                    {
                        errors.lastName && 
                        <span className="error-message">
                            {errors.lastName.message}
                        </span>
                    }

                    <span className="business-panel--input">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            {...register(
                                "email", { 
                                    required: "User email is required" 
                                }
                            )}
                        />
                    </span>
                    {
                        errors.email &&
                        <span className="error-message">
                            {errors.email.message}
                        </span>
                    }

                    <span className="business-panel--input">
                        <label htmlFor="phoneNumber">Mobile Phone Number</label>
                        <input
                            {...register(
                                "phoneNumber", 
                                { 
                                    required: "Phone Number is required",
                                    pattern: {
                                        value: /^(((\([0-9]{3}\)|([0-9]{3}-))[0-9]{3}-[0-9]{4})|[0-9]{10})$/,
                                        message: "Phone Number must be in format (XXX)XXX-XXX, XXX-XXX-XXXX, XXXXXXXXXX"
                                    }

                                }
                            )}
                        />
                    </span>
                    {
                        errors.phoneNumber &&
                        <span className="error-message">
                            {errors.phoneNumber.message}
                        </span>
                    }

                    {/* User Permissions */}
                    <h2>User Permissions</h2>
                    <span className="business-panel--checkbox-span">
                        <input type="checkbox" {...register("disableLogin")} />
                        <label htmlFor="disableLogin">Disable Login</label>
                    </span>

                    <div className="business-panel--select-div">
                        <label htmlFor="articlePermissions">Articles</label>
                        <select 
                            {...register("articlePermissions", { required: true })}
                        >
                            <option value={"READ_ONLY"}>Read Only</option>
                            <option value={"WRITE"}>Write</option>
                            <option value={"DELETE"}>Delete</option>
                        </select>
                    </div>

                    <div className="business-panel--select-div">
                        <label htmlFor="userPermissions">Users</label>
                        <select 
                            {...register("userPermissions", { required: true })}
                        >
                            <option value={"READ_ONLY"}>Read Only</option>
                            <option value={"WRITE"}>Write</option>
                            <option value={"DELETE"}>Delete</option>
                        </select>
                    </div>
                </div>

                <div className="business-panel--form-half">
                    <h2>Notes</h2>
                    <div className="business-panel--rte-container">
                        <ReactQuill 
                            theme="snow"
                            value={richTextEditorContent}
                            onChange={onEditorStateChange}
                        />
                    </div>
                </div>
            </form>
        </BusinessPanelPage>
    )
}

export default UserForm