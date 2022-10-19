import React, {ButtonHTMLAttributes, ChangeEvent, MouseEvent, useState} from "react";
// FIREBASE
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";
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

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.currentTarget
        setInputs({...inputs, [name]: value})
    }
    const onSubmit = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
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
                        if (e.code === 'auth/email-already-in-use') {
                            setError('Duplicate Email')
                        }
                        if (e.code === 'auth/invalid-email') {
                            setError('Email is not invalid')
                        }
                        if (e.code === 'auth/weak-password') {
                            setError('Please change strong password')
                        }
                    })
            } else {
                // 로그인
                await signInWithEmailAndPassword(firebaseAuth, email, password)

            }
        } catch (e) {
            console.warn(e)
        }
    }

    const toggleAccount = (): void => {
        setNewAccount(prevState => !prevState)
    }
    const onSocialClick = async (e: any) => {
        const {target: {name}} = e;
        if (name === 'google') {
            const googleProvider = new GoogleAuthProvider();
            await signInWithPopup(firebaseAuth, googleProvider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential?.accessToken;
                    const user = result.user;
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    const credential = GoogleAuthProvider.credentialFromError(error)
                    console.error(`${errorCode} - ${errorMessage}`)

                })
        } else if (name === 'github') {
            const githubProvider = new GithubAuthProvider();
            await signInWithPopup(firebaseAuth, githubProvider)
                .then((result) => {
                    const credential = GithubAuthProvider.credentialFromResult(result);
                    const token = credential?.accessToken;
                    const user = result.user;
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    const credential = GithubAuthProvider.credentialFromError(error)
                    console.error(`${errorCode} - ${errorMessage}`)
                })
        }
    }

    return (<div>
            <form onSubmit={onSubmit}>
                <input placeholder={'Enter your Email address'} name={'email'} value={inputs.email} type={'email'}
                       onChange={onChange}
                       required={true}/>
                <input placeholder={'Enter your Email address'} name={'password'} value={inputs.password}
                       type={'password'}
                       onChange={onChange}
                       required={true}/>
                <input type={'submit'} value={newAccount ? "Create Account" : "Log In"}/>
                <span>{error}</span>
            </form>
            <span onClick={toggleAccount}> {newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button name={'google'} onClick={onSocialClick}>Continue with Google</button>
                <button name={'github'} onClick={onSocialClick}>Continue with GitHub</button>
            </div>
        </div>
    )
}