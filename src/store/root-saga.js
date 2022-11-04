import { all, call } from 'redux-saga/effects'
import {categoriesSaga} from "./catagories/category.saga";
import {userSagas} from "./user/user.safa";

export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSagas)])
}