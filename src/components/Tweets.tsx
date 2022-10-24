import React, {ChangeEvent, useState} from "react";
import moment from "moment";

// FIREBASE
import {doc, deleteDoc, updateDoc} from "firebase/firestore";
import {firestoreJob} from "../initFirebase";


export const Tweets = ({tweet, is_owner}: any) => {
    const [editing, setEditing] = useState<boolean>(false);
    const [newTweet, setNewTweet] = useState<string>(tweet.text);

    const onDeleteClick = async () => {
        const is_delete = window.confirm('Are you sure you want delete this tweet?');
        if (is_delete) await deleteDoc(doc(firestoreJob, "tweets", tweet.id));
    }
    const toggleEditing = () => setEditing(prevState => !prevState)

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateDoc(doc(firestoreJob, "tweets", tweet.id), {
            text: newTweet,
            date_updated: moment().utc().format()
        });
        setEditing(false);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        setNewTweet(value)
    }

    return (
        <div>
            {editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input type={'text'} onChange={onChange} placeholder={'Edit your Tweets'} value={newTweet}
                                   required={true}/>
                            <input type={'submit'} value={'update'}/>
                        </form>
                        <button onClick={toggleEditing}> Cancel</button>
                    </>


                ) :
                (
                    <>
                        <h4>{tweet.text}</h4>
                        {tweet.imageURL && <img src={tweet.imageURL} width={'50px'} height={'50px'}/>}
                        {is_owner && <>
                          <button onClick={onDeleteClick}>Delete Tweet</button>
                          <button onClick={toggleEditing}>Edit Tweet</button>
                        </>}
                    </>
                )}
        </div>
    )
}