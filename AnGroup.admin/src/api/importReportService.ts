import { LisResponse, SearchImportReportDto,importReport } from "../models";
import axiosClient from "./axiosClient";


const importReportService = {

    searchImportReportService( search: SearchImportReportDto): Promise<LisResponse<importReport>>{
        const url = '/api/ImportReport/Search';
        return axiosClient.get(url, {
            params:{
                PageNumber:search.pageNumber,
                PageSize:search.pageSize,
                fromDate: search.fromDate,
                toDate: search.toDate,
            }
        });
    },
    addImportReports( lstImportReports: importReport): Promise<any>{
        const url = '/api/ImportReport/Create';
        return axiosClient.post(url,lstImportReports );
    },

    updateImportReport( importReport: importReport): Promise<any>{
        const url = '/api/ImportReport/Update';
        return axiosClient.post(url,importReport );
    },

    deleteImportReports( id: string): Promise<any>{
        const url = '/api/ImportReport/Delete';
        return axiosClient.post(url,id );
    },

 

}


export default importReportService;