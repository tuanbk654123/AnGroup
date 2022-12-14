import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LisResponse, searchExportProcessDto, exportProcess ,Respone} from "../../models";


export interface ExportProcessState {
    lstRespone: LisResponse<exportProcess>,
    respone: {
        status: number,
        data: string
    }
}

const initialState: ExportProcessState = {
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


const ExportProcessSlice = createSlice({
    name: 'ExportProcess',
    initialState,
    reducers: {
        searchExportProcess(state, action: PayloadAction<searchExportProcessDto>) {

        },
        searchExportProcessSuccess(state, action: PayloadAction<LisResponse<exportProcess>>) {
            state.lstRespone = action.payload;
        },
        addExportProcess (state, action: PayloadAction<exportProcess>){
        },
        
        addExportProcessSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        updateExportProcess (state, action: PayloadAction<exportProcess>){
        },

        updateExportProcessSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        deleteExportProcess (state, action: PayloadAction<string>){
        },

        deleteExportProcessSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        }
    }

})

//Action
export const ExportProcessAction = ExportProcessSlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.ExportProcess.isLoggedIn 
// export const selectIsLogging = (state: any) => state.ExportProcess.logging 

//reducer
export const ExportProcessReducer = ExportProcessSlice.reducer;

export default ExportProcessReducer;