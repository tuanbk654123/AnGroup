import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LisResponse, searchCustomerDto, customer ,Respone} from "../../models";


export interface CustomerState {
    lstRespone: LisResponse<customer>,
    respone: {
        status: number,
        data: string
    }
}

const initialState: CustomerState = {
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


const CustomerSlice = createSlice({
    name: 'Customer',
    initialState,
    reducers: {
        searchCustomer(state, action: PayloadAction<searchCustomerDto>) {

        },
        searchCustomerSuccess(state, action: PayloadAction<LisResponse<customer>>) {
            state.lstRespone = action.payload;
        },
        addCustomer (state, action: PayloadAction<customer>){
        },
        
        addCustomerSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        updateCustomer (state, action: PayloadAction<customer>){
        },

        updateCustomerSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        deleteCustomer (state, action: PayloadAction<string>){
        },

        deleteCustomerSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        }
    }

})

//Action
export const CustomerAction = CustomerSlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.Customer.isLoggedIn 
// export const selectIsLogging = (state: any) => state.Customer.logging 

//reducer
export const customerReducer = CustomerSlice.reducer;

export default customerReducer;