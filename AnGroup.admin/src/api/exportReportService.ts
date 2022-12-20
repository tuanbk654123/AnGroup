import { AxiosRequestConfig } from "axios";
import { LisResponse, searchExportReportDto,exportReport, chartExportReport } from "../models";
import axiosClient from "./axiosClient";


const ExportReportService = {

    searchExportReportService( search: searchExportReportDto): Promise<LisResponse<exportReport>>{
        const url = '/api/ExportReport/Search';
        return axiosClient.get(url, {
            params:{
                PageNumber:search.pageNumber,
                PageSize:search.pageSize,
                fromDate: search.fromDate,
                statusExport:search.statusExport,
                toDate: search.toDate,
            }
        });
    },
    addExportReports( lstExportReports: exportReport): Promise<any>{
        const url = '/api/ExportReport/Create';
        return axiosClient.post(url,lstExportReports );
    },

    updateExportReport( ExportReport: exportReport): Promise<any>{
        const url = '/api/ExportReport/Update';
        return axiosClient.post(url,ExportReport );
    },

    deleteExportReports( id: string): Promise<any>{
        const url = '/api/ExportReport/Delete';
        return axiosClient.post(url,id );
    },
    exportReportProcesss( record: any): Promise<any>{
        const url = '/api/ExportReport/ExportStatus';
        const config:AxiosRequestConfig = { responseType: 'blob' };
        const a = {
            id:record.id,
            licenPalates:record.licenPalates,
            nameOwner:record.nameOwner
        }
        return axiosClient.post(url,a,config  );
    },
 
    chartExportReportService( search: searchExportReportDto): Promise<chartExportReport>{
        const url = '/api/ExportReport/ExportChart';
        return axiosClient.get(url, {
            params:{
                fromDate: search.fromDate,
                toDate: search.toDate,
            }
        });
    },
}


export default ExportReportService;