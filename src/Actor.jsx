import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const ActorStyles = styled.div`

    



    .main{
        background-color: rgb(31,31,31);
        height: 100%;
        width:100%;
    }

    /* .content-ctnr{
        margin:0 10px;
        text-align: center;
    } */
    .content-ctnr{
        margin:0 100px;
        
    }
    .name{
        color: white;
        font-family: 'Roboto', sans-serif;
        font-size: 5rem;
    }

    #profile-photo{
        height: 450px;
        width: 300px;
    }
    .info{
        display: flex;
        flex-direction: row;
        gap: 10px;
        margin-bottom: 40px;
    }
    .text-info{
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: flex-end;
        font-family: 'Roboto', sans-serif; 
        font-size: 1.3rem;
        color: #FFFFFF;
        
    }
    span{
        color: #b6b6b6;
    }
    .biography{
        font-family: 'Roboto', sans-serif; 
        font-size: 1.1rem;
        color: #b6b6b6;
        margin-bottom: 50px;
    }
    .movie-carousel{
        width: 90vw;
        padding-bottom: 50px;
        text-align: center;
    }
    .photo-ctnr> img{
        display: inline-block;
        height: 320px;
        width: 200px;
        
        text-align: center;
        
        
        
    }
    .movie{
        display: inline-block;
        height: 410px;
        width: 300px;
        font-family: 'Roboto', sans-serif; 
        font-size: 2rem;
        color: #FFFFFF;
    }

    .showmore{
        color: white;
        padding: 5px;
        font-weight: 700;
        width: 100%;
    }
    .showmore:hover{
        cursor: pointer;
    }

    @media screen and (max-width: 700px) {
        .info{
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 40px;
        align-items: center;
    }
    .content-ctnr{
        margin:0 10px;
        text-align: center;
    } 
    #profile-photo{
        text-align: center;
    }
    .movie{
        display: inline-block;
        height: 350px;
        width: 250px;
        
        text-align: center;
        
        
        
    }
    }
`

const Actor = () => {
    const api = { 
        key: '914909d674a31ee16a73f58d4a150ba2',
        path: 'https://api.themoviedb.org/3/person/'
        }
    const [actorInfo, setActorInfo] = useState({});
    const [actorMovies, setActorMovies] = useState({});
    const [isLoaded, setLoaded] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
              breakpoint: 1650,
              settings: {
                slidesToShow: 3,
                slidesToScroll:3,
              }

            },

          {
            breakpoint: 1300,
            settings: {
              slidesToShow: 3,
              slidesToScroll:3,
            }

          },

          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              
            },
          },
          {
            breakpoint: 770,
            settings: {
              slidesToShow: 2,
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
    useEffect(
        ()=> {  
            const fetchMovie = async () => {
                const actorGlobal = await axios(
                    `${api.path}${localStorage.getItem('actorID')}?api_key=${api.key}&language=en-US`
                );
                const actormoviesGlobal = await axios(
                    `${api.path}${localStorage.getItem('actorID')}/movie_credits?api_key=${api.key}&language=en-US`
                );
                setActorInfo(actorGlobal.data)
                setActorMovies(actormoviesGlobal.data)
                
                
                console.log('hello')
                setLoaded(true)
                
            }
                fetchMovie();
            }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <ActorStyles>
        <div>
            <Header/>
            <div className='main'>
                <div className='content-ctnr'>
                    <div className='name'>{actorInfo.name}</div>
                    <div className='info'>
                        <img id='profile-photo' src={`https://image.tmdb.org/t/p/original/${actorInfo.profile_path}`} alt='profile'></img>
                        <div className='text-info'>
                            <div>Gender: <span>{actorInfo.gender === 2 ? 'Male' : 'Female' }</span></div>
                            <div>Birthday: <span>{actorInfo.birthday}</span></div>
                            <div>Place of birth: <span>{actorInfo.place_of_birth}</span></div>
                        </div>
                    </div>
                    {isLoaded ?
                    <div className='biography'>Bio: {showMore ? actorInfo.biography : actorInfo.biography.substring(0,300)}
                     <div className='showmore' onClick={() => setShowMore(!showMore)}>
                    {showMore ? "Show less" : "Show more"}
                </div></div> :<div></div>}
                   
                    {console.log(actorMovies)}
                    { isLoaded ?
                    <div className='movie-carousel'>
                        <Slider {...settings}>
                            {actorMovies.cast.slice(0,20).map(function(a, idx){ return(
                                <div className='photo-ctnr'key={idx}>
                                    <Link to="/movie">
                                    <img onClick={e => {localStorage.setItem('movieID',a.id)}} alt="movie" className='movie' src={ `https://image.tmdb.org/t/p/original/${a.poster_path}`}>
                                        </img></Link> </div>)})}
                        </Slider>
                    </div> : <div></div>
                    }
                </div>
            </div>
        </div>
        </ActorStyles>
    );
};

export default Actor;