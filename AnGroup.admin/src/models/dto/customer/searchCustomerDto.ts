export interface searchCustomerDto{
    fromDate:string;
    toDate:string;
    
    Name: string;
    AccountNumber: string;
    NameGarden: string;
    PhoneNumber: string;

    pageNumber:number;
    pageSize:number;
}