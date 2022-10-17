import React, {ChangeEvent, useState} from "react";

export const Auth = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        name === 'email' ? setEmail(value) : setPassword(value);
    }
    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return <div>
        <form>
            <input placeholder={'Enter your Email address'} name={'email'} type={'email'} onChange={onChange}
                   required={true}/>
            <input placeholder={'Enter your Email address'} name={'password'} type={'password'} onChange={onChange}
                   required={true}/>
            <input type={'submit'} value={'Log In'}/>
        </form>
        <div>
            <button>Continue with Google</button>
            <button>Continue with GitHub</button>
        </div>
    </div>
}