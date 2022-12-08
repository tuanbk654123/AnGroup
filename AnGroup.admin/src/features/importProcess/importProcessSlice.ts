import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LisResponse, SearchImportProcessDto, importProcess ,Respone} from "../../models";


export interface ImportProcessState {
    lstRespone: LisResponse<importProcess>,
    respone: {
        status: number,
        data: string
    }
}

const initialState: ImportProcessState = {
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


const ImportProcessSlice = createSlice({
    name: 'ImportProcess',
    initialState,
    reducers: {
        searchImportProcess(state, action: PayloadAction<SearchImportProcessDto>) {

        },
        searchImportProcessSuccess(state, action: PayloadAction<LisResponse<importProcess>>) {
            state.lstRespone = action.payload;
        },
        addImportProcess (state, action: PayloadAction<importProcess[]>){
        },
        
        addImportProcessSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        updateImportProcess (state, action: PayloadAction<importProcess>){
        },

        updateImportProcessSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        deleteImportProcess (state, action: PayloadAction<string>){
        },

        deleteImportProcessSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        exportBillImportProcess (state, action: PayloadAction<string>){
        },

        exportBillImportProcessSuccess (state, action: PayloadAction<Blob>){
           // state.respone = action.payload;
            
        }
        
    }

})

//Action
export const ImportProcessAction = ImportProcessSlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.ImportProcess.isLoggedIn 
// export const selectIsLogging = (state: any) => state.ImportProcess.logging 

//reducer
export const importProcessReducer = ImportProcessSlice.reducer;

export default importProcessReducer;