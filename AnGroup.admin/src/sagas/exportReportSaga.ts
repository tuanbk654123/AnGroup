import { call, put, takeLatest } from 'redux-saga/effects';
import exportReportService from '../api/exportReportService';
import { openNotification } from '../components/notice/notification';
import { ExportReportAction } from '../features/exportReport/exportReportSlice';

import { LisResponse, exportReport, Respone, chartExportReport } from '../models';

function* getSearchexportReportSaga(action : any){
    try {
        const data:LisResponse<exportReport> = yield call(exportReportService.searchExportReportService,action.payload);
        yield put(ExportReportAction.searchExportReportSuccess(data));
      } catch (error) {
        //handle error
        console.log("exportReport history saga error: " + error);
      }
}

export function* postSearchExportReport(){
    yield takeLatest(ExportReportAction.searchExportReport.type ,getSearchexportReportSaga);
}



function* getAddexportReportSaga(action : any) {
  try {
    const data : Respone  = yield call(exportReportService.addExportReports, action.payload);

    console.log(" exportReport saga : ", data);
    openNotification(data);
  } catch (error : any) {
    console.log(" exportReport saga : ", error);
    openNotification(""+error.response.data);
  }
}

export function* postAddExportReport() {
  yield takeLatest(ExportReportAction.addExportReport.type, getAddexportReportSaga);
}

function* getUpdateexportReportSaga(action : any) {
  try {
    const data : Respone  = yield call(exportReportService.updateExportReport, action.payload);
    //openNotification("Sửa thành công");
    openNotification(data);
    yield put(ExportReportAction.updateExportReportSuccess(data));
  } catch (error) {
    //handle error
    openNotification("Sửa thất bại");
  }
}

export function* postUpdateExportReport() {
  yield takeLatest(ExportReportAction.updateExportReport.type, getUpdateexportReportSaga);
}


function* getDeleteExportReportSaga(action : any) {
  try {
    const data : Respone  = yield call(exportReportService.deleteExportReports, action.payload);
    yield put(ExportReportAction.deleteExportReportSuccess(data));
    openNotification(data);
  } catch (error) {
    //handle error
    openNotification("Xoá thất bại");
  }
}

export function* postDeleteExportReport() {
  yield takeLatest(ExportReportAction.deleteExportReport.type, getDeleteExportReportSaga);
}


function* getExportReportExportReport(action : any) {
  try {
    const data : Blob  = yield call(exportReportService.exportReportProcesss, action.payload);
    yield put(ExportReportAction.exportReportExportProcessSuccess(data));
   
    //var csvURL = window.URL.createObjectURL(data);   
    const href = URL.createObjectURL(data);
     // create "a" HTML element with href to file & click
     const link = document.createElement('a');
     link.href = href;
     link.setAttribute('download', 'Report.xlsx'); //or any other extension
     document.body.appendChild(link);
     link.click();
 
     // clean up "a" element & remove ObjectURL
     document.body.removeChild(link);
     URL.revokeObjectURL(href);
    //  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    openNotification("Xuất báo cáo thành công");
  } catch (error) {
    //handle error
    openNotification("Export thất bại");
  }
}

export function* postExportReportExportReport() {
  yield takeLatest(ExportReportAction.exportReportExportProcess.type, getExportReportExportReport);
}



function* getChartexportReportSaga(action : any){
  try {
      const data:chartExportReport = yield call(exportReportService.chartExportReportService,action.payload);
      yield put(ExportReportAction.chartExportReportSuccess(data));
    } catch (error) {
      //handle error
      console.log("exportReport history saga error: " + error);
    }
}

export function* postChartExportReport(){
  yield takeLatest(ExportReportAction.chartExportReport.type ,getChartexportReportSaga);
}


