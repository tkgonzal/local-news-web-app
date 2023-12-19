import { useState } from "react"
import './NewCommentField.css'

export default function NewCommentField(props:{postComment: (comment:string)=>Promise<void>, disabled?:boolean}) {
    const [comment, setComment] = useState<string>("")

    function onSubmit(e: React.FormEvent) {
        props.postComment(comment)
        setComment(()=>"")
        e.preventDefault()
    }

    return (
    <form
        className="comment-panel"
        onSubmit={onSubmit}
    >
        <textarea
            onChange={(e)=>setComment(e.target.value)}
            value={comment}
            placeholder={props.disabled?"Sign in to leave a comment.":"Share your thoughts..."}
            className="comment-form-text"
            disabled={props.disabled}
        >
        </textarea>
        {comment?<input
            type="submit"
            value="Post"
            className="submit-button"
            disabled={props.disabled}
        />:<></>}
    </form>
    )
}