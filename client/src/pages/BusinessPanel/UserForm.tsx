import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useParams } from "react-router-dom"
import ReactQuill from "react-quill"

import BusinessPanelPage from "./BusinessPanelPage"

import { UserInput } from "../../types/interfaces/BusinessPanel/UserInput"
import Permission from "../../types/enums/Permission"

import "react-quill/dist/quill.snow.css"
import "./BusinessForm.css"

// Form that allows for the creation of new Users or editing of existing ones
const UserForm: React.FC = () => {
    const { register, handleSubmit, setValue, watch } = useForm<UserInput>()
    const { userId } = useParams()
    const [isNewUser] = useState<boolean>(userId === "new")

    const addUser: SubmitHandler<UserInput> = data => console.log(data)

    // Side effects
    // Use effect to control the content of the react quill notes editor 
    useEffect(() => {
        register("notes", { required: true })
    }, [register])

    /**
     * onChange handler for ReactQuill element
     * @param editorState The state of the react quill input
     */
    const onEditorStateChange = (editorState: string) => {
        setValue("notes", editorState)
    }

    const richTextEditorContent = watch("notes")

    return (
        <BusinessPanelPage>
            <form className="business-panel--form" onSubmit={handleSubmit(addUser)}>
                <div className="business-panel--page-header">
                    <h1>{isNewUser ? "New" : "Edit"} User</h1>
                    <button>Add User</button>
                </div>

                <div className="business-panel--form-half">
                    {/* Primary User Information */}
                    <span className="business-panel--input">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            {...register(
                                "firstName", { required: "Required" }
                            )}
                        />
                    </span>
                    <span className="business-panel--input">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            {...register(
                                "lastName", { required: "Required" }
                            )}
                        />
                    </span>
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
                        <label htmlFor="disableLogin">Add Comments</label>
                    </span>

                    <label htmlFor="articlePermissions">Articles</label>
                    <select {...register("articlePermissions", { required: true })}>
                        <option value={Permission.READ_ONLY}>Read Only</option>
                        <option value={Permission.WRITE}>Write</option>
                        <option value={Permission.DELETE}>Delete</option>
                    </select>

                    <label htmlFor="userPermissions">Users</label>
                    <select {...register("userPermissions", { required: true })}>
                        <option value={Permission.READ_ONLY}>Read Only</option>
                        <option value={Permission.WRITE}>Write</option>
                        <option value={Permission.DELETE}>Delete</option>
                    </select>
                </div>

                <div className="business-panel--form-half">
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