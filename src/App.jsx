import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



import './App.css'

function App() {
  const [searchText, setsearchText] = useState("")
  
  const [listMovies, setlsitMovies] = useState([])
  const [imdb,setImdb]= useState([])
  const [error, setError] = useState("")

  async function fetchMovies(searchText) {
    let searchUrl = `http://www.omdbapi.com/?apikey=45e8a9e&s=${searchText}`;
    let fetchdata = await fetch(searchUrl);
    let searchResponse = await fetchdata.json();
    
    console.log(searchResponse) // an object
    let moviesList = searchResponse.Search;
    console.log(moviesList)
    if(moviesList){
      setlsitMovies(moviesList)
    }
    else{
      setlsitMovies([]);
      let error = searchResponse.Error;
      
    }
  }



  async function fetchImdb(e,imdb) {
    let imdbUrl =`http://www.omdbapi.com/?apikey=45e8a9e&i=${imdb}`;
    let fetchId = await fetch(imdbUrl);
    let imdbResponse = await fetchId.json();
    console.log(imdbResponse)
    setImdb(imdbResponse)
  }
  




  const MoviesSearchedText = (e) => {
    let MovieName = e.target.value;
    setsearchText(MovieName);
  }



  return (
    <>
      <div>
        <input type="text" value={searchText} onChange={MoviesSearchedText} placeholder='SearchMovies'></input>
        <button onClick={(e) => { fetchMovies(searchText) }}>Hit Search</button>
      </div>
     
     <section className='container'>
      <div className='row row-cols-auto'>
      {listMovies.map((items)=>{
        return (
        <div  key={items.imdbID} className="card" style={{width: 250}}>
        <img src={items.Poster} className="card-img-top" alt="items.Title"></img>
          <div className="card-body">
            <h5 className="card-title">{items.Title}</h5>
            <p className="card-text">Some quick example text to ccontent.</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-center">Type: {items.Type.toUpperCase()}</li>
            <li className="list-group-item text-center">Released: {items.Year}</li>
          </ul>
          <div className="card-body">
           
            <a href="#" className="card-link"><button onClick={(e)=>fetchImdb(e,items.imdbID)}>Link</button></a>
            
          </div>
      </div>
      
      )
})}
</div>
</section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
