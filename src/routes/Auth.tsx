import React, {ChangeEvent, useState} from "react";
// FIREBASE
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {deflateRaw} from "zlib";


type AuthType = {
    email: string,
    password: string
}
export const Auth = () => {
    const [inputs, setInputs] = useState<AuthType>({
        email: "",
        password: ""
    });
    const {email, password} = inputs;
    const [newAccount, setNewAccount] = useState<boolean>(true)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setInputs({...inputs, [name]: value})
    }
    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let data;
            const auth = getAuth()
            if (newAccount) {
                data = createUserWithEmailAndPassword(auth, email, password)
            } else {
                data = signInWithEmailAndPassword(auth, email, password)
            }
            console.log(data)
        } catch (e) {
            console.error(e)
        }
    }

    return <div>
        <form onSubmit={onSubmit}>
            <input placeholder={'Enter your Email address'} name={'email'} value={inputs.email} type={'email'}
                   onChange={onChange}
                   required={true}/>
            <input placeholder={'Enter your Email address'} name={'password'} value={inputs.password} type={'password'}
                   onChange={onChange}
                   required={true}/>
            <input type={'submit'} value={newAccount ? "Create Account" : "Log In"}/>
        </form>
        <div>
            <button>Continue with Google</button>
            <button>Continue with GitHub</button>
        </div>
    </div>
}