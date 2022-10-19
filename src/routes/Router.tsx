import React, {useState} from "react";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {Auth} from "./Auth";
import {Home} from "./Home";
import {Profile} from "./Profile";
import {Navigation} from "../components/Navigation";

// @ts-ignore
export const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ? <>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/profile' element={<Profile/>}></Route>

                </> : <Route path='/' element={<Auth/>}></Route>}
            </Routes>
        </Router>
    )
}