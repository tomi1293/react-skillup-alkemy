import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const Detalle = () => {

    const [movie, setMovie] = useState(null);

    let token = sessionStorage.getItem('tokenAlkemy');
    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');
    
   
    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=31abada1876f2a3461005252b0284753&language=es-ES`;

        axios.get(endPoint)
            .then(resp => {
                const movieData = resp.data;
                setMovie(movieData)
                console.log(movieData)
            })
            .catch( err => {
                console.log('Hubo errores, intenta más tarde');
            })
    }, [movieID]);
    

    return (
        <>
            {!token && <Navigate to="/"/>}
            {!movie && <p>Cargando...</p>}
            {movie &&
                <>
                    <h2>{movie.title}</h2>
                    <div className="row">
                        <div className="col-4">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt={movie.title}/>
                        </div>
                        <div className="col-8">
                            <h5>Fecha de estreno: {movie.release_date}</h5>
                            <h5>Reseña:</h5>
                            <p>{movie.overview}</p>
                            <h5>Rating: {movie.vote_average}</h5>
                            <h5>Géneros:</h5>
                            <ul>
                                {
                                    movie.genres.map( (gen) => <li key={gen.id}>{gen.name}</li>)
                                }
                            </ul>   
                        </div>
                    </div>
                </>
            }
        </>
    )
}
