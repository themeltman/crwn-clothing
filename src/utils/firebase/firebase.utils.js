import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
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
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = (await getDoc(userDocRef))
    if (!userSnapshot.exists()) {
        const  { displayName, email } = userAuth
        const createAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            })
        }
        catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef
}