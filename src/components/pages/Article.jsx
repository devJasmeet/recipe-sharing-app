import React, { useEffect,useState } from 'react'
import { Container, Button } from "../index"
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../../appwrite/services'
import Parser from "html-react-parser"
const parser = new DOMParser();

//  articleId - display all the data of the article
//  who is the user
//  if user = owner ID, display update button,status

function Article() {

    const [article,setArticle] = useState({})
    const [imageSrc,setSrc] = useState("")
    const [loading,setLoading] = useState(true)
    const { slug } = useParams()
    //console.log(slug);
    const navigate = useNavigate()
    
    useEffect(()=>{
        service.getArticle(slug).then((article) => {
            if(article) {
                setArticle(article)
            } else {
                navigate("/")
            }
            service.getFile(article.featuredImage).then( res => setSrc(res));
            setLoading(false)
        })
    },[slug,navigate])

    const userData = useSelector(state => state.auth.userData)
    const isAuthor = article?.userId === userData?.$id  

    const deleteArticle = async () => {
        console.log("Delete article called");
        service.deleteArticle(article.$id).then(async(res)=>{
            if(res){
                await service.delFile(article.featuredImage)
                navigate("/")
            }
        }).catch(error => console.log("Article delete error: ",error))
    }

    return (
        <div className="w-full h-full py-8  px-4 ">
            { loading && <div className='text-center text-2xl text-gray-400' >Loading...</div>}
            <Container>
                {article ? (
                    <div>
                        <div className='flex'>
                                    { isAuthor ? <div className='flex flex-wrap gap-2 mb-4 mx-auto '>
                                        <Link to={`/update-article/${article.$id}`}>
                                            <Button bgColor =' bg-blue-500 '>Edit</Button>
                                        </Link>
                                        <Button bgColor =' bg-red-500 ' onClick={deleteArticle} >Delete</Button>
                                    </div> : null}
                        </div>
                        <div className='flex w-full justify-between gap-4 article'>
                            <div className=' flex flex-col justify w-2/3 gap-4'>
                                <div><h2 className='text-2xl font-semibold'>{article.title}</h2></div>
                                <div className='article-content'>
                                    { article.content ? Parser(article.content) : null }
                                </div>
                                
                            </div>

                            <div className=' w-1/3' >
                                
                                <div>
                                    <img
                                        src={imageSrc}
                                        alt={article.title}
                                        className='w-full rounded-xl '
                                    />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                ) : null}
        </Container>
    
        </div>
    )

}

export default Article
