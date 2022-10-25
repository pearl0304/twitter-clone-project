import React from "react";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {Auth} from "./Auth";
import {Home} from "./Home";
import {Profile} from "./Profile";
import {Navigation} from "../components/Navigation";

// @ts-ignore
export const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? <>
                    <Route path='/' element={<Home userObj={userObj}/>}></Route>
                    <Route path='/profile' element={<Profile userObj={userObj}/>}></Route>

                </> : <Route path='/' element={<Auth/>}></Route>}
            </Routes>
        </Router>
    )
}