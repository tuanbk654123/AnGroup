import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LisResponse, SearchImportReportDto, importReport ,Respone} from "../../models";


export interface ImportReportState {
    lstRespone: LisResponse<importReport>,
    respone: {
        status: number,
        data: string
    }
}

const initialState: ImportReportState = {
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


const ImportReportSlice = createSlice({
    name: 'ImportReport',
    initialState,
    reducers: {
        searchImportReport(state, action: PayloadAction<SearchImportReportDto>) {

        },
        searchImportReportSuccess(state, action: PayloadAction<LisResponse<importReport>>) {
            state.lstRespone = action.payload;
        },
        addImportReport (state, action: PayloadAction<importReport>){
        },
        
        addImportReportSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        updateImportReport (state, action: PayloadAction<importReport>){
        },

        updateImportReportSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        deleteImportReport (state, action: PayloadAction<string>){
        },

        deleteImportReportSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        }
    }

})

//Action
export const ImportReportAction = ImportReportSlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.ImportReport.isLoggedIn 
// export const selectIsLogging = (state: any) => state.ImportReport.logging 

//reducer
export const importReportReducer = ImportReportSlice.reducer;

export default importReportReducer;