import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import BoardWrite from './BoardWrite';
import BoardModify from './BoardModify';
import shibainuImage from './shibainu.png';

const BoardHome = () => {
    return (
        <div className='boardHome'>
            <h1>
                <span>SK React Board</span>
                <img src={shibainuImage} />
            </h1>
            <hr />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<BoardList />} />
                    <Route path='/list' element={<BoardList />} />
                    <Route path='/detail/:id' element={<BoardDetail />} />
                    <Route path='/write' element={<BoardWrite />} />
                    <Route path='/modify/:id' element={<BoardModify />} />                 
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default BoardHome;