import { call, put, takeLatest } from 'redux-saga/effects';
import exportProcessService from '../api/exportProcessService';
import { openNotification } from '../components/notice/notification';
import { ExportProcessAction } from '../features/exportProcess/exportProcessSlice';

import { LisResponse, exportProcess, Respone } from '../models';

function* getSearchexportProcessSaga(action : any){
    try {
        const data:LisResponse<exportProcess> = yield call(exportProcessService.searchExportProcessService,action.payload);
        yield put(ExportProcessAction.searchExportProcessSuccess(data));
      } catch (error) {
        //handle error
        console.log("exportProcess history saga error: " + error);
      }
}

export function* postSearchExportProcess(){
    yield takeLatest(ExportProcessAction.searchExportProcess.type ,getSearchexportProcessSaga);
}



function* getAddexportProcessSaga(action : any) {
  try {
    const data : Respone  = yield call(exportProcessService.addExportProcesss, action.payload);

    console.log(" exportProcess saga : ", data);
    openNotification(data);
  } catch (error : any) {
    console.log(" exportProcess saga : ", error);
    openNotification(""+error.response.data);
  }
}

export function* postAddExportProcess() {
  yield takeLatest(ExportProcessAction.addExportProcess.type, getAddexportProcessSaga);
}

function* getUpdateexportProcessSaga(action : any) {
  try {
    const data : Respone  = yield call(exportProcessService.updateExportProcess, action.payload);
    //openNotification("Sửa thành công");
    openNotification(data);
    yield put(ExportProcessAction.updateExportProcessSuccess(data));
  } catch (error) {
    //handle error
    openNotification("Sửa thất bại");
  }
}

export function* postUpdateExportProcess() {
  yield takeLatest(ExportProcessAction.updateExportProcess.type, getUpdateexportProcessSaga);
}


function* getDeleteExportProcessSaga(action : any) {
  try {
    const data : Respone  = yield call(exportProcessService.deleteExportProcesss, action.payload);
    yield put(ExportProcessAction.deleteExportProcessSuccess(data));
    openNotification(data);
  } catch (error) {
    //handle error
    openNotification("Xoá thất bại");
  }
}

export function* postDeleteExportProcess() {
  yield takeLatest(ExportProcessAction.deleteExportProcess.type, getDeleteExportProcessSaga);
}

