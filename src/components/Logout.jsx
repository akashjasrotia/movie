import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async ()=>{
        let res = await fetch('http://localhost:3000/logout',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            }
        })
        const data = await res.json();
        if(data.success){
            toast.success(data.message);
            setTimeout(()=>{
                window.location.reload();
            },2000);
        }
        else {
            toast.error('failed to logout')
        }
    }
  return (
    <button onClick={handleClick} className={`hover:bg-gray-300 hover:text-black transition-all duration-400 cursor-pointer font-['poppins'] text-white py-2 px-4 border-2 rounded-full`}>Logout</button>
  )
}
