import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDRqxdWlgyxYuOI9_2POHY_bNgTOGw7IZw",
    authDomain: "can-clothing-db.firebaseapp.com",
    projectId: "can-clothing-db",
    storageBucket: "can-clothing-db.appspot.com",
    messagingSenderId: "770426546914",
    appId: "1:770426546914:web:efe1e537d3f21ae1d94cbb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
})
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = (await getDoc(userDocRef))
    if (!userSnapshot.exists()) {
        const  { displayName, email } = userAuth
        const createAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation
            })
        }
        catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password)=> {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}