import FormInput from "../form-input/form-input";
import {useState} from "react";
import {createUserDocumentFromAuth, signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import './sign-in-form.sytle.scss'
import Button from "../button/button";
const SignInForm = () => {

    const defaultSignInFields = {
        email: '',
        password: ''
    }

    const [ signInFields, setSignInFields ] = useState(defaultSignInFields)
    const { email, password } = signInFields

    const resetFormFields = () => {
        setSignInFields(defaultSignInFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            resetFormFields()
        } catch (error) {

        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setSignInFields({...signInFields, [name]: value})
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }

    return (
        <div>

            <h2>I already have an Account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={'email'} type={'text'} required onChange={handleChange} name={'email'} value={email}/>
                <FormInput label={'password'} type={'password'} required onChange={handleChange} name={'password'} value={password}  autoComplete="on"/>
                <Button type={'submit'}>SIGN IN</Button>
                <Button buttonType={'google'} onClick={signInWithGoogle}>Google sign in</Button>
            </form>
        </div>
    )
}

export default SignInForm