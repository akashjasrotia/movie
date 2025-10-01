import React, { useEffect, useState } from 'react'

export default function App() {
  const [movies,setMovies] = useState([]);
  useEffect(()=>{
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=83299b131c8815c7c3224a44a75f643c&page=1')
    .then(res=>res.json())
    .then(data=>setMovies(data.results))
    .catch(error=>console.log(error));
  },[])
  return (
    <div className='w-full h-screen text-white'>
      <div>
        <ul>
        {movies.map((movie)=>(
          <li>{movie.original_title}</li>
        ))}
        </ul>
      </div>
    </div>
  )
}
