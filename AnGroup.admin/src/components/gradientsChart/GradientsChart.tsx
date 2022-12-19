import {  useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ImportReportAction } from '../../features/importReport/importReportSlice';
type Props = {

}

const GradientsChart = (props: Props) => {

  const dispatch = useAppDispatch();

  const formap = (record : any) =>{
    return {
      Date: record.dateImport.slice(0, 10),
      TotalMoeny: record.sumMoney
    }
  }

  const importReports = useAppSelector((state) => state.importReport.lstRespone).content.map(formap) ;

  useEffect(() => {
    const today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let dateFrom = today.getFullYear() + "-" + (today.getMonth() - 3) + "-" + (today.getDate() );
    dispatch(ImportReportAction.searchImportReport({
      pageNumber: 1,
      pageSize: 100,
      fromDate: dateFrom,
      toDate: date
    }));
  }, [dispatch]);

 
  const config = {
    data: importReports,
    xField: 'Date',
    yField: 'TotalMoeny',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
  };

  return <Area  style={{height:"45vh"}} {...config} />;
};

export default GradientsChart