import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import axios from 'axios';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import prev from './assets/prev-arrow.png'
import next from './assets/next-arrow.png'

const MoviePage = styled.div`
html,
body {
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
}

    .backdrop{
        background-color: rgb(31,31,31);
        height: 100%;
        width:100%;
    }

    /* .photo-ctnr{
        margin: 0 7vw;
    } */

    .cover-photo{
        height: 30em;
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        background-size: cover;
        background-position: center;
        
    }

    .title{
        color: white;

        font-family: 'Roboto', sans-serif;
        font-size: 5rem;
    }
    .details-ctnr{
        display: flex;
        flex-direction: column;
        gap: 50px;
        margin: 30px 20px;
        font-family: 'Roboto', sans-serif; 
        font-size: 1rem;
        color: #FFFFFF;
        
        
    }
    .left{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .right{
        display: flex;
        flex-direction: column;
        gap: 20px;
        z-index: 1;
        scrollbar-width: thin;
        overflow-y:auto;
        width:400px;
        height: 60vh;
        float:left;
    }
    .genres{
        display: flex;
        flex-direction: row;
        gap: 20px;
    }

    .genre{
        border: 1px solid white;
        padding: 5px;
        border-radius: 25px;
    }
    #overview{
        width: auto;
        margin-left: 20px;
    }
    .vote{
        margin-left: 20px;
    }
    .vote > span{
        color: #b6b6b6;
    }
    .directors{
        margin-left: 10px;
        display: flex;
        flex-direction: row;
        gap:10px;
        width: 20vw;
    }
    .actor-ctnr{
        width: 100%;
        height: 120px;
        background-color: black;
        display:flex;
        flex-direction: row;
        border-radius: 10px;
        float:left;
    }

    .actor-img>img{
        width: 100%;
        height: 100%;
        background-color: black;
        position: relative;
    }

    .actor-info{
        display: flex;
        flex-direction: column;
        gap: 30px;
        color: black;
        font-family: 1.2rem;
        justify-content: flex-end;
    }

  
    .slick-slide > div {
  margin: 0 auto;
  text-align: center;
}
.slick-slide > .video{
    width: 400px;
    max-width: 400px;
}
.slick-list {
  margin: 0 0px;
  text-align:center;
}
.slick-prev:before{
/* background-color: blue !important; */
width: 50px;
height: 50px;
content: '' !important;
position: absolute;
top: -21px;
left: -11px;
background-image: url(${prev});
background-repeat: no-repeat;
vertical-align: middle;
background-size: 31px;
opacity: 1 !important;
}

.slick-next:before{
/* background-color: blue !important; */
width: 50px;
height: 50px;
content: '' !important;
position: absolute;
top: -21px;
left: -30px;
background-image: url(${next});
background-repeat: no-repeat;
vertical-align: middle;
background-size: 31px;
opacity: 1 !important;
}
.card {
  height: 250px;
  width:250px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
    
  background-size: cover;
  text-align: center;
}

    .card-top>div{
        overflow: hidden;
        display: inline-block;
        height: 250px;
        width:250px;
        background-position: 50% 50%;
        background-size: cover;
        border-radius: 50%;
        object-fit: cover;
    }
    .card-bottom {
        margin: 10px 20px;
        color: black;
        font-family: "Roboto", sans-serif;
    }
    .text-bottom{
        color:black;
    }
    .carousel{
        width: 100%;
    }
    .carousel-upper{
        background: white;
    }
    .carousel-ctnr1{
        padding: 25px 0;
        margin: 0 0;
        display: flex;
        flex-direction: row;
        
        justify-content: center;
    }
    .video-section{
        background-color: white;
    }
    .video-carousel{
        padding: 25px 0px;
        width: 95vw;
        margin-left: 40px;
        
    }
    .player-wrapper{
        height: auto !important;
        aspect-ratio: 16/9;
        
    }
    .video>div{
        display: inline-block;
    }
    #info-text{
        color:white;
        font-size: 1.7rem;
        padding-left: 20px;
        font-family: "Roboto", sans-serif;
        width:94vw;
        background: rgb(31,31,31);
    }
    @media screen and (max-width: 800px) {
    .video-carousel {
    margin-left: 0px;
    text-align: center;
  }

  
}

@media screen and (max-width: 800px) {
    .video-carousel {
    
  }
  
}
    
`  


