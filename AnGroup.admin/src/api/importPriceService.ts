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

 

}


export default importPriceService;