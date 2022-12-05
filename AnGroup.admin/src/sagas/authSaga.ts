import { take, call, put, fork } from 'redux-saga/effects';
import { authAction, LoginPayload } from '../features/auth/authSlice';

import { history } from '../utils/history';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleLogin(payload: LoginPayload) {
    try {
        console.log("handle Login");
        localStorage.setItem('access_token', 'Fake');
        yield history.push('home'); 
        yield put(authAction.loginSuccess({
            name: 'admin',
            access_token: "sdfdf111"
        }));
        
    }
    catch (error) {
        //yield put(authAction.loginFalse(error.message));
    }


}


function* handleLogout() {

    console.log("handle logout");
    localStorage.removeItem('access_token');

    //yield put(push('/login'));
    yield history.push('login'); 
}

export function* Logout() {
    yield take(authAction.logout.type);
    yield call(handleLogout);
}


function* watchLoginFolow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(authAction.login.type);
            yield fork(handleLogin, action.payload);

        }


        yield take(authAction.logout.type);
        yield call(handleLogout);
    }
}


export default function* authSaga() {
    yield call(watchLoginFolow);
}

