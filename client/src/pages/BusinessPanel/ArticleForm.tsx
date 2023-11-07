import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useParams, useNavigate } from "react-router-dom"

import ReactQuill from "react-quill"
import BusinessPanelPage from "./BusinessPanelPage"

import { ArticleInput } from "../../types/interfaces/BusinessPanel/ArticleInput"

// import "react-quill/dist/quill.snow.css"
import "./BusinessForm.css"

// Constants 
const MIN_TEXT_LEN: number = 2
const MAX_TEXT_LEN: number = 100

// Page component that allows users to create new articles or edit existing ones
const ArticleForm: React.FC = () => {
    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch,
        formState: { errors }
    } = useForm<ArticleInput>()
    const formNavigate = useNavigate()
    const { articleId } = useParams()
    const [isNewArticle] = useState<boolean>(articleId === "new")

    const submitArticle: SubmitHandler<ArticleInput> = data => console.log(data)

    // Side Effects
    // Use effect to control the content of the react quill content editor
    useEffect(() => {
        register("content", { required: "Articles must have content" })
    }, [register])

    // Event handlers
    /**
     * onChange handler for ReactQuill element
     * @param editorState The state of the react quill input
     */
    const onEditorStateChange = (editorState: string) => {
        setValue("content", editorState)
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

    const richTextEditorContent = watch("content")

    return (
        <BusinessPanelPage>
            <form 
                className="business-panel--form"
                onSubmit={handleSubmit(submitArticle)}
            >
                <div className="business-panel--page-header">
                    <h1>{isNewArticle ? "NEW" : "EDIT"} ARTICLE</h1>

                    <span className="business-panel--header-buttons">
                        <button type="submit">
                            {isNewArticle ? "Post" : "Save"}
                        </button>
                        <button onClick={cancelFormChanges}>Cancel</button>
                    </span>
                </div>

                <div
                    className={
                        `business-panel--form-half 
                         business-panel--article-meta-data`
                    }
                >
                    {/* Article Form Meta Data Section */}
                    <div className="business-panel--form-section">
                        <span className="business-panel--input">
                            <label htmlFor="heading">Heading</label>
                            <input 
                                {...register(
                                    "heading", 
                                    { 
                                        required: "Article must have a heading",
                                        minLength: {
                                            value: MIN_TEXT_LEN,
                                            message: `Heading must be at least ${MIN_TEXT_LEN} characters long`
                                        },
                                        maxLength: {
                                            value: MAX_TEXT_LEN,
                                            message: `Heading must be no more than ${MAX_TEXT_LEN} characters long`
                                        }
                                    }
                                )}
                            />
                        </span>
                        {
                            errors.heading &&
                            <span className="error-message">
                                {errors.heading.message}
                            </span>
                        }

                        <span className="business-panel--input">
                            <label htmlFor="subHeading">Sub-Heading</label>
                            <input 
                                {...register(
                                    
                                    "subHeading", 
                                    { 
                                        minLength: {
                                            value: MIN_TEXT_LEN,
                                            message: `Subheading must be at least ${MIN_TEXT_LEN} characters long`
                                        },
                                        maxLength: {
                                            value: MAX_TEXT_LEN,
                                            message: `Subheading must be no more than ${MAX_TEXT_LEN} characters long`
                                        }
                                    }
                                )}
                            />
                        </span>
                        {
                            errors.subHeading &&
                            <span className="error-message">
                                {errors.subHeading.message}
                            </span>
                        }

                        <span className="business-panel--input">
                            <label htmlFor="author">Author</label>
                            <input 
                                {...register(
                                    "author", 
                                    { 
                                        required: "Articles are required to have an author",
                                        minLength: {
                                            value: MIN_TEXT_LEN,
                                            message: `Authors for articles must be at least ${MIN_TEXT_LEN} characters long`
                                        },
                                        maxLength: {
                                            value: MAX_TEXT_LEN,
                                            message: `Authors for article must be no more than ${MAX_TEXT_LEN} characters long`
                                        }
                                    }
                                )}
                            />
                        </span>
                        {
                            errors.author &&
                            <span className="error-message">
                                {errors.author.message}
                            </span>
                        }
                    </div>

                    {/* Article Form Comment Settings */}
                    <div className="business-panel--form-section">
                        <h2>Comment Settings</h2>
                        <span className="business-panel--checkbox-span">
                            <input type="checkbox" {...register("allowComments")} />
                            <label htmlFor="allowComments">Allow Comments</label>
                        </span>
                        <span className="business-panel--checkbox-span">
                            <input
                                type="checkbox"
                                {...register("allowAnonymousComments")}
                            />
                            <label htmlFor="allowAnonymousComments">
                                Allow Anonymous Comments
                            </label>
                        </span>
                    </div>
                </div>

                {/* Content Editor */}
                <div
                    className={
                        `business-panel--form-half 
                         business-panel--article-editor`
                    }
                >
                    {
                        errors.content &&
                        <span className="error-message">
                            {errors.content.message}
                        </span>
                    }
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

export default ArticleForm