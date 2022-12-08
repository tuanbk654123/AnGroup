import { call, put, takeLatest } from 'redux-saga/effects';
import importProcessService from '../api/importProcessService';
import { openNotification } from '../components/notice/notification';
import { ImportProcessAction } from '../features/importProcess/importProcessSlice';

import { LisResponse, importProcess, Respone } from '../models';

function* getSearchImportProcessSaga(action : any){
    try {
        const data:LisResponse<importProcess> = yield call(importProcessService.searchImportProcessService,action.payload);
        yield put(ImportProcessAction.searchImportProcessSuccess(data));
      } catch (error) {
        //handle error
        console.log("ImportProcess history saga error: " + error);
      }
}

export function* postSearchImportProcess(){
    yield takeLatest(ImportProcessAction.searchImportProcess.type ,getSearchImportProcessSaga);
}



function* getAddImportProcessSaga(action : any) {
  try {
    const data : Respone  = yield call(importProcessService.addImportProcesss, action.payload);

    console.log(" ImportProcess saga : ", data);
    openNotification(data);
  } catch (error : any) {
    console.log(" ImportProcess saga : ", error);
    openNotification(""+error.response.data);
  }
}

export function* postAddImportProcess() {
  yield takeLatest(ImportProcessAction.addImportProcess.type, getAddImportProcessSaga);
}

function* getUpdateImportProcessSaga(action : any) {
  try {
    const data : Respone  = yield call(importProcessService.updateImportProcess, action.payload);
    //openNotification("Sửa thành công");
    openNotification(data);
    yield put(ImportProcessAction.updateImportProcessSuccess(data));
  } catch (error) {
    //handle error
    openNotification("Sửa thất bại");
  }
}

export function* postUpdateImportProcess() {
  yield takeLatest(ImportProcessAction.updateImportProcess.type, getUpdateImportProcessSaga);
}


function* getDeleteImportProcessSaga(action : any) {
  try {
    const data : Respone  = yield call(importProcessService.deleteImportProcesss, action.payload);
    yield put(ImportProcessAction.deleteImportProcessSuccess(data));
    openNotification(data);
  } catch (error) {
    //handle error
    openNotification("Xoá thất bại");
  }
}

export function* postDeleteImportProcess() {
  yield takeLatest(ImportProcessAction.deleteImportProcess.type, getDeleteImportProcessSaga);
}

function* getExportBillImportProcess(action : any) {
  try {
    const data : Blob  = yield call(importProcessService.exportImportProcesss, action.payload);
    yield put(ImportProcessAction.exportBillImportProcessSuccess(data));
   
    //var csvURL = window.URL.createObjectURL(data);   
    const href = URL.createObjectURL(data);
     // create "a" HTML element with href to file & click
     const link = document.createElement('a');
     link.href = href;
     link.setAttribute('download', 'Bill.xlsx'); //or any other extension
     document.body.appendChild(link);
     link.click();
 
     // clean up "a" element & remove ObjectURL
     document.body.removeChild(link);
     URL.revokeObjectURL(href);
    //  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    openNotification("Xuất hoá đơn thành công");
  } catch (error) {
    //handle error
    openNotification("Export thất bại");
  }
}

export function* postExportBillImportProcess() {
  yield takeLatest(ImportProcessAction.exportBillImportProcess.type, getExportBillImportProcess);
}


