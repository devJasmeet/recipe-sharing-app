import React, { useState,useReducer } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { Button,Input } from './index'

function SignUp() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState('')

    const userSignUp = async (data) => {
        setError('')
        //console.log(data);
        try {
            const session = await authService.createAccount(data);
            if(session){
                const userData = authService.getCurrentUser()
                if(userData){
                    dispatch(storeLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            let errorDisplay = error.message.substring(error.message.indexOf(':') + 1) || error.message
            setError(errorDisplay)
        }
    }

    return (
        <div className='flex items-center justify-center'>
        <div className='mx-auto w-full max-w-lg border border-black/10 p-4 rounded-lg' >
            <div className='text-center text-2xl font-bold '><h2>Sign up to create account</h2></div>
            <p className='text-center my-4 font-medium '>
                <span className=' text-gray-500 font-light '>Already have an account? Go to </span>
                <Link to="/login">LOGIN</Link>
            </p>
            { error && <p className='text-center text-red-600  text-sm ' >{error}</p>}
        
            <form onSubmit={handleSubmit(userSignUp)} >
                <div>
                    <Input
                        label="Name"
                        placeHolder="Enter full name"
                        type="text"
                        className=" text-sm "
                        {...register("name" , {required:true})}
                    />  
                    <Input 
                        label="Email"
                        placeHolder="Enter your email"
                        type="email"
                        className=" text-sm "
                        {...register("email" , {
                        required:true,
                        validate:{
                            matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email must be valid"
                        }
                        })}
                    />
                    <Input 
                        label="Password"
                        placeHolder="Enter your password"
                        type="password"
                        className=" text-sm "
                        {...register("password" , {required:true})}
                    />
                    
                    <Button type='submit' className="w-full bg-slate-400 my-2 text-black font-semibold">Create Account</Button>
                </div>
            </form>
          </div>
        </div>
      )
}

export default SignUp
