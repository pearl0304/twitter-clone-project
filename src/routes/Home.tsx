import React, {ChangeEvent, useEffect, useState} from "react";
import moment from "moment";
import {Tweets} from "../components/Tweets";

// FIREBASE
import {firestoreJob} from "../initFirebase";
import {collection, addDoc, onSnapshot, query, where, orderBy} from "firebase/firestore";


interface TweetInterface {
    id: string,
    uid: string,
    text: string
}

export const Home = ({userObj}: any) => {
    const db_path = 'tweets';
    const [tweet, setTweet] = useState<string>("");
    const [tweets, setTweets] = useState<TweetInterface[]>([]);

    useEffect(() => {
        const q = query(collection(firestoreJob, db_path), orderBy("date_created", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const arr = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            // @ts-ignore
            setTweets(arr)
        });

        return () => {
            unsubscribe()
        }
    }, []);

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(firestoreJob, db_path), {
                uid: userObj.uid,
                text: tweet,
                date_created: moment().utc().format()
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
            {tweets.map((tweet) => <Tweets tweet={tweet} key={tweet.id} is_owner={tweet.uid === userObj.uid}/>
            )}
        </div>
    </div>)
}