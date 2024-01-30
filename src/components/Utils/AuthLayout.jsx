import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Loader} from "../index"
function AuthLayout({children,authentication=true}) {
  const authStatus = useSelector(state=>state.auth.status);
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();
  useEffect(()=>{
    setLoader(true)
    if(authentication && authentication!==authStatus){
      // 1 && 1!=0->(true && true)
      navigate("/login")
    }else if(!authentication &&  authentication!==authStatus){
      // 0 && 0!=1-->(1&&1) 
      navigate("/")
    }
    setLoader(false);
  },[authStatus,navigate,authentication])
  return loader?<h1 className='placeholder-glow'><Loader/></h1>:<>{children}</>
}

export default AuthLayout