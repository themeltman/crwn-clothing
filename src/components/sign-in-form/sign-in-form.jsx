import FormInput from "../form-input/form-input";
import {useState} from "react";
import {
    signInUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import './sign-in-form.sytle.scss'
import Button from '../button/button';

const defaultSignInFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [ signInFields, setSignInFields ] = useState(defaultSignInFields)
    const { email, password } = signInFields

    const resetFormFields = () => {
        setSignInFields(defaultSignInFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { user } = await signInUserWithEmailAndPassword(email, password);
            resetFormFields()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setSignInFields({...signInFields, [name]: value})
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup()

    }

    return (
        <div className={'sign-in-container'}>
            <h2>I already have an Account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={'email'} type={'text'} required onChange={handleChange} name={'email'} value={email}/>
                <FormInput label={'password'} type={'password'} required onChange={handleChange} name={'password'} value={password}  autoComplete="on"/>
                <div className={'buttons-container'}>
                    <Button type={'submit'}>Sign In</Button>
                    <Button type={'button'} buttonType={'google'} onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm