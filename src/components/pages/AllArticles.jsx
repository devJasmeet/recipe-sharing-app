import React, {useState, useEffect} from 'react'
import { Container, Card ,AddArticle } from "../index"
import service from '../../appwrite/services';
import { useSelector } from 'react-redux'

function AllArticles() {

    //console.log("Showing all articles");
    const [articles, setArticles] = useState([])
    const loginStatus = useSelector(state => state.auth.status)
    
    const [loading,setLoading] = useState(true)


    useEffect(() => {
        const fetchData = async() => {
            const res = await service.getAllArticles([])
            if(res) {
                setArticles(res)
            }
            setLoading(false)
        }
        fetchData();
        
    },[])
    
    //console.log("Articles: ",articles);

    return (
        <div className='w-full py-8 mb-auto'>
            <Container>
                {loading ? <div className='text-center text-2xl text-gray-400 ' >Loading...</div> : 
                    <div className='mx-1'>
                        {
                            articles.length != 0 ? (
                                <>
                                <div className='flex w-full max-w-5xl mx-auto' >
                                    <div className='mx-auto'>
                                        {loginStatus ? <AddArticle /> : <p><span className='font-semibold  '>LOGIN</span> to view and add a recipe</p>}
                                    </div>
                                </div>
                                <div  className=' w-full max-w-5xl mx-auto flex flex-wrap justify-center gap-4 my-4 px-4'>
                                    {articles.map((article) => (
                                        <div key={article.$id} className=' w-48 h-60 rounded-md border border-black/10'>
                                            <Card { ...article } />
                                        </div>
                                   ))}
                                </div>
                                </> 
                            ) : <p className='text-center'>No recipes! Login to add recipes </p>
                        }
                    </div>
                }
            </Container>
        </div>
    )
}

export default AllArticles
