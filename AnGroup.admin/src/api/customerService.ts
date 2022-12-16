import { LisResponse, searchCustomerDto,customer } from "../models";
import axiosClient from "./axiosClient";


const customerService = {

    searchCustomerService( search: searchCustomerDto): Promise<LisResponse<customer>>{
        const url = '/api/Garden/Search';
        return axiosClient.get(url, {
            params:{
                PageNumber:search.pageNumber,
                PageSize:search.pageSize,
                NameGarden:search.NameGarden,
                PhoneNumber:search.PhoneNumber,
                fromDate: search.fromDate,
                toDate: search.toDate,
            }
        });
    },
    addCustomers( lstCustomers: customer): Promise<any>{
        const url = '/api/Garden/Create';
        return axiosClient.post(url,lstCustomers );
    },

    updateCustomer( customer: customer): Promise<any>{
        const url = '/api/Garden/Update';
        return axiosClient.post(url,customer );
    },

    deleteCustomers( id: string): Promise<any>{
        const url = '/api/Garden/Delete';
        return axiosClient.post(url,id );
    },

 

}


export default customerService;