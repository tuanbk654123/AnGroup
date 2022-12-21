import { call, put, takeLatest } from 'redux-saga/effects';
import importPriceService from '../api/importPriceService';
import { openNotification } from '../components/notice/notification';
import { ImportPriceAction } from '../features/importPrice/importPriceSlice';

import { LisResponse, importPrice, Respone } from '../models';

function* getSearchImportPriceSaga(action : any){
    try {
        const data:LisResponse<importPrice> = yield call(importPriceService.searchImportPriceService,action.payload);
        yield put(ImportPriceAction.searchImportPriceSuccess(data));
      } catch (error) {
        //handle error
        console.log("ImportPrice history saga error: " + error);
      }
}

export function* postSearchImportPrice(){
    yield takeLatest(ImportPriceAction.searchImportPrice.type ,getSearchImportPriceSaga);
}



function* getAddImportPriceSaga(action : any) {
  try {
    const data : Respone  = yield call(importPriceService.addImportPrices, action.payload);

    console.log(" ImportPrice saga : ", data);
    openNotification(data);
  } catch (error : any) {
    console.log(" ImportPrice saga : ", error);
    openNotification(""+error.response.data);
  }
}

export function* postAddImportPrice() {
  yield takeLatest(ImportPriceAction.addImportPrice.type, getAddImportPriceSaga);
}

function* getUpdateImportPriceSaga(action : any) {
  try {
    const data : Respone  = yield call(importPriceService.updateImportPrice, action.payload);
    //openNotification("Sửa thành công");
    openNotification(data);
    yield put(ImportPriceAction.updateImportPriceSuccess(data));
  } catch (error:any) {
    //handle error
    openNotification(""+error.response.data);
  }
}

export function* postUpdateImportPrice() {
  yield takeLatest(ImportPriceAction.updateImportPrice.type, getUpdateImportPriceSaga);
}


function* getDeleteImportPriceSaga(action : any) {
  try {
    const data : Respone  = yield call(importPriceService.deleteImportPrices, action.payload);
    yield put(ImportPriceAction.deleteImportPriceSuccess(data));
    openNotification(data);
  } catch (error) {
    //handle error
    openNotification("Xoá thất bại");
  }
}

export function* postDeleteImportPrice() {
  yield takeLatest(ImportPriceAction.deleteImportPrice.type, getDeleteImportPriceSaga);
}

