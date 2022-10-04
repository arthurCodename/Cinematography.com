import React from 'react';
import Search from './Search';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './all.css'
import Movie from './Movie';
import Actor from './Actor';


const App = () => {
    return (
        
            <Routes>
                <Route path="/" element={ <Search /> }></Route>
                <Route path="/movie" element={<Movie/>}></Route>
                <Route path="/actor" element={<Actor/>}></Route>
            </Routes>
        
        
    );
};

export default App;