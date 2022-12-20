import { take, call, put, fork } from 'redux-saga/effects';
import { authAction, LoginPayload } from '../features/auth/authSlice';

import { history } from '../utils/history';
import { PayloadAction } from '@reduxjs/toolkit';
import { openNotification } from '../components/notice/notification';

function* handleLogin(payload: LoginPayload) {
    try {
        console.log("handle Login");
        if(payload.username === "admin" && payload.password === "VanAn@2022"){
            localStorage.setItem('access_token', 'Fake');
            yield history.push('home'); 
            yield put(authAction.loginSuccess({
                name: 'admin',
                access_token: "Fake"
            }));
        }
        else{
            openNotification("Sai tài khoản hoặc mật khẩu vui lòng đăng nhập lại");
        }
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
        else{
            yield take(authAction.logout.type);
            yield call(handleLogout);
        }
       
    }
}


export default function* authSaga() {
    yield call(watchLoginFolow);
}

