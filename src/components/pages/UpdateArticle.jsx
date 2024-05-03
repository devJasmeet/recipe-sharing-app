import React, { useEffect, useState } from 'react'
import { Container,ArticleForm } from "../index"
import { useNavigate, useParams } from 'react-router-dom'
import service from '../../appwrite/services'

function UpdateArticle() {
    const [article,setArticle] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            service.getArticle(slug).then(article => setArticle(article) )
        } else {
            navigate("/")
        }
    },[slug,navigate])
    //console.log(article);
  return article ? (
    <div>
        <Container>
            <ArticleForm article={article}/>
        </Container>
    </div>
  ) : null
}

export default UpdateArticle
