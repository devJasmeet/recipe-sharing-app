import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import authService from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout()
    .then(() => {
      dispatch(logout())
      navigate("/")
    })
    .catch(error => console.log("Logout error: ", error))
  }

  return (
    <button className='px-3 py-1 bg-red-600 font-semibold rounded-md  text-gray-800 ' onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default LogoutBtn
