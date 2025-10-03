import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const container = useRef(null);

  useGSAP(() => {
    if (!container.current) return;

    let ctx = gsap.context(() => {
      gsap.from(container.current, {
        opacity: 0,
        x:20,
        duration: 0.3,
      });
    });
    return ()=>ctx.revert();
  }, [index]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
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

    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % movies.length;
        setSelected(movies[newIndex]);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [movies]);

  const handleNext = () => {
    const newIndex = (index + 1) % movies.length;
    setIndex(newIndex);
    setSelected(movies[newIndex]);
  };

  const handlePrev = () => {
    const newIndex = (index - 1 + movies.length) % movies.length;
    setIndex(newIndex);
    setSelected(movies[newIndex]);
  };

  return (
    <div className="w-full h-screen font-['poppins'] text-white">
      {selected && (
        <div
          ref={container}
          className="relative w-full h-screen flex justify-center items-center"
        >
          <div
            onClick={handleNext}
            className="border-2 z-10 border-white/60 rounded-full p-4 absolute right-10 top-1/2 -translate-y-[200%] hover:border-white/90 cursor-pointer"
          >
            <ChevronRight className="text-white" size={30} />
          </div>
          <div
            onClick={handlePrev}
            className="border-2 z-10 border-white/60 rounded-full p-4 absolute left-10 top-1/2 -translate-y-[200%] hover:border-white/90 cursor-pointer"
          >
            <ChevronLeft className="text-white" size={30} />
          </div>

          <div className="absolute w-full h-screen bg-gradient-to-t from-black to-transparent" />
          <div className="absolute w-full h-screen bg-gradient-to-b from-black/60 to-transparent" />

          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original${selected.backdrop_path}`}
            alt={selected.original_title}
          />

          <div className="absolute bottom-20 left-10 flex gap-10">
            <img
              className="h-[30vh] w-[40vw] lg:w-[12vw] lg:h-[17vw] rounded-xl"
              src={`https://image.tmdb.org/t/p/w500${selected.poster_path}`}
              alt={selected.title}
            />
            <div>
              <h1 className="mt-10 md:mt-0 text-4xl lg:text-6xl mb-10 font-bold">{selected.title}</h1>
              <p className="hidden md:block text-gray-300 w-[40vw] mb-10">
                {selected.overview}
              </p>
              <p className="text-2xl mb-8">⭐️ {selected.vote_average}</p>
              <p className="text-gray-300">
                Release date : {selected.release_date}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
