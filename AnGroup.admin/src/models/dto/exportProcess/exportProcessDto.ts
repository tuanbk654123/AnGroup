export interface exportProcessDto{
    id: string;

    SumOrange?: number;
    SumRed?: number;
    SumGreen?:number;
    SumBlue?:number;

    weighOrange?: number[];
    weighRed?: number[];
    weighGreen?:number[];
    weighBlue?:number[];

    countOrange?: number;
    countRed?: number;
    countGreen?:number;
    countBlue?:number;

    dateExport : string;
}