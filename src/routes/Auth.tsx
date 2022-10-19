import React, {ChangeEvent, useState} from "react";
// FIREBASE
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {firebaseAuth} from "../initFirebase";

type AuthType = {
    email: string,
    password: string
}
export const Auth = () => {
    const [inputs, setInputs] = useState<AuthType>({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string>("")

    const {email, password} = inputs;
    const [newAccount, setNewAccount] = useState<boolean>(true)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        setInputs({...inputs, [name]: value})
    }
    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                // 계정 새로 생성
                await createUserWithEmailAndPassword(firebaseAuth, email, password)
                    .then(async user => {
                        console.log('User account created % sign in', user)
                    })
                    .catch(e => {
                        if (e.code === 'auth/email-already-in-use') {setError('Duplicate Email')}
                        if (e.code === 'auth/invalid-email') {setError('Email is not invalid')}
                        if (e.code === 'auth/weak-password') {setError('Please change strong password')}
                    })
            } else {
                // 로그인
                await signInWithEmailAndPassword(firebaseAuth, email, password)

            }
        } catch (e) {
            console.warn(e)
        }
    }

    const toggleAccount = () => {
        setNewAccount(prevState => !prevState)
    }

    return (<div>
        <form onSubmit={onSubmit}>
            <input placeholder={'Enter your Email address'} name={'email'} value={inputs.email} type={'email'}
                   onChange={onChange}
                   required={true}/>
            <input placeholder={'Enter your Email address'} name={'password'} value={inputs.password} type={'password'}
                   onChange={onChange}
                   required={true}/>
            <input type={'submit'} value={newAccount ? "Create Account" : "Log In"}/>
            <span>{error}</span>
        </form>
        <span onClick={toggleAccount}> {newAccount ? "Sign In" : "Create Account"}</span>
        <div>
            <button>Continue with Google</button>
            <button>Continue with GitHub</button>
        </div>
    </div>
    )
}