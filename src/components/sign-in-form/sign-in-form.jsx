import FormInput from "../form-input/form-input";
import {useState} from "react";
import {
    signInUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import Button, {BUTTON_TYPE_CLASSES} from '../button/button';
import {ButtonsContainer, SignInContainer} from "./sign-in-form.sytle";

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
        <SignInContainer>
            <h2>I already have an Account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={'email'} type={'text'} required onChange={handleChange} name={'email'} value={email}/>
                <FormInput label={'password'} type={'password'} required onChange={handleChange} name={'password'} value={password}  autoComplete="on"/>
                <ButtonsContainer>
                    <Button type={'submit'}>Sign In</Button>
                    <Button type={'button'} buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm