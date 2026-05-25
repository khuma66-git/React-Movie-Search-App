import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import './movieDetails.css'

const MovieDetail = () => {
    const params = useParams();
    const [id, setid] = useState(params.id)
    const [movieDetail, setmovieDetail] = useState({})

    useEffect(() => {
        async function fetchImdb(id) {
            let imdbUrl = `http://www.omdbapi.com/?apikey=45e8a9e&i=${id}`;
            let fetchId = await fetch(imdbUrl);
            let imdbResponse = await fetchId.json();
            setmovieDetail(imdbResponse);
            console.log(imdbResponse)

        }
        fetchImdb(id);

    }, [])


    return (

        <div className='container'>

            <div className="header-wrapper text-center">
                <div className="col p-4 d-flex flex-column position-static">
                    <h3 className="mb-2">{movieDetail.Title}</h3>
                    <div className="mb-1 ">Released : {movieDetail.Released}</div>
                    <p className="mb-auto">Languages : {movieDetail.Language}</p>

                </div>
            </div>
                        
                
            <div className='row bg-movie-dark g-0 border border-5 border-black rounded overflow-hidden'>
              <div className='col-1'></div>
              <div className="col-5 ms-3 my-5">
                    <img className=" shadow " src={movieDetail.Poster} alt={movieDetail.title}></img>
                </div>
                <div className="col-5  border border-2 text-center fs-6 text-white border-warning my-5">
                    <p className=" border-bottom border-2 border-warning py-2 my-2" >Genre : {movieDetail.Genre}</p>
                    <p className="border-bottom border-2 border-warning py-2" >RunTime : {movieDetail.Runtime}</p>
                    <p className=" border-bottom border-2 border-warning py-2" >Type : {movieDetail.Type}</p>
                    <p className=" border-2 border-warning " >Actors : {movieDetail.Actors}</p>
                <hr className='border border-2 border-warning'></hr>
                <h4 className=''>Ratings</h4>
                <hr className='border border-2 border-warning'></hr>
                <div className=' ms-3'>{movieDetail.Ratings?.map((items)=>{
                    return  (<p key = {items.Source}>  {items.Source} Rating: {items.Value} 
                    </p>
                    )
                })}</div>
                </div>

        </div>
        </div>




    )
}

export default MovieDetail
