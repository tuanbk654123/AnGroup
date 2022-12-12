import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LisResponse, searchExportPriceDto, exportPrice ,Respone} from "../../models";


export interface ExportPriceState {
    lstRespone: LisResponse<exportPrice>,
    respone: {
        status: number,
        data: string
    }
}

const initialState: ExportPriceState = {
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


const ExportPriceSlice = createSlice({
    name: 'ExportPrice',
    initialState,
    reducers: {
        searchExportPrice(state, action: PayloadAction<searchExportPriceDto>) {

        },
        searchExportPriceSuccess(state, action: PayloadAction<LisResponse<exportPrice>>) {
            state.lstRespone = action.payload;
        },
        addExportPrice (state, action: PayloadAction<exportPrice>){
        },
        
        addExportPriceSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        updateExportPrice (state, action: PayloadAction<exportPrice>){
        },

        updateExportPriceSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        deleteExportPrice (state, action: PayloadAction<string>){
        },

        deleteExportPriceSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        }
    }

})

//Action
export const ExportPriceAction = ExportPriceSlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.ExportPrice.isLoggedIn 
// export const selectIsLogging = (state: any) => state.ExportPrice.logging 

//reducer
export const ExportPriceReducer = ExportPriceSlice.reducer;

export default ExportPriceReducer;