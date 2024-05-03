import { Button , Container ,AddArticle } from "../index"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

function Home() {

    const userData = useSelector(state => state.auth.userData)
    const loginStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate();
    //console.log("User: ",userData);

    return (
        <>
        
            <div className="flex flex-col py-8 justify-between items-center h-2/3 mx-2 ">
                <div className="text-center">
                    <h3 className=" text-2xl my-4" >Explore a treasure trove of mouthwatering recipes curated by culinary enthusiasts from around the globe</h3>
                    <p  >Ready to share your culinary masterpiece? </p>
                    {!loginStatus && <h3 className=" text-2xl my-8">Join us and become part of our recipe-sharing family today!</h3>}
                </div>

                <div className="my-8 text-center ">
                    <h2 onClick={() => navigate("/all-articles")} className=" text-6xl font-bold cursor-pointer heading " >See All Recipes</h2>
                </div>
                <div className="my-8">
                    {loginStatus && <AddArticle />}
                </div>
            </div>
        </>
  )
}
export default Home


//const [articles,setArticles] = useState([]) 

/*
<div className=" text-center ">
                        <h3 className=" text-2xl font-medium " >Your articles</h3>
                    </div>
                    <div className="flex flex-wrap h-1/3" ></div>
*/