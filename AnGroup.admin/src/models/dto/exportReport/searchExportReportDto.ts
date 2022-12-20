export interface searchExportReportDto{
    fromDate:string;
    toDate:string;
    statusExport?: string;
    pageNumber:number;
    pageSize:number;
}