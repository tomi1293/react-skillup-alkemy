import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Link, Navigate, useSearchParams } from "react-router-dom";

export const Resultados = ({addOrRemoveFromFavs}) => {

    let token = sessionStorage.getItem('tokenAlkemy');
    
    //Usando el hook useSearchParams() logro que el componente se dispare cada vez que cambia la query
    // const query = new URLSearchParams(window.location.search);
    const [query]= useSearchParams();
    let keyword = query.get('keyword'); 
    
    // console.log(query);

    const [moviesResuls, setMoviesResuls] = useState([]);
    
    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=31abada1876f2a3461005252b0284753&language=es-ES&query=${keyword}`;
        
        axios.get(endPoint)
            .then(resp => {
                const moviesArray = resp.data.results;
                if(moviesArray.length === 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Tu búsqueda no arrojó resultados',
                    });
                }
                console.log('Llamado a la API')
                setMoviesResuls(moviesArray);
            })
            .catch( err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            })

    }, [keyword])


    return (
        <>
            {!token && <Navigate to="/"/>}

            <h2>Buscaste: {keyword}</h2>
            {moviesResuls.length === 0 && <h3>No hay resultados</h3>}
            <div className='row'>
                {
                    moviesResuls.map((movie, idx) => {
                        return(
                            <div key={idx} className="col-4">
                                <div className="card my-4" >
                                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt={movie.title}/>
                                    <button 
                                        className='favourite-btn'
                                        onClick={addOrRemoveFromFavs}
                                        data-movie-id={movie.id}
                                    >
                                        🖤 
                                    </button>
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title.substring(0,30)}...</h5>
                                        <p className="card-text">{movie.overview.substring(0,100)}</p>
                                        <Link to={`/detalle?movieID=${movie.id}`} className="btn btn-primary">View detail</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                } 
            </div>
        </>
    )
}
