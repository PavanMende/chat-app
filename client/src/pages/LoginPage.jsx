import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currentState,setCurrentState]=useState('Sign Up')
  const [fullName,setFullName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [bio,setBio]=useState('')
  const [isdataSubmitted,setIsdataSubmitted]=useState(false)  
  const {login}=useContext(AuthContext);
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(currentState==="Sign Up" && !isdataSubmitted){
      setIsdataSubmitted(true)
      return;
    }
    console.log("submitting handle submit")
    login(currentState==="Sign Up"?"signup":"login",{fullName,email,password,bio})
  }
  return (
    <div className='flex min-h-screen bg-cover bg-center items-center justify-center gap-8 sm:justify-evenly 
    max-sm:flex-col backdrop-blur-2xl
    '>
      {/* left */}
      <img src={assets.logo_big} className='w-[min(30vw,250px)]' alt="" />
      {/* right */}
      <form onSubmit={handleSubmit} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg 
      shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center
        '>
          {currentState}
          {isdataSubmitted && 
          <img src={assets.arrow_icon} onClick={()=>setIsdataSubmitted(false)} className='w-5 cursor-pointer' alt="" />
      }
          </h2>
          { currentState==='Sign Up' && !isdataSubmitted && (
          <input type="text" name="" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name'
          required onChange={(e)=>setFullName(e.target.value)} value={fullName} />)
          }
          {
            !isdataSubmitted && (
              <>
                <input type="email" placeholder='Email address' required className='p-2
                border border-gray-500 rounded-md focus:outline-none focus:ring-2
                focus:ring-indigo-500' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder='password' required className='p-2
                border border-gray-500 rounded-md focus:outline-none focus:ring-2
                focus:ring-indigo-500' value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </>
            )
          }
          {
            isdataSubmitted && currentState==="Sign Up" && (
              <textarea rows={4} className='p-2
                border border-gray-500 rounded-md focus:outline-none focus:ring-2
                focus:ring-indigo-500' placeholder='Enter Bio...' required onChange={(e)=>setBio(e.target.value)}
                value={bio}></textarea>
            )
          }
          <button  type='submit' className='py-3 bg-gradient-to-r from-purple-400 
          to-violet-600 text-white rounded-md cursor-pointer'>
            {
              currentState==="Sign Up"?"Create Account" :"Login Now"
            }
          </button>
            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <input type="checkbox"  />
              <p >Agree to the terms of use & privacy policy.</p>
            </div>
            <div className='flex flex-col gap-2'>
              {
                currentState==="Sign Up" ? (
                  <p className='text-sm text-gray-600'>Already have an account <span 
                  className='font-medium text-violet-500 cursor-pointer' onClick={()=>{setCurrentState("Login");setIsdataSubmitted(false)}}>Login</span></p>
                ):(
                  <p className='text-sm text-gray-600'>Create an account <span
                  className='font-medium text-violet-500 cursor-pointer' onClick={()=>{setCurrentState("Sign Up");setIsdataSubmitted(false)}}>Click here</span></p>
                )
              }
            </div>
      </form>
    </div>
  )
}

export default LoginPage
