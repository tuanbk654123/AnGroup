import { LisResponse, searchExportProcessDto,exportProcess } from "../models";
import axiosClient from "./axiosClient";


const ExportProcessService = {

    searchExportProcessService( search: searchExportProcessDto): Promise<LisResponse<exportProcess>>{
        const url = '/api/ExportProcess/Search';
        return axiosClient.get(url, {
            params:{
                PageNumber:search.pageNumber,
                PageSize:search.pageSize,
                fromDate: search.fromDate,
                toDate: search.toDate,
            }
        });
    },
    addExportProcesss( lstExportProcesss: exportProcess): Promise<any>{
        const url = '/api/ExportProcess/Create';
        return axiosClient.post(url,lstExportProcesss );
    },

    updateExportProcess( ExportProcess: exportProcess): Promise<any>{
        const url = '/api/ExportProcess/Update';
        return axiosClient.post(url,ExportProcess );
    },

    deleteExportProcesss( id: string): Promise<any>{
        const url = '/api/ExportProcess/Delete';
        return axiosClient.post(url,id );
    },

 

}


export default ExportProcessService;