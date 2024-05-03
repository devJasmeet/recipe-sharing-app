import { useState , useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.js'
import './App.css'
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components/index.js';
import { Outlet } from 'react-router-dom';

function App() {

  //  console.log(import.meta.env.VITE_APPWRITE_URL);   vite syntax to use env variables

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally( setLoading(false) )
  },[])

  return !loading ? (
    <div>
      <div className=' w-full min-h-screen flex flex-col ' >
        <Header />
          <div className=" flex-1 "><Outlet  /></div>
        <div className=" flex-shrink-0 " ><Footer  /></div>
      </div>
    </div>
  ) : <p>Loading...</p>
}

export default App
