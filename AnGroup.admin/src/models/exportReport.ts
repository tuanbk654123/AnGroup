export interface exportReport{
    id: string;
    fromDate : string;
    toDate : string;
    statusExport: string;
    nameOwner : string;
    licenPalates : string;
    totalNumber?: number;
    totalWeigtToTruck?: number;
    totalPaper?: number;
    totalWeigtReal?: number;
    totalMoeny?: number;
    carFee?: number;
    totalPayment?: number;
  
}