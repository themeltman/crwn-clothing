import {USER_ACTON_TYPES} from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case  USER_ACTON_TYPES.SET_CURRENT_USER:
            return {
                ...state,  // This is not need, but shows how it would be used
                currentUser: payload
            }
        default:
            return state
    }
}
