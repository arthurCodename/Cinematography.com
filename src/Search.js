import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import bg from './assets/background.jpg'
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

const api = { 
  key: '914909d674a31ee16a73f58d4a150ba2',
  path1: 'https://api.themoviedb.org/3/search/',
  path2: 'https://api.themoviedb.org/3/trending/'}

const SearchPage = styled.div`
  .App{
    background-color: black;
  }
  img{
    height: 300px;
    width: 200px;
  }
  .main{
    text-align: center;
    
  }    
  .grid-container {
    
    display: inline-grid;
    max-width: 1200px;
    margin: 20px auto;
    gap: 100px;
    
    
}
@media (min-width: 600px) {
  .grid-container { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .grid-container { grid-template-columns: repeat(3, 1fr); }
}
  
  .srch-bar{
    text-align: center;
    padding-top: 10px;
  }
  input{
    width: 50%;
    border: none;
    background-color: rgb(211,211,211);
    height:40px;
    border-radius: 20px;
    padding-left: 20px;
  }
  *:focus {
    outline: none;
}
`  
  
function Search() {
    const [searchValue, setSearch] = useState('');
    const [movie, setMovie] = useState({});
    const [trmovies, setTrending] = useState({});
    const [isLoaded, setLoaded] = useState(false);
    const [loadtrend, setLoadTrend] = useState(true);

    useEffect(
      ()=> {  
          const fetchMovie = async () => {
              const trendingMovies = await axios(
                  `${api.path2}/movie/week?api_key=${api.key}`
              );

              setTrending(trendingMovies.data);
              console.log(trendingMovies);
              setLoadTrend(true);
              
          }
              fetchMovie();
          }, [1])
      

    function displayMessage(event) {
      if (event.key === "Enter"){
        let query = encodeURIComponent(searchValue)
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api.key}&language=en-US&query=${query}&page=1&include_adult=true`)
        .then(res => res.json())
        .then(result => {
          setMovie(result)
          setLoaded(true)
          console.log(result.results)
          setLoadTrend(false);
        })
      } 
    }

  return (
    <SearchPage>
      <Header/>
    <div className="App">
      <div className="main">
      <div className="srch-bar">
      <input
             
             type="text"
             placeholder="Enter the name of the movie"
             onChange={e => setSearch(e.target.value)}
             onKeyPress={displayMessage}/>
      </div>
      {console.log(loadtrend)}
      <div>
      <If condition={loadtrend === true && isLoaded===false}>
        <Then>
        <div className="grid-container">{trmovies.results?.map(function(d,idx){
          return (<div className="grid-cnr" key={idx}><li><Link to ="/movie"><img className="grid-item" onClick={e => {localStorage.setItem('movieID',d.id)}} src ={` https://image.tmdb.org/t/p/original/${d.poster_path}`} ></img></Link></li></div>)
        })}</div>
        </Then>
        <ElseIf condition={isLoaded===true && loadtrend === false}>
          
        <div className="grid-container">{movie.results?.map(function(d,idx){
          return (<div className="grid-cnr" key={idx}><li><Link to ="/movie"><img className="grid-item" onClick={e => {localStorage.setItem('movieID',d.id)}} src ={` https://image.tmdb.org/t/p/original/${d.poster_path}`} ></img></Link></li></div>)
        })}</div>
        
        </ElseIf>
        <Else>
          <div>hemlo</div>
        </Else>
      </If>
      </div>
      {/* {isLoaded ? <div className="grid-container">{movie.results.map(function(d,idx){
          return (<div className="grid-cnr" key={idx}><li><Link to ="/movie"><img className="grid-item" onClick={e => {localStorage.setItem('movieID',d.id)}} src ={` https://image.tmdb.org/t/p/original/${d.poster_path}`} ></img></Link></li></div>)
        })}</div> : <div>hello</div>} */}
        {/* { isLoaded ? <div className="grid-container">{movie.results.map(function(d,idx){
          return (<div className="grid-cnr" key={idx}><li><Link to ="/movie"><img className="grid-item" onClick={e => {localStorage.setItem('movieID',d.id)}} src ={` https://image.tmdb.org/t/p/original/${d.poster_path}`} ></img></Link></li></div>)
        })}</div> : <div>No movie selected </div>} */}
      </div>
    </div>
    </SearchPage>
  );
}

export default Search;
