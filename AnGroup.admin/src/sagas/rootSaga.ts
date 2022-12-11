import { all } from 'redux-saga/effects';

import { postSearchImportPrice, postAddImportPrice, postDeleteImportPrice, postUpdateImportPrice } from './importPriceSaga';
import { postSearchImportProcess, postAddImportProcess, postDeleteImportProcess, postUpdateImportProcess,postExportBillImportProcess, postExportReportImportProcess } from './importProcessSaga';
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

          //ImportProcess
          postSearchImportProcess(),
          postAddImportProcess(),
          postDeleteImportProcess(),
          postUpdateImportProcess(),
          postExportBillImportProcess(),
          postExportReportImportProcess(),
          //customer
          postSearchCustomer(),
          postAddCustomer(),
          postDeleteCustomer(),
          postUpdateCustomer(),

     ]);
}
