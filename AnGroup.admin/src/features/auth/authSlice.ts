import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserLogin } from "../../models";


export interface AuthState{
    isLoggedIn: boolean;
    logging: boolean;
    currentUser?: UserLogin;
}
export interface LoginPayload{
    username: string;
    password: string;
}

const initialState : AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,
  };
  

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login(state, action: PayloadAction<LoginPayload>){
            state.logging = true;
            state.isLoggedIn = true;
            
        },
        loginSuccess(state, action: PayloadAction<UserLogin>){
            state.logging = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
            // localStorage.setItem('access_token', action.payload.access_token);
            // localStorage.setItem('user_name', action.payload.profile.name);
            // setAuthHeader(action.payload.access_token)
            // console.log("authslice: ",action.payload.access_token);
        },
        loginFalse(state, action: PayloadAction<string>){
            state.logging = false;
            state.isLoggedIn = false;
        },
        logout(state){
            //state.logging = false;
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
        // storeUser(user){

        // }
    }

})

//Action
export const authAction = authSlice.actions;

//selecttor
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn 
export const selectIsLogging = (state: any) => state.auth.logging 
//export const selectIscurrentUser = (state: any) => state.auth.currentUser 

//reducer
export const authReducer = authSlice.reducer;

export default authReducer;