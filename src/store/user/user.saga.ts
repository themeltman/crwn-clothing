import { all, takeLatest, call, put} from 'typed-redux-saga/macro'
import {USER_ACTION_TYPES} from "./user.types";
import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, sigOutUser, AdditionalInformation
} from "../../utils/firebase/firebase.utils";
import {
    EmailSignInStart,
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    SignUpStart,
    SignUpSuccess,
    signUpSuccess
} from "./user.action";
import {User} from "firebase/auth";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails)
        if (userSnapshot) {
            yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser)
        if (!userAuth) return
        yield* call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signInWithEmail(payload: EmailSignInStart) {
    const {
    payload: {
        email, password
    }
} = payload
    try {
        const userCredential = yield* call(
            signInUserWithEmailAndPassword,
            email,
            password
        );

        if (userCredential) {
            const { user } = userCredential;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}


export function* signInWithGoogle() {
    try {
        const {user} = yield* call(signInWithGooglePopup)
        yield* call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signUp(payload: SignUpStart) {
    const {payload: {email, password, displayName}} = payload
    try {
        const userCredential =  yield* call(createAuthUserWithEmailAndPassword, email, password)
        if (userCredential) {
            const {user} = userCredential
            yield* put(signUpSuccess(user, {displayName}))
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error))

    }
}

export function* signInAfterSignUp(payload: SignUpSuccess) {
    const {
        payload:
            {
                user, additionalDetails
            }
    } = payload
    try {
        yield* call(getSnapshotFromUserAuth, user, additionalDetails)
    } catch (error) {
        yield* put(signUpFailed(error as Error))
    }
}

export function* signOut() {
    try {
        yield* call(sigOutUser)
        yield* put(signOutSuccess())
    } catch (error) {
        yield* put(signOutFailed(error as Error))
    }
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ])
}