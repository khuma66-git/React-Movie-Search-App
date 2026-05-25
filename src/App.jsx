import { useState, useEffect } from 'react'
import moviebg from './assets/movie-background.jpg'
import { Link } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';
import './App.css'

function App() {
  const [searchText, setsearchText] = useState("")
  const [loading, setLoading] = useState(false)
  const [listMovies, setlsitMovies] = useState(() => {
    let storedMovies = localStorage.getItem("movielist")
    return storedMovies ? JSON.parse(storedMovies) : []
  })
  const [nextExist, setnextExist] = useState(true)
  const [notFound, setnotFound] = useState("")
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
    
    if (searchResponse.Response ==="True") {
      setlsitMovies(moviesList)
      setnextExist(true);
      setnotFound("")
      setLoading(false)
    }
    else {
      setnotFound("Search Result Not Found")
      setlsitMovies([])
      setnextExist(false);
    }
    setPage(page);

  }
  const onkeyEnter = (e) => {
    if (e.key === "Enter") {
      fetchMovies(searchText, Page)
      setsearchText("")
    }
    else {
      return;
    }
  }
  /*--------------------Previous Button------------------*/
  const prevPage = (e, currentpage) => {
    let previousPage = currentpage - 1;
    fetchMovies(searchText, previousPage)
    setPage(previousPage);
  }
  /*--------------------Next Button------------------*/
  const nextPage = (e, currentpage) => {
    let nextPage = currentpage + 1;
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

      <div className='header-wrapper'>
        <p className='header-title'>Apna Movies Search</p>
        <div className='search-box'>
        <input type="text" value={searchText} onChange={MoviesSearchedText} placeholder='SearchMovies' onKeyDown={onkeyEnter}></input>
        <button disabled={searchText.length < 1} onClick={(e) => { fetchMovies(searchText, Page) }}>Hit Search</button>
        </div>
      </div>

      <section className='container  border rounded min-vw-90  bg-container  py-3 mt-5'>
        <div className='row row-cols-lg-3 row-cols-md-4 row-cols-sm-6  row-gap-3 ms-1 column-gap-2  align-content-center'>
          {listMovies.map((items) => {
            return (
              <div key={items.imdbID} className="card border border-1 border-warning bg-black text-white pt-1" style={{ width: 270 }}>
                <img src={items.Poster !=='N/A'?items.Poster:moviebg} className="card-img-top object-fit-cover" style={{ height: 380, width: "auto" }} alt={`the Poster ${items.Title}  not avalible`}></img>
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
        <span className='text-white fs-2 text-center'>{notFound}</span>
      </section>
       <div className='pagination-bar'>
        <button disabled={Page <= 1} onClick={(e) => { prevPage(e, Page) }}>prev</button>
        <span className='page-number'>{Page}</span>
        <button disabled={!nextExist} onClick={(e) => { nextPage(e, Page) }}>next</button>
      </div>
     

    </>
  )
}

export default App
