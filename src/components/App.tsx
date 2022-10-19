import React, {useEffect, useState} from 'react';
import {AppRouter} from "../routes/Router";
import {firebaseAuth} from "../initFirebase";
import {onAuthStateChanged} from "firebase/auth";

export default function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            user ? setIsLoggedIn(true) : setIsLoggedIn(false);
            setInit(true);
        })
    }, [])
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."}
        </>

    );
}
