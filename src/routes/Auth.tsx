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
    const {email, password} = inputs;
    const [newAccount, setNewAccount] = useState<boolean>(true)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        setInputs({...inputs, [name]: value})
    }
    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data;
        if (newAccount) {
            // 계정 새로 생성
            data = await createUserWithEmailAndPassword(firebaseAuth, email, password)
            console.log(data)
        } else {
            // 로그인
            data = await signInWithEmailAndPassword(firebaseAuth, email, password)

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