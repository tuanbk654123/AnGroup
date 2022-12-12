import { LisResponse, searchExportPriceDto,exportPrice } from "../models";
import axiosClient from "./axiosClient";


const ExportPriceService = {

    searchExportPriceService( search: searchExportPriceDto): Promise<LisResponse<exportPrice>>{
        const url = '/api/ExportPrice/Search';
        return axiosClient.get(url, {
            params:{
                PageNumber:search.pageNumber,
                PageSize:search.pageSize,
                fromDate: search.fromDate,
                toDate: search.toDate,
            }
        });
    },
    addExportPrices( lstExportPrices: exportPrice): Promise<any>{
        const url = '/api/ExportPrice/Create';
        return axiosClient.post(url,lstExportPrices );
    },

    updateExportPrice( ExportPrice: exportPrice): Promise<any>{
        const url = '/api/ExportPrice/Update';
        return axiosClient.post(url,ExportPrice );
    },

    deleteExportPrices( id: string): Promise<any>{
        const url = '/api/ExportPrice/Delete';
        return axiosClient.post(url,id );
    },

 

}


export default ExportPriceService;