// import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {Link,Navigate} from 'react-router-dom';
import Swal from 'sweetalert2';

export const Listado = ({addOrRemoveFromFavs}) => {

    let token = sessionStorage.getItem('tokenAlkemy');
    // const navigate = useNavigate();
    /*
        useEffect(() => {
            if (token === null) {
                navigate('/',{
                    replace: true
                })
            }
        }, [token])
    */
    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=31abada1876f2a3461005252b0284753&language=es-ES&sort_by=popularity.desc&page=1';
        axios.get(endPoint)
            .then(resp => {
                const apiData = resp.data.results;
                setMoviesList(apiData);
            })
            .catch( err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            })
    }, [setMoviesList]);

    return (
        <>
            {!token && <Navigate to="/"/>}

            <div className='row'>

                {
                    moviesList.map((movie, idx) => {
                        return(
                            <div key={idx} className="col-3">
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
