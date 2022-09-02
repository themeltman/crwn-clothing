import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input";
import Button from "../button/button";
import {SignUpContainer} from "./sign-up-form.sytle";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert("Password didn't match")
            return
        }

        try {
            const {user} =  await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields()
        } catch (error) {
            alert(`Can not create account: ${error.message}`)
        }



    }

    const handleChange = (event) => {
        const {name, value}  = event.target;
        setFormFields({...formFields, [name]: value})
    }
    return  (
        <SignUpContainer>
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={'Display Name'} type={'text'} required onChange={handleChange} name={'displayName'} value={displayName}/>
                <FormInput label={'Email'} type={'email'} required onChange={handleChange} name={'email'} value={email}/>
                <FormInput label={'Password'} type={'password'} required onChange={handleChange} name={'password'} value={password} autoComplete="on"/>
                <FormInput label={'Confirm Password'} type={'password'} required onChange={handleChange} name={'confirmPassword'} value={confirmPassword} autoComplete="on"/>
                <Button type={'submit'}>Sign up</Button>
            </form>
        </SignUpContainer>
    )
}
export default SignUpForm