import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LisResponse, searchImportPriceDto, importPrice ,Respone} from "../../models";


export interface ImportPriceState {
    lstRespone: LisResponse<importPrice>,
    respone: {
        status: number,
        data: string
    }
}

const initialState: ImportPriceState = {
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


const ImportPriceSlice = createSlice({
    name: 'ImportPrice',
    initialState,
    reducers: {
        searchImportPrice(state, action: PayloadAction<searchImportPriceDto>) {

        },
        searchImportPriceSuccess(state, action: PayloadAction<LisResponse<importPrice>>) {
            state.lstRespone = action.payload;
        },
        addImportPrice (state, action: PayloadAction<importPrice>){
        },
        
        addImportPriceSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        updateImportPrice (state, action: PayloadAction<importPrice>){
        },

        updateImportPriceSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        deleteImportPrice (state, action: PayloadAction<string>){
        },

        deleteImportPriceSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        }
    }

})

//Action
export const ImportPriceAction = ImportPriceSlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.ImportPrice.isLoggedIn 
// export const selectIsLogging = (state: any) => state.ImportPrice.logging 

//reducer
export const importPriceReducer = ImportPriceSlice.reducer;

export default importPriceReducer;