import { useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import ReactQuill from "react-quill"

import BusinessPanelPage from "./BusinessPanelPage"

import { ArticleInput } from "../../types/interfaces/BusinessPanel/ArticleInput"

import "react-quill/dist/quill.snow.css"
import "./ArticleForm.css"

const ArticleForm: React.FC = () => {
    const { register, handleSubmit, setValue, watch } = useForm<ArticleInput>();
    const submitArticle: SubmitHandler<ArticleInput> = data => console.log(data)

    useEffect(() => {
        register("content", { required: true })
    }, [register])

    const onEditorStateChange = (editorState: string) => {
        setValue("content", editorState)
    }

    const richTextEditorContent = watch("content")

    return (
        <BusinessPanelPage>
            <form 
                className="business-panel--form"
                onSubmit={handleSubmit(submitArticle)}
            >
                <div className="business-panel--page-header">
                    <h1>New Article</h1>
                    <button type="submit">Save</button>
                </div>

                <div className="business-panel--form-half">
                    {/* Article Form Meta Data Section */}
                    <div className="business-panel--form-section">
                        <span className="business-panel--input">
                            <label htmlFor="heading">Heading</label>
                            <input {...register(
                                "heading", { required: "Required" }
                            )}/>
                        </span>

                        <span className="business-panel--input">
                            <label htmlFor="subHeading">Sub-Heading</label>
                            <input {...register(
                                "subHeading", { required: "Required" }
                            )}/>
                        </span>

                        <span className="business-panel--input">
                            <label htmlFor="author">Author</label>
                            <input {...register(
                                "author", { required: "Required" }
                            )}/>
                        </span>
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

export default ArticleForm