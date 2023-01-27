import { initializeApp } from 'firebase/app'
import {
    User,
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    NextOrObserver
} from 'firebase/auth'
import {
    QueryDocumentSnapshot,
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'
import {Category} from "../../store/catagories/categories.types";

const firebaseConfig = {
    apiKey: "AIzaSyDRqxdWlgyxYuOI9_2POHY_bNgTOGw7IZw",
    authDomain: "can-clothing-db.firebaseapp.com",
    projectId: "can-clothing-db",
    storageBucket: "can-clothing-db.appspot.com",
    messagingSenderId: "770426546914",
    appId: "1:770426546914:web:efe1e537d3f21ae1d94cbb"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
})
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
export const db = getFirestore()

export type ObjectToAdd = {
    title: string
}
export const addCollectionAndDocuments = async <T extends ObjectToAdd> (collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })
    await batch.commit()
    console.log("Batch done")
}

export type AdditionalInformation = {
    displayName?: string,
}

export type UserData = {
    createdAt: Date
    displayName: string
    email: string
}

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation = {} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> => {

    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)
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
            console.log('error creating the user', error)
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>
}

export const createAuthUserWithEmailAndPassword = async (email:string, password:string)=> {
    if (!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInUserWithEmailAndPassword = async (email: string, password:string) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
}

export const sigOutUser = () => {
    signOut(auth)
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //     const  { title, items } = docSnapshot.data()
    //     acc[title.toLowerCase()] = items
    //     return acc
    // }, {})
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category)
}

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback)

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe =
            onAuthStateChanged(auth, (userAuth) => {
                    unsubscribe()
                    resolve(userAuth)
                },
                reject
            )
    })
}
