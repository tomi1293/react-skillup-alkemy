import { Link, Navigate } from "react-router-dom";

export const Favoritos = ({favorites,addOrRemoveFromFavs}) => {
    let token = sessionStorage.getItem('tokenAlkemy');

    // const [favorites, setFavorites] = useState([]);

    // useEffect(() => {
    //     const favsInLocal = localStorage.getItem('favs');
        
    //     if(favsInLocal !== null){
    //         const favsArray = JSON.parse(favsInLocal);
    //         setFavorites(favsArray);

    //     }
    // }, [])
    

    return (
        <>
            {!token && <Navigate to="/"/>}

            <h2>Sección de Favoritos</h2>
            <div className='row'>
                {!favorites.length && <div className="col-12 alert alert-danger">No tienes películas en favoritos</div>}
                {
                    favorites.map((movie, idx) => {
                        return(
                            <div key={idx} className="col-3">
                                <div className="card my-4" >
                                    <img src={movie.imgURL} className="card-img-top" alt={movie.title}/>
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
