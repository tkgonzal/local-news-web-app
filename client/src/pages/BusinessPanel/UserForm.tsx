import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useParams, useNavigate } from "react-router-dom"

import ReactQuill from "react-quill"
import BusinessPanelPage from "./BusinessPanelPage"

import { UserInput } from "../../types/interfaces/BusinessPanel/UserInput"
import Permission from "../../types/enums/Permission"

import "react-quill/dist/quill.snow.css"
import "./BusinessForm.css"

// Constants 
const MIN_NAME_LEN: number = 2
const MAX_NAME_LEN: number = 30

// Form that allows for the creation of new Users or editing of existing ones
const UserForm: React.FC = () => {
    const { register, 
        handleSubmit, 
        setValue, 
        watch, 
        formState: { errors } 
    } = useForm<UserInput>()
    const formNavigate = useNavigate()
    const { userId } = useParams()
    const [isNewUser] = useState<boolean>(userId === "new")

    
    // Side effects
    // Use effect to control the content of the react quill notes editor 
    useEffect(() => {
        register("notes", { required: true })
    }, [register])
    
    // Event Handlers
    // Form Submit Handler, attempts to either add or update user
    const submitUser: SubmitHandler<UserInput> = data => {
        console.log(data)
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
                    {errors.firstName && 
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
                    {errors.lastName && 
                        <span className="error-message">
                            {errors.lastName.message}
                        </span>
                    }

                    <span className="business-panel--input">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            {...register(
                                "email", { required: "Required" }
                            )}
                        />
                    </span>
                    <span className="business-panel--input">
                        <label htmlFor="phoneNumber">Mobile Phone Number</label>
                        <input
                            {...register(
                                "phoneNumber", 
                                { 
                                    required: "Required",
                                    pattern: /(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}/
                                }
                            )}
                        />
                    </span>

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
                            <option value={Permission.READ_ONLY}>Read Only</option>
                            <option value={Permission.WRITE}>Write</option>
                            <option value={Permission.DELETE}>Delete</option>
                        </select>
                    </div>

                    <div className="business-panel--select-div">
                        <label htmlFor="userPermissions">Users</label>
                        <select 
                            {...register("userPermissions", { required: true })}
                        >
                            <option value={Permission.READ_ONLY}>Read Only</option>
                            <option value={Permission.WRITE}>Write</option>
                            <option value={Permission.DELETE}>Delete</option>
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