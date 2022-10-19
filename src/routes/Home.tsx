import React, {ChangeEvent, useEffect, useState} from "react";
import {firestoreJob} from "../initFirebase";
import {collection, addDoc, getDocs} from "firebase/firestore";
import moment from "moment";

export const Home = () => {
    const db_path = 'tweets';
    const [tweet, setTweet] = useState<string>("");
    const [tweets, setTweets] = useState<string[]>([]);

    useEffect(() => {
        getTweets().then().catch(e => console.log(e));
    }, [])

    const getTweets = async () => {
        const querySnapshot = await getDocs(collection(firestoreJob, db_path));
        querySnapshot.forEach((doc) => {
            const data = {
                ...doc.data(),
                id: doc.id
            }
            // @ts-ignore
            setTweets(prev => [data, ...prev])
        });
    }

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(firestoreJob, db_path), {
                tweet,
                date_crated: moment().utc().format()
            })
            console.log("Document written with ID: ", docRef.id);

        } catch (e) {
            console.error("Error adding document: ", e)
        }
        setTweet("")
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {value} = e.currentTarget;
        setTweet(value);
    }

    return (<div>
        <form onSubmit={onSubmit}>
            <input value={tweet} onChange={onChange} type={'text'} placeholder={"What's on your mind?"}
                   maxLength={140}/>
            <input type={'submit'} value={'tweet'}/>
        </form>
        <div>
        </div>
    </div>)
}