import { useState } from "react"
import './NewCommentField.css'

export default function NewCommentField(props:{postComment: (comment:string)=>Promise<void>}) {
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
            placeholder="Share your thoughts..."
            className="comment-form-text"
        >
        </textarea>
        {comment?<input type="submit" value="Post" className="submit-button"/>:<></>}
    </form>
    )
}