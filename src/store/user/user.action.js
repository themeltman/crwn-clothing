import {createAction} from "../../utils/reducer/reducer.utils";
import {USER_ACTON_TYPES} from "./user.types";

export const setCurrentUser = (user) => createAction(USER_ACTON_TYPES.SET_CURRENT_USER, user)
