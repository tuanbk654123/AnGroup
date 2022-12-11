import { call, put, takeLatest } from 'redux-saga/effects';
import importReportService from '../api/importReportService';
import { openNotification } from '../components/notice/notification';
import { ImportReportAction } from '../features/importReport/importReportSlice';

import { LisResponse, importReport, Respone } from '../models';

function* getSearchImportReportSaga(action : any){
    try {
        const data:LisResponse<importReport> = yield call(importReportService.searchImportReportService,action.payload);
        yield put(ImportReportAction.searchImportReportSuccess(data));
      } catch (error) {
        //handle error
        console.log("ImportReport history saga error: " + error);
      }
}

export function* postSearchImportReport(){
    yield takeLatest(ImportReportAction.searchImportReport.type ,getSearchImportReportSaga);
}



function* getAddImportReportSaga(action : any) {
  try {
    const data : Respone  = yield call(importReportService.addImportReports, action.payload);

    console.log(" ImportReport saga : ", data);
    openNotification(data);
  } catch (error : any) {
    console.log(" ImportReport saga : ", error);
    openNotification(""+error.response.data);
  }
}

export function* postAddImportReport() {
  yield takeLatest(ImportReportAction.addImportReport.type, getAddImportReportSaga);
}

function* getUpdateImportReportSaga(action : any) {
  try {
    const data : Respone  = yield call(importReportService.updateImportReport, action.payload);
    //openNotification("Sửa thành công");
    openNotification(data);
    yield put(ImportReportAction.updateImportReportSuccess(data));
  } catch (error) {
    //handle error
    openNotification("Sửa thất bại");
  }
}

export function* postUpdateImportReport() {
  yield takeLatest(ImportReportAction.updateImportReport.type, getUpdateImportReportSaga);
}


function* getDeleteImportReportSaga(action : any) {
  try {
    const data : Respone  = yield call(importReportService.deleteImportReports, action.payload);
    yield put(ImportReportAction.deleteImportReportSuccess(data));
    openNotification(data);
  } catch (error) {
    //handle error
    openNotification("Xoá thất bại");
  }
}

export function* postDeleteImportReport() {
  yield takeLatest(ImportReportAction.deleteImportReport.type, getDeleteImportReportSaga);
}

