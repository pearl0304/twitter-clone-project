import React, {ChangeEvent, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

// FIREBASE
import {collection, query, where, getDocs, orderBy} from "firebase/firestore";
import {firebaseAuth, firestoreJob} from "../initFirebase";
import {signOut, updateProfile} from "firebase/auth";

/** Link : 특정 주소로 이동해주는 태그
 * useNavigate : 특정 행동을 했을 때 해당 주소로 이동
 * **/

export const Profile = ({userObj}: any) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState<string>(userObj.displayName ? userObj.displayName : "");
    const onLogOutClick = () => {
        signOut(firebaseAuth).then(() => {
            navigate('/')
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        getMyTweets()
    })
    const getMyTweets = async () => {
        const q = query(collection(firestoreJob, "tweets")
            , where("uid", "==", userObj.uid)
            , orderBy("date_created", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

        })
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        setNewDisplayName(value);
    }

    const onSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, {displayName: newDisplayName})
        }
    }
    return <>
        <form>
            <input type={'text'} placeholder={'Display name'} value={newDisplayName} onChange={onChange}/>
            <input type={'submit'} value={'update Profile'} onSubmit={onSubmit}/>
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
}