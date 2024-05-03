import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AccessLayout({ children , authentication=true }) {

    const navigate = useNavigate();
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    useEffect(()=> {
        if(authentication && authStatus != authentication ){
            navigate('/login')
            console.log("Navigated to Login");
        } else if(!authentication && authStatus != authentication ){
            navigate('/')
            console.log("Navigated to Home");
        }
        setLoader(false)
    },[authStatus,navigate,authentication])

    return loader ? <p>Loading...</p> : <div>{children}</div>
}

export default AccessLayout
