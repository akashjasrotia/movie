import { useEffect, useState } from "react";
export default function Movies() {
  const [movies, setMovies] = useState([]);
    const [selected, setSelected] = useState(null);
  
    useEffect(() => {
      fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=83299b131c8815c7c3224a44a75f643c&page=1"
      )
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
          setSelected(data.results[0]);
        })
        .catch((error) => console.log(error));
    }, []);
  
    useEffect(() => {
      if (movies.length === 0) return;
  
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % movies.length;
        setSelected(movies[index]);
      }, 2000);
  
      return () => clearInterval(interval);
    }, [movies]);
  
    return (
      <div className="w-full h-screen text-white">
          {selected && (
            <div className="relative w-full h-screen flex justify-center items-center">
                <div className="absolute w-full h-screen bg-linear-to-t from-black to-transparent"/>
              <img
                className="w-full h-full"
                src={`https://image.tmdb.org/t/p/original${selected.backdrop_path}`}
                alt={selected.original_title}
              />
              <h1 className="text-6xl absolute bottom-20 left-10">{selected.original_title}</h1>
            </div>
          )}
      </div>
    );
}