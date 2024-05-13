import React, { useState } from 'react'
import { LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { CiUser } from "react-icons/ci";
import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";


function Header() {

    const loginStatus = useSelector((state) => state.auth.status ) // state.auth.status == auth (name of the authSlice)
    const userData = useSelector((state) => state.auth.userData )
    const navigate = useNavigate();
    const [showMenu , setShowMenu] = useState(false)

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

    function toggleMenu() {
        setShowMenu(!showMenu);
    }

  return (
    <header>
        <nav id='small-navbar' className='  bg-gray-800 p-2  '>
            <div className='flex flex-wrap items-center justify-between p-2'>
                <div className=' text-gray-300 ' onClick={toggleMenu} ><TiThMenu /></div>
                <div className=" text-white  ml-auto" >
                    { loginStatus && <div className='flex items-center gap-1'><CiUser /><p> {userData?.name}</p></div> }
                </div>
            </div>
            <div onClick={toggleMenu} >
                { showMenu && <div className='menu-drawer bg-gray-900 opacity-95 '>
                    <div onClick={toggleMenu} className='flex justify-between items-center p-4 text-gray-500'>
                        <div><TiThMenu /></div>
                        <div className=' text-xl '><MdClose /></div>
                    </div>
                    <ul className=' flex flex-col text-gray-300 items-center'>
                        {navItems.map((navItem)=> (
                            navItem.active ? (
                                <li key={navItem.name} className='p-2'>
                                    <button onClick={() => navigate(navItem.url)}>{navItem.name}</button>
                                </li>    // OR <Link to={navItem.url}>{navItem.name}</Link>
                            ) : null
                        ))}
                        {
                            loginStatus ? <li className='py-1 px-2' ><LogoutBtn /></li> : <li ><button className='px-2 py-2 text-amber-500 ' onClick={() => navigate("/signup")}>SignUp</button></li>
                        }
                    </ul> 
                </div>}
            </div>
        </nav>
        <nav id='header-navbar' className=' flex flex-wrap bg-gray-800 py-2 px-2 items-center  '>
            <div className='menu flex flex-wrap  items-center p-2 ' >
                <div className=" text-white " >
                    { loginStatus && <div className='flex items-center gap-1'><CiUser /><p> {userData?.name}</p></div> }
                </div>
                <div className='menu-button ml-auto' >
                    { showMenu && <ul className=' flex flex-col  px-1 text-gray-300 menu-drawer'>
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
                    }
                </div>
            </div>

            
            <ul className=' flex flex-wrap ml-auto px-1 text-gray-300 header-menu-items'>
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
