import { call, put, takeLatest } from 'redux-saga/effects';
import importPriceService from '../api/importPriceService';
import { ImportPriceAction } from '../features/importPrice/historySlice';

import { LisResponse, importPrice } from '../models';

function* getSearchImportPriceSaga(action : any){
    try {
        const data:LisResponse<importPrice> = yield call(importPriceService.searchImportPriceService,action.payload);
        yield put(ImportPriceAction.searchImportPriceSuccess(data));
      } catch (error) {
        //handle error
        console.log("user history saga error: " + error);
      }
}

export function* postSearchImportPrice(){
    yield takeLatest(ImportPriceAction.searchImportPrice.type ,getSearchImportPriceSaga);
}

