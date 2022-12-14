import { call, put, takeLatest } from 'redux-saga/effects';
import exportPriceService from '../api/exportPriceService';
import { openNotification } from '../components/notice/notification';
import { ExportPriceAction } from '../features/exportPrice/exportPriceSlice';

import { LisResponse, exportPrice, Respone } from '../models';

function* getSearchexportPriceSaga(action : any){
    try {
        const data:LisResponse<exportPrice> = yield call(exportPriceService.searchExportPriceService,action.payload);
        yield put(ExportPriceAction.searchExportPriceSuccess(data));
      } catch (error) {
        //handle error
        console.log("exportPrice history saga error: " + error);
      }
}

export function* postSearchExportPrice(){
    yield takeLatest(ExportPriceAction.searchExportPrice.type ,getSearchexportPriceSaga);
}



function* getAddexportPriceSaga(action : any) {
  try {
    const data : Respone  = yield call(exportPriceService.addExportPrices, action.payload);

    console.log(" exportPrice saga : ", data);
    openNotification(data);
  } catch (error : any) {
    console.log(" exportPrice saga : ", error);
    openNotification(""+error.response.data);
  }
}

export function* postAddExportPrice() {
  yield takeLatest(ExportPriceAction.addExportPrice.type, getAddexportPriceSaga);
}

function* getUpdateexportPriceSaga(action : any) {
  try {
    const data : Respone  = yield call(exportPriceService.updateExportPrice, action.payload);
    //openNotification("Sửa thành công");
    openNotification(data);
    yield put(ExportPriceAction.updateExportPriceSuccess(data));
  } catch (error) {
    //handle error
    openNotification("Sửa thất bại");
  }
}

export function* postUpdateExportPrice() {
  yield takeLatest(ExportPriceAction.updateExportPrice.type, getUpdateexportPriceSaga);
}


function* getDeleteExportPriceSaga(action : any) {
  try {
    const data : Respone  = yield call(exportPriceService.deleteExportPrices, action.payload);
    yield put(ExportPriceAction.deleteExportPriceSuccess(data));
    openNotification(data);
  } catch (error) {
    //handle error
    openNotification("Xoá thất bại");
  }
}

export function* postDeleteExportPrice() {
  yield takeLatest(ExportPriceAction.deleteExportPrice.type, getDeleteExportPriceSaga);
}

