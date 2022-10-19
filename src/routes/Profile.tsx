import React from "react";
import {firebaseAuth} from "../initFirebase";
import {signOut} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
/** Link : 특정 주소로 이동해주는 태그
 * useNavigate : 특정 행동을 했을 때 해당 주소로 이동
 * **/

export const Profile = () => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        signOut(firebaseAuth).then(() => {
            navigate('/')
        }).catch((error) => {
            console.log(error)
        });
    }
    return <>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
}