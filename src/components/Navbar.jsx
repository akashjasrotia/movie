import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className='w-full z-[100] fixed top-0 left-0 flex justify-center text-white items-center py-4 font-["poppins"]'>
        <div className="md:hidden flex w-full px-20 justify-between">
            <NavLink to='/' className={({isActive})=> `text-xl ${isActive ? '':'text-gray-400'}`}>Home</NavLink>
            <NavLink className={({isActive})=>`text-xl ${isActive ? '':'text-gray-400'}`} to={'/mymovies'}>My movies</NavLink>
        </div>
    </div>
  )
}
