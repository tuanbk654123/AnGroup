import { all } from 'redux-saga/effects';
import { postSearchImportReport, postAddImportReport, postDeleteImportReport, postUpdateImportReport } from './importReportSaga';
import { postSearchExportPrice, postAddExportPrice, postDeleteExportPrice, postUpdateExportPrice } from './exportPriceSaga';
import { postSearchImportPrice, postAddImportPrice, postDeleteImportPrice, postUpdateImportPrice } from './importPriceSaga';
import { postSearchImportProcess, postAddImportProcess, postDeleteImportProcess, postUpdateImportProcess, postExportBillImportProcess, postExportReportImportProcess } from './importProcessSaga';
import { postSearchCustomer, postAddCustomer, postDeleteCustomer, postUpdateCustomer } from './customerSaga';
import authSaga, { Logout } from './authSaga';
import { postGetAllRole, postSearchRole, postAddRole, postUpdateRole, postDeleteRole } from './roleSaga';
import { postSearchUserHistory } from './userHistorySaga';
import { postSearchUser, postAddUser, postDeleteUser, postUpdateUser } from './userSaga';
import { postAddExportProcess, postDeleteExportProcess, postExportReportExportProcess, postSearchExportProcess, postUpdateExportProcess } from './exportProcessSaga';
import { postAddExportReport, postDeleteExportReport, postExportReportExportReport, postSearchExportReport, postUpdateExportReport } from './exportReportSaga';
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

          //ImportPrice
          postSearchImportReport(),
          postAddImportReport(),
          postDeleteImportReport(),
          postUpdateImportReport(),
          //ExportPrice
          postSearchExportPrice(),
          postAddExportPrice(),
          postDeleteExportPrice(),
          postUpdateExportPrice(),

          //ExportProcess
          postSearchExportProcess(),
          postAddExportProcess(),
          postDeleteExportProcess(),
          postUpdateExportProcess(),
          postExportReportExportProcess(),

          //ExportReport
          postSearchExportReport(),
          postAddExportReport(),
          postDeleteExportReport(),
          postUpdateExportReport(),
          postExportReportExportReport(),
     ]);
}
