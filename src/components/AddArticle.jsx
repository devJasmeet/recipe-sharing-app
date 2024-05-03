import React from 'react'
import { Button , Container } from "./index"
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

function AddArticle() {

    const loginStatus = useSelector((state) => state.auth.status )
    const navigate = useNavigate();

    function handleAdd() {
        loginStatus ? navigate("/new-article") : alert("Login to add")
    }

    return (
        <div>
            <Button onClick={handleAdd} >Add a new recipe</Button>
        </div>
  )
}

export default AddArticle
