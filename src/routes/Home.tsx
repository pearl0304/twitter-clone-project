import React, {ChangeEvent, useEffect, useState} from "react";
import moment from "moment";
import {v4} from 'uuid';
import {Tweets} from "../components/Tweets";

// FIREBASE
import {firestoreJob, fireStorage} from "../initFirebase";
import {collection, addDoc, onSnapshot, query, where, orderBy} from "firebase/firestore";
import {ref, uploadString, getDownloadURL} from "firebase/storage";

interface TweetInterface {
    id: string,
    uid: string,
    text: string
}

export const Home = ({userObj}: any) => {
    const db_path = 'tweets';
    const [tweet, setTweet] = useState<string>("");
    const [tweets, setTweets] = useState<TweetInterface[]>([]);
    const [attachment, setAttachment] = useState<string>("");

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
        let attachmentURL = "";
        try {
            if (attachment !== "") {
                const storageRef = ref(fireStorage, `${userObj.uid}/${v4()}`);
                const res = await uploadString(storageRef, attachment, 'data_url');
                attachmentURL = await getDownloadURL(res.ref);
            }

            const data = {
                uid: userObj.uid,
                text: tweet,
                imageURL: attachmentURL,
                date_created: moment().utc().format()
            }

            const docRef = await addDoc(collection(firestoreJob, db_path), data)
            console.log("Document written with ID: ", docRef.id);

            setTweet("")
            setAttachment("")

        } catch (e) {
            console.error("Error adding document: ", e)
        }
        setTweet("")
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {value} = e.currentTarget;
        setTweet(value);
    }

    const onFileChagne = (e: ChangeEvent<HTMLInputElement>) => {
        const {files} = e.currentTarget
        const file: File | null = files ? files[0] : null;
        const fileReader = new FileReader();
        fileReader.onload = (e: ProgressEvent<FileReader>) => {
            const {result}: any = e.currentTarget;
            setAttachment(result)

        }
        // @ts-ignore
        fileReader.readAsDataURL(file);
    }

    const onDeleteFile = () => setAttachment("")

    return (<div>
        <form onSubmit={onSubmit}>
            <input value={tweet} onChange={onChange} type={'text'} placeholder={"What's on your mind?"}
                   maxLength={140}/>
            <input onChange={onFileChagne} type={'file'} accept={'image/*'}/>
            <input type={'submit'} value={'tweet'}/>
            {attachment && (
                <div>
                    <img src={attachment} width={'50px'} height={'50px'}/>
                    <button onClick={onDeleteFile}>X</button>
                </div>
            )}
        </form>
        <div>
            {tweets.map((tweet) => <Tweets tweet={tweet} key={tweet.id} is_owner={tweet.uid === userObj.uid}/>
            )}
        </div>
    </div>)
}