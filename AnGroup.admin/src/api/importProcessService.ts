import { AxiosRequestConfig } from "axios";
import { LisResponse, SearchImportProcessDto,importProcess } from "../models";
import axiosClient from "./axiosClient";


const importProcessService = {

    searchImportProcessService( search: SearchImportProcessDto): Promise<LisResponse<importProcess>>{
        const url = '/api/ImportProcess/Search';
        return axiosClient.get(url, {
            params:{
                PageNumber:search.pageNumber,
                PageSize:search.pageSize,
                statusBill: search.statusBill,
                fromDate: search.fromDate,
                toDate: search.toDate,
            }
        });
    },
    addImportProcesss( lstImportProcesss: importProcess[]): Promise<any>{
        const url = '/api/ImportProcess/CreateList';
        return axiosClient.post(url,lstImportProcesss );
    },

    updateImportProcess( importProcess: importProcess): Promise<any>{
        const url = '/api/ImportProcess/Update';
        return axiosClient.post(url,importProcess );
    },

    deleteImportProcesss( id: string): Promise<any>{
        const url = '/api/ImportProcess/Delete';
        return axiosClient.post(url,id );
    },

    exportImportProcesss( id: string): Promise<any>{
        const url = '/api/ImportProcess/ExportBill';
        const config:AxiosRequestConfig = { responseType: 'blob' };
        return axiosClient.post(url,id,config  );
    },
    exportReportProcesss( date: string): Promise<any>{
        const url = '/api/ImportProcess/ExportReport';
        const config:AxiosRequestConfig = { responseType: 'blob' };
        return axiosClient.post(url,date,config  );
    },
}


export default importProcessService;