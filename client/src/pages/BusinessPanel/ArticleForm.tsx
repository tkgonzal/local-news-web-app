import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useParams, useNavigate } from "react-router-dom"

import { useUserContext } from "../../contexts/UserContext"

import ReactQuill from "react-quill"
import BusinessPanelPage from "./BusinessPanelPage"

import axios from "axios"
import Cookies from "js-cookie"

import { ArticleInput } from "../../types/interfaces/BusinessPanel/ArticleInput"
import { ArticleRequestData } from "../../types/interfaces/BusinessPanel/ArticleRequestData"

// import "react-quill/dist/quill.snow.css"
import "./BusinessForm.css"

// Constants 
const MIN_TEXT_LEN: number = 2
const MAX_TEXT_LEN: number = 100
const BASE_SERVER_URL: string = import.meta.env.VITE_SERVER_URL 

// Page component that allows users to create new articles or edit existing ones
const ArticleForm: React.FC = () => {
    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch,
        formState: { errors }
    } = useForm<ArticleInput>()
    const { user } = useUserContext()
    const formNavigate = useNavigate()
    const { articleId } = useParams()
    const [isNewArticle] = useState<boolean>(articleId === "new")

    const richTextEditorContent = watch("content")
    const allowCommentsWatch = watch("allowComments")

    // Side Effects
    // Use effect to control the content of the react quill content editor
    useEffect(() => {
        register("content", { required: "Articles must have content" })
    }, [register])

    // Side effect to fill in the form with the details of an existing article
    // if the form is being used to edit it
    useEffect(() => {
        const fillInFormForArticle = async () => {
            const articleResponse = await axios.get(
                `${BASE_SERVER_URL}/api/article/${articleId}`,
                {
                    "headers": {
                        "Authorization": `Bearer ${Cookies.get("access_token")}`
                    }
                }
            )

            const article = articleResponse.data
            
            if (articleResponse.status !== 500) {
                setValue("heading", article.heading)
                setValue("subHeading", article.subHeading)
                setValue("author", article.authors.join(", "))
                setValue("allowComments", article.allowComments)
                setValue("allowAnonymousComments", article.allowAnonymousComments)
                setValue("content", article.body)
            }
        }

        if (!isNewArticle) {
            try {
                fillInFormForArticle();
            } catch (error: any) {
                console.log(
                    `Error occurred retrieving details for article of id ${articleId}: `, 
                    error
                )
                alert("Error occurred while retrieving details for article")
                formNavigate("/business/articles")
            }
        }
    }, [articleId])

    // If allow comments is set to false, then the allow anonymous comments
    // checkbox is set to false and also disabled
    useEffect(() => {
        if (!allowCommentsWatch) {
            setValue("allowAnonymousComments", false)
        }
    }, [allowCommentsWatch])

    // Event handlers
    // The event handler for submitting the form.
    const submitArticle: SubmitHandler<ArticleInput> = async data => {
        try {
            const articleRequestData: ArticleRequestData = {
                "source": user?.businessName || "MoNews",
                "heading": data.heading,
                "subHeading": data.subHeading || undefined,
                "body": data.content,
                "businessId": user?.businessId || user?._id,
                "allowComments": data.allowComments,
                "allowAnonymousComments": data.allowAnonymousComments,
                "authors": [data.author]
            }

            if (isNewArticle) {
                await submitNewArticle(articleRequestData)
            }

            alert(`Article was successfully ${isNewArticle ? "posted": "updated"}`)
            formNavigate("/business/articles")
        } catch (error: any) {
            console.log("Error occurred while submitting Article", error)
            alert("An error occurred while submitting the article")
        }
    }

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
        formNavigate("/business/articles")
    }

    // Utility Functions
    const submitNewArticle = async (article: ArticleRequestData) => {
        axios.post(`${BASE_SERVER_URL}/api/article/new`,
            {
                "articleData": article
            },
            {
                "headers": {
                    "Authorization": `Bearer ${Cookies.get("access_token")}`
                }
            }
        )
    }

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
                                disabled={!allowCommentsWatch}
                                type="checkbox"
                                {...register("allowAnonymousComments")}
                            />
                            <label 
                                className={`${
                                    !allowCommentsWatch && "disabled"
                                }`}
                                htmlFor="allowAnonymousComments">
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