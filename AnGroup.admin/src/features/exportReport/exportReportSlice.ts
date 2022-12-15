import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LisResponse, searchExportReportDto, exportReport ,Respone} from "../../models";


export interface ExportReportState {
    lstRespone: LisResponse<exportReport>,
    respone: {
        status: number,
        data: string
    }
}

const initialState: ExportReportState = {
    lstRespone: {
        pageIndex: 0,
        totalItem: 0,
        content: []
    },
    respone: {
        status: 0,
        data: ""
    }
};


const ExportReportSlice = createSlice({
    name: 'ExportReport',
    initialState,
    reducers: {
        searchExportReport(state, action: PayloadAction<searchExportReportDto>) {

        },
        searchExportReportSuccess(state, action: PayloadAction<LisResponse<exportReport>>) {
            state.lstRespone = action.payload;
        },
        addExportReport (state, action: PayloadAction<exportReport>){
        },
        
        addExportReportSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        updateExportReport (state, action: PayloadAction<exportReport>){
        },

        updateExportReportSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        deleteExportReport (state, action: PayloadAction<string>){
        },

        deleteExportReportSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },
        exportReportExportProcess (state, action: PayloadAction<any>){
            
        },
        exportReportExportProcessSuccess (state, action: PayloadAction<Blob>){

        }
    }

})

//Action
export const ExportReportAction = ExportReportSlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.ExportReport.isLoggedIn 
// export const selectIsLogging = (state: any) => state.ExportReport.logging 

//reducer
export const ExportReportReducer = ExportReportSlice.reducer;

export default ExportReportReducer;