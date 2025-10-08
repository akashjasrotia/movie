import React, { useEffect } from 'react'
import Movies from '../components/movies'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate();
  const movie = async ()=>{
    const res = await fetch('http://localhost:3000/isLoggedIn',{
      method:'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json',
      }
    })
    const data = await res.json();
    if(data.success !== true){
      navigate('/login');
    }
  }
  useEffect(()=>{
    movie();
  },[])
  return (
    <div className='w-full h-screen'>
      <Movies/>
    </div>
  )
}
