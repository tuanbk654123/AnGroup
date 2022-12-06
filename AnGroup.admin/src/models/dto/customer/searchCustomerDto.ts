export interface searchCustomerDto{
    fromDate:string;
    toDate:string;
    
    Name: string;
    AccountNumber: string;
    // BankName: string;
    // Address: string;
    // PhoneNumber: string;

    pageNumber:number;
    pageSize:number;
}