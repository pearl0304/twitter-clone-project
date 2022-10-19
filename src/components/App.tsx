import React, {useEffect, useState} from 'react';
import {AppRouter} from "../routes/Router";

// FIREBASE
import {firebaseAuth} from "../initFirebase";
import {onAuthStateChanged} from "firebase/auth";

export default function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                // @ts-ignore
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        })
    }, [])
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
        </>

    );
}
