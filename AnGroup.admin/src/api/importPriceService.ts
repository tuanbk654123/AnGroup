import { LisResponse, searchImportPriceDto,importPrice } from "../models";
import axiosClient from "./axiosClient";


const importPriceService = {

    searchImportPriceService( search: searchImportPriceDto): Promise<LisResponse<importPrice>>{
        const url = '/api/ImportPrice/Search';
        return axiosClient.get(url, {
            params:{
                PageNumber:search.pageNumber,
                PageSize:search.pageSize,
                fromDate: search.fromDate,
                toDate: search.toDate,
            }
        });
    },
    addImportPrices( lstImportPrices: importPrice): Promise<any>{
        const url = '/api/ImportPrices/Create';
        return axiosClient.post(url,lstImportPrices );
    },

    updateImportPrice( importPrice: importPrice): Promise<any>{
        const url = '/api/ImportPrices/Update';
        return axiosClient.put(url,importPrice );
    },

    deleteImportPrices( id: string): Promise<any>{
        const url = '/api/ImportPrices/Delete';
        return axiosClient.post(url,id );
    },

 

}


export default importPriceService;