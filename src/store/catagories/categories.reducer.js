import {CATEGORIES_ACTION_TYPES} from "./categories.types";

const CATAGORIES_INITIAL_STATE = {
    categoriesMap: []
}

export const categoriesReducer = (state = CATAGORIES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action

    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return {
                ...state,
                categoriesMap: payload
            }
        default:
            return state
    }
}