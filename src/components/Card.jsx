import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";

import service from "../appwrite/services.js"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Card({ $id,title,featuredImage,author,userId}) { // ERROR FIXED - should not be async

  const [imageSrc,setSrc] = useState("")  // IMAGE ERROR FIXED - used state and used getfile outside of img tag 
  //console.log("Card component called : ", $id, "and",title);
  service.getFile(featuredImage).then( res => setSrc(res));
  //console.log(imageSrc);
  const userData = useSelector(state => state.auth.userData)
  const isAuthor = userData?.$id === userId
  
  return (
    <div className='h-full p-2  ' >
      <Link to={`/article/${$id}`} >
        
          <img src={imageSrc} alt={title} className=' w-full h-2/3' />  {/* No direct call to getfile  */} 
          <h2 className='font-semibold py-2'>{title}</h2>
          <p className='text-xs mt-auto '>by {author}</p>
          {isAuthor ? <div className='flex '> <MdEdit className='ml-auto' /></div> : <div className='flex'> <MdRemoveRedEye className='ml-auto text-gray-400' /></div>}
      </Link>
    </div>
  )
}

export default Card
