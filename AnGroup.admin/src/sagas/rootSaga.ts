import { all } from 'redux-saga/effects';
import {  Login, Logout  } from './authSaga'; 
import { postSearchImportPrice } from './importPriceSaga';
import {  postGetAllRole,postSearchRole, postAddRole,postUpdateRole,postDeleteRole  } from './roleSaga'; 
import {  postSearchUserHistory } from './userHistorySaga'; 
import {  postSearchUser,postAddUser, postDeleteUser,postUpdateUser  } from './userSaga'; 

export default function* rootSaga() {
     yield all([ // gọi nhiều saga
     Login(),
     Logout(),

     // user
     postSearchUser(),
     postAddUser(),
     postDeleteUser(),
     postUpdateUser(),

     //role
     postGetAllRole(),
     postSearchRole(),
     postAddRole(),
     postUpdateRole(),
     postDeleteRole(),

     // history 
     postSearchUserHistory(),

     //ImportPrice
     postSearchImportPrice()
     ]);
}
