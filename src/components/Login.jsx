import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'
import {  useDispatch , useSelector } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { Button,Input,FormError } from './index'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register,handleSubmit,formState: { errors }} = useForm({
    defaultValues:{
      email: "chef.1@rcp.com" ,
      password: "12121212" ,
    }
  })
  const [error,setError] = useState('')

  const userLogin = async (data) => {
    setError('')
    try {
      //console.log(data);
      const session = await authService.login(data)
      if(session) {
        const res = await authService.getCurrentUser()
        if(res) {
          const userData = {
            $id:res.$id,
            name:res.name
          }
          console.log(userData);
          dispatch(storeLogin({userData}));  
        }
        navigate("/")
      }
    } catch (error) {
      let errorDisplay = error.message.substring(error.message.indexOf(':') + 1) || error.message
      setError(errorDisplay)
      //console.log(error.message.substring(error.message.indexOf(':') + 1))
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='mx-auto w-full max-w-lg border border-black/10 p-4 rounded-lg'>
        <div className='text-center text-2xl font-bold '>
          <h2>Login to your account</h2>
        </div>
        <p className='text-center my-4 font-medium '><span className=' text-gray-500 font-light '> Don't have an account ?  </span>  <Link to="/signup" >SIGN UP</Link></p>
        { error && <FormError className=' justify-center '>{error}</FormError>}
 
        <form onSubmit={handleSubmit(userLogin)} >
          <div>
            <Input 
              label="Email"
              placeholder="Enter your email"
              type="email"
              className=" text-sm "
              {...register("email" , {
                required:true,
                validate:{
                  matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email must be valid"
                }
              })}
            />
            {errors.email && <FormError>Email is required</FormError>}
            <Input 
              label="Password"
              placeholder="Enter your password"
              type="password"
              className=" text-sm "
              {...register("password" , {required:true})}
            />
            {errors.password && <FormError>Password is required</FormError>}
            <Button type='submit' className="w-full bg-slate-400 my-2 text-black font-semibold hover:bg-gray-600 active:bg-gray-800 focus:ring-2 focus:ring-blue-600 " >Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
