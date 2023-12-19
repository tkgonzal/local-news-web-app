import { useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import { NewArticleComment } from "../types/interfaces/ArticleComment";
import { Article } from "../types/interfaces/Article";
import { useUserContext } from "../contexts/UserContext";
import Cookies from "js-cookie"
import { useSnackbar } from "../contexts/SnackbarContext";

const BASE_SERVER_URL: string = import.meta.env.VITE_SERVER_URL
const ENGAGEMENTS_AUTH_KEY: string = import.meta.env.VITE_ENGAGEMENTS_AUTH


function useArticle(articleUID: string | undefined, limit: number) {
    const [articleObj, setArticleObj] = useState<Article>()
    const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([])
    const {user} = useUserContext()
    const {setSnackbar} = useSnackbar()

    useEffect(()=>{
        if (articleUID == undefined) return;
        (async () => {
            try {
                axios.put(
                    `${BASE_SERVER_URL}/api/article/engagements/${articleUID}`,
                    { },
                    { 
                        headers: { 
                            Authorization: `Bearer ${ENGAGEMENTS_AUTH_KEY}` 
                        } 
                    }
                )
                const article : AxiosResponse<Article> = await axios.get<Article>(`${BASE_SERVER_URL}/api/article/${articleUID}`)
                setArticleObj(article.data)

            } catch (err) {
                console.log(err)
            }
        })()
    },[articleUID])

    useEffect(()=>{
        if (articleObj == undefined) {return}
        (async () => {
            try {
                const response : AxiosResponse<Article[]> = await axios.get<Article[]>(`${BASE_SERVER_URL}/api/articles`,{
                    params: {
                        tag: articleObj?.tags[0],
                        limit: limit
                    }
                })
                
                const articles = response.data.filter((article)=>{
                    return article._id != articleObj._id
                })
                setRecommendedArticles(articles)
            } catch (err) {
                console.log(err)
            }
        })()
    },[articleObj, limit])

    async function postComment(message: string) {
        try {
            if (articleObj == undefined) return;

            const comment: NewArticleComment = {
                message: message,
            }
            let response : AxiosResponse;
            if (user) {
                response = await axios.post(`${BASE_SERVER_URL}/api/article/${articleUID}/comment`, {
                    comment:comment
                },{
                    headers: {
                        "Authorization": Cookies.get("access_token")
                    }
                })
            } else {
                response = await axios.post(`${BASE_SERVER_URL}/api/article/${articleUID}/anoncomment`, {
                    comment:comment
                })
            }
            
            setArticleObj((article)=>(
                article?{...article,  comments:response.data.comments, ipCanComment:user?true:false}:article
            ))
            setSnackbar({severity: "success", message:"comment posted!"})
        } catch {
            setSnackbar({severity: "error", message:"something went wrong :("})
        }
        
    }

    return {articleObj, recommendedArticles, postComment}
}

export { useArticle }