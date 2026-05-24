import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';
import './App.css'

function App() {
  const [searchText, setsearchText] = useState("")
  const [listMovies, setlsitMovies] = useState(() => {
    let storedMovies = localStorage.getItem("movielist")
    return storedMovies ? JSON.parse(storedMovies) : []
  })
  const [nextExist, setnextExist] = useState(true)
  const [Page, setPage] = useState(1)

  /*--------------------Local Storage------------------*/
  useEffect(() => {
    
    localStorage.setItem("movielist", JSON.stringify(listMovies))
  }, [listMovies])

   /*--------------------Fetch Movies List------------------*/
  async function fetchMovies(searchText, page) {
    let searchUrl = `http://www.omdbapi.com/?apikey=45e8a9e&s=${searchText}&page=${page}`;
    let fetchdata = await fetch(searchUrl);
    let searchResponse = await fetchdata.json();
    //console.log(searchResponse)  an object
    let moviesList = searchResponse.Search;
    console.log(moviesList)
    if(moviesList){
       setlsitMovies(moviesList)
       setnextExist(true);
    }
    else{
      setlsitMovies([])
      setnextExist(false);
    }
    setPage(page);

  }
 /*--------------------Previous Button------------------*/
  const prevPage = (e, currentpage) => {
    let previousPage = currentpage-1;
    fetchMovies(searchText, previousPage)
    setPage(previousPage);
  }
   /*--------------------Next Button------------------*/
  const nextPage = (e, currentpage) => {
    let nextPage = currentpage +1;
    fetchMovies(searchText, nextPage)
    setPage(nextPage);
  }
 /*--------------------Input Text------------------*/
  const MoviesSearchedText = (e) => {
    let MovieName = e.target.value;
    setsearchText(MovieName);
  }


  return (
    <>
    
      <div className='mt-3'>
        <p>Movies Name Here</p>
        <input type="text" value={searchText} onChange={MoviesSearchedText} placeholder='SearchMovies'></input>
        <button disabled={searchText.length < 1} onClick={(e) => { fetchMovies(searchText,Page) }}>Hit Search</button>
      </div>

      <section className='container  border rounded min-vw-90  bg-movie  py-3 mt-5'>
        <div className='row row-cols-lg-3 row-cols-md-4 row-cols-sm-6  row-gap-3 ms-1 column-gap-2  align-content-center'>
                    {listMovies.map((items) => {
            return (
              <div key={items.imdbID} className="card border border-1 border-warning bg-black text-white pt-1" style={{ width: 270 }}>
                <img src={items.Poster} className="card-img-top object-fit-cover " style={{ height: 380 ,width:"auto"}} alt={items.Title}></img>
                <div className="card-body">
                  <h5 className="card-title fs-5 fw-medium
                    text-center">{items.Title}</h5>
                </div>
                <div>
                <ul className="list-group   list-group-flush border-2 border border-warning">
                  <li className="list-group-item text-center text-white bg-dark  fw-medium">Type: {items.Type.toUpperCase()}</li>
                  <li className="list-group-item text-center text-white bg-dark fw-medium">Released: {items.Year}</li>
                </ul>
               
                <div className="card-body d-flex align-content-center justify-content-center">
                  <Link to={`/movies/${items.imdbID}`}><button className='btn btn-outline-warning text-center'>Link</button>
                  </Link>
                   </div>
                </div>
              </div>
                
            )
          })}
           </div> 
      
        <div className="ticks"></div>
        <section id="spacer"></section>

        <div className='d-flex flex-row align-items-center  justify-content-center gap-5'>
          <button disabled={Page <= 1} onClick={(e) => { prevPage(e, Page) }}>prev</button><p className='text-white'>{Page}</p><button disabled={!nextExist} onClick={(e) => { nextPage(e, Page) }}>next</button>
        </div>
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
