import React from 'react'
import { LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { CiUser } from "react-icons/ci";

function Header() {

    const loginStatus = useSelector((state) => state.auth.status ) // state.auth.status == auth (name of the authSlice)
    const userData = useSelector((state) => state.auth.userData )
    const navigate = useNavigate();

    //console.log(user);

    const navItems = [
        {
            name : "Home",
            url : "/",
            active : true
        },
        {
            name : "Show All",
            url : "/all-articles",
            active : true
        },
        {
            name : "Login",
            url : "/login",
            active : !loginStatus
        }
        
    ]


  return (
    <header>
        <nav className=' flex flex-wrap bg-gray-800 py-2 px-2 items-center '>
            <div className=" text-white " >
                            { loginStatus && <div className='flex items-center gap-1 '><CiUser /><p> {userData?.name}</p></div> }
            </div>
            <ul className=' flex flex-wrap ml-auto px-1 text-gray-300 '>
                {navItems.map((navItem)=> (
                    navItem.active ? (
                        <li key={navItem.name} className='px-2 py-2'>
                            <button onClick={() => navigate(navItem.url)}>{navItem.name}</button>
                        </li>    // OR <Link to={navItem.url}>{navItem.name}</Link>
                    ) : null
                ))}
                {
                    loginStatus ? <li className='py-1 px-2' ><LogoutBtn /></li> : <li ><button className='px-2 py-2 text-amber-500 ' onClick={() => navigate("/signup")}>SignUp</button></li>
                }
            </ul>
        </nav>
    </header>
  )
}

export default Header
