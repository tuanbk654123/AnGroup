export interface SearchImportProcessDto{
    fromDate:string;
    toDate:string;
    pageNumber:number;
    statusBill?:string;
    pageSize:number;
}