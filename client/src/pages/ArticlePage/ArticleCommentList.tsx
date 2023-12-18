import Comment from './ArticleComment'
import { ArticleComment } from '../../types/interfaces/ArticleComment'
import './ArticleCommentList.css'

export default function ArticleCommentList(props:{comments: ArticleComment[] | undefined}) {
    if (props.comments == undefined) {
        return (<div className='comment-panel'>
            no comments
        </div>)
    }

    return (<div className='comment-panel'>
        {props.comments.map((comment)=><Comment key={comment._id} comment={comment}/>)}
    </div>)
}