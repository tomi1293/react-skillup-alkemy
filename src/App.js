//Librerias
import { Route, Routes } from "react-router-dom";

//Componentes
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Listado } from "./components/Listado";
import { Login } from "./components/Login";
import { Detalle } from "./components/Detalle";
import { Resultados } from "./components/Resultados";

//Styles
import './css/app.css';
import './css/bootstrap.min.css';
import { Favoritos } from "./components/Favoritos";
import { useEffect, useState } from "react";

function App() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
      const favsInLocal = localStorage.getItem('favs');
      
      if(favsInLocal !== null){
          const favsArray = JSON.parse(favsInLocal);
          setFavorites(favsArray);

      }
  }, [])

  const addOrRemoveFromFavs = (e) => {
    const favMovies = localStorage.getItem('favs');

    let tempMoviesInFavs;

    if(favMovies === null){
      tempMoviesInFavs = [];
    }else{
      tempMoviesInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      imgURL,title,overview,
      id: btn.dataset.movieId
    }

    let movieIsInArray = tempMoviesInFavs.find(movie => {
      return  movie.id === movieData.id
    });

    // console.log(movieIsInArray)

    if(!movieIsInArray){
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs',JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      console.log('se agrego la peli');
    }else{
      let moviesLeft = tempMoviesInFavs.filter(movie => {
        return movie.id !== movieData.id
      })
      localStorage.setItem('favs',JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log('se elimino la peli')

    }

  }

  return (
    <>
      <Header favorites={favorites}/>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/listado" element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs}/>}/>
          <Route path="/detalle" element={<Detalle/>}/>
          <Route path="/resultados" element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs}/>}/>
          <Route path="/favoritos" element={<Favoritos favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs} />}/>
        </Routes>
      </div>
      {/* <Footer/> */}
    </>

  );
}

export default App;

// V5 DE REACT ROUTER DOM - VERSIÓN MÁS VIEJA
// <>
//   <Header/>
//   <div className="container mt-3">
//     <Switch>
//       <Route exact path="/" element={Login}/>
//       <Route path="/listado" element={Listado}/>
//       <Route path="/detalle" element={Detalle}/>
//       <Route path="/resultados" element={Resultados}/>
//     </Switch>
//   </div>
//   <Footer/>
// </>