const Movie = () => {

    
    const api = { 
        key: '914909d674a31ee16a73f58d4a150ba2',
        path: 'https://api.themoviedb.org/3/movie/'
        }
    
        
        const settings1 = {
          dots: false,
          infinite: false,
          speed: 500,
          slidesToShow: 6,
          slidesToScroll: 3,
          initialSlide: 0,
          
          responsive: [
            {
                breakpoint: 1650,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll:3,
                }
  
              },

            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 4,
                slidesToScroll:3,
              }

            },

            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
                
              },
            },
            {
              breakpoint: 770,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
                initialSlide: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        };

        const settings2 = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 0,
            responsive: [
              {
                  breakpoint: 1650,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll:1,
                  }
    
                },
  
              {
                breakpoint: 1300,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll:1,
                }
  
              },
  
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: true,
                  
                },
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 2,
                  initialSlide: 2,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ],
          };
  

  

    function roundtoKM(value){
        value = value + ' '
        let len = value.length;
        let sym = len>6? 'M' : 'K';
        let hundred = (len===9||len===6);
        if (len>3){
            return value.slice(0,-3)+(hundred?'':'.'+value.charAt(1))+sym;
        }
        
    }
    const [movie, setMovie] = useState({});
    const [isLoaded, setLoaded] = useState(false);
    const [credits, setCredits] = useState({});
    const [videos, setVideos ] = useState({});

    useEffect(
        ()=> {  
            const fetchMovie = async () => {
                const movieGlobal = await axios(
                    `${api.path}${localStorage.getItem('movieID')}?api_key=${api.key}&language=en-US`
                );
                const castGlobal = await axios(
                    `${api.path}${localStorage.getItem('movieID')}/credits?api_key=${api.key}&language=en-US`
                );
                const videoGlobal = await axios(
                    `${api.path}${localStorage.getItem('movieID')}/videos?api_key=${api.key}&language=en_US`
                );
                setMovie(movieGlobal.data);
                setCredits(castGlobal.data);
                setVideos(videoGlobal.data);
                setLoaded(true);
                
                console.log(movieGlobal);
                console.log('hello')
                console.log(castGlobal)
                
            }
                fetchMovie();
            }, [1])// eslint-disable-line react-hooks/exhaustive-deps
        
        return (
            
            <MoviePage>
            <div>
            <Header/>
                <div className="backdrop">
                <div className='cover-photo' style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")` }} >
                    <div className="title">{movie.original_title}</div>
                </div> 
                
                <div className='details-ctnr'>
                    
                    <div className="left">
                        { isLoaded ? <div className ="genres">{movie.genres.map(function(d,idx){
                        return (<span className='genre'  key={idx}>{d.name}</span>)
                        })}</div> : <div>no</div>}
                        <div>Overview:</div>
                        <div id="overview">  {movie.overview}</div>
                        <div>Vote:</div>
                            <div className="vote"> <FaStar/> {Math.round((movie.vote_average + Number.EPSILON) * 100) / 100}<span> / 10 ({roundtoKM(movie.vote_count * 10)})</span></div>
                        <div>Directors:</div>
                        {isLoaded ?<div className='directors'>{credits.crew.filter(x => x.known_for_department === "Directing").slice(0,2)
                        .map(function(d, idx){
                        return ( <span  key = {idx}>{d.name}</span>)
                        })}</div> : <div></div>}
                        
                    </div>
                    </div>
                    <div id='info-text'>Top Cast:</div>
                    <div className='carousel-upper'>
                    <div className='carousel-ctnr1'>
                        {isLoaded ?
                        <Slider {...settings1} className="carousel">
                            {console.log(videos)}
                            {credits.cast.slice(0,50).map(function(c, idx){ return(
                                <div className='card' key={idx}>
                                    <Link to = '/actor'>
                                    <div className='card-top' >
                                    <div onClick={e => {localStorage.setItem('actorID',c.id)}} style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${c.profile_path}")`}}></div>
                                    </div>
                                    <div className="card-bottom">
                                        <div className='text-bottom'>{c.name}</div>
                                        <span>{c.character}</span>
                                        
                                    </div>
                                    </Link>
                                </div>)
                            })}
                        </Slider> : <div></div>}
                        </div>
                        </div>
                        <div id='info-text'>Videos:</div>
                        <div className='video-section'>
                            <div className='video-carousel'>
                                {isLoaded ?
                                    <Slider {...settings2}>
                                        {videos.results.slice(0, 10).map(function(v,idx){ return (
                                            <div className='video' key={idx}>
                                                <ReactPlayer 
                                                className="player-wrapper"
                                                url = {`http://www.youtube.com/watch?v=${v.key}`}
                                                width='370px'
                                                height='270px'
                                                controls
                                                />
                                            </div>
                                        )})}
                                    </Slider>
                                 : <div></div>}
                            </div>
                        </div>
                    
                </div>
                
            </div>
            </MoviePage>
        );
        
      };



export default Movie;