import { all } from 'redux-saga/effects';

import { postSearchImportPrice, postAddImportPrice, postDeleteImportPrice, postUpdateImportPrice } from './importPriceSaga';

import { postSearchCustomer, postAddCustomer, postDeleteCustomer, postUpdateCustomer } from './customerSaga';
import authSaga, { Logout } from './authSaga';
import { postGetAllRole, postSearchRole, postAddRole, postUpdateRole, postDeleteRole } from './roleSaga';
import { postSearchUserHistory } from './userHistorySaga';
import { postSearchUser, postAddUser, postDeleteUser, postUpdateUser } from './userSaga';

export default function* rootSaga() {
     yield all([ // gọi nhiều saga
          authSaga(),
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
          postSearchImportPrice(),
          postAddImportPrice(),
          postDeleteImportPrice(),
          postUpdateImportPrice(),

          //customer
          postSearchCustomer(),
          postAddCustomer(),
          postDeleteCustomer(),
          postUpdateCustomer(),

     ]);
}
