import React, {useState} from "react";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {Auth} from "./Auth";
import {Home} from "./Home";

export const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    return (
        <Router>
            <Routes>
                {isLoggedIn ? <>
                    <Route path='/' element={<Home/>}></Route>
                </> : <Route path='/' element={<Auth/>}></Route>}
            </Routes>
        </Router>
    )
}