import { call, put, takeLatest } from 'redux-saga/effects';
import customerService from '../api/customerService';
import { openNotification } from '../components/notice/notification';
import { CustomerAction } from '../features/customer/customerSlice';

import { LisResponse, customer, Respone } from '../models';

function* getSearchCustomerSaga(action : any){
    try {
        const data:LisResponse<customer> = yield call(customerService.searchCustomerService,action.payload);
        yield put(CustomerAction.searchCustomerSuccess(data));
      } catch (error) {
        //handle error
        console.log("Customer history saga error: " + error);
      }
}

export function* postSearchCustomer(){
    yield takeLatest(CustomerAction.searchCustomer.type ,getSearchCustomerSaga);
}



function* getAddCustomerSaga(action : any) {
  try {
    const data : Respone  = yield call(customerService.addCustomers, action.payload);
    console.log(" Customer saga : ", data);
    openNotification(data);
  } catch (error : any) {
    console.log(" Customer saga : ", error);
    openNotification(""+error.response.data);
  }
}

export function* postAddCustomer() {
  yield takeLatest(CustomerAction.addCustomer.type, getAddCustomerSaga);
}

function* getUpdateCustomerSaga(action : any) {
  try {
    const data : Respone  = yield call(customerService.updateCustomer, action.payload);
    openNotification(data);
    yield put(CustomerAction.updateCustomerSuccess(data));
  } catch (error) {
    //handle error
    openNotification("Sửa thất bại");
  }
}

export function* postUpdateCustomer() {
  yield takeLatest(CustomerAction.updateCustomer.type, getUpdateCustomerSaga);
}


function* getDeleteCustomerSaga(action : any) {
  try {
    const data : Respone  = yield call(customerService.deleteCustomers, action.payload);
    yield put(CustomerAction.deleteCustomerSuccess(data));
    openNotification(data);
  } catch (error) {
    //handle error
    openNotification("Xoá thất bại");
  }
}

export function* postDeleteCustomer() {
  yield takeLatest(CustomerAction.deleteCustomer.type, getDeleteCustomerSaga);
}

