import { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ImportReportAction } from '../../features/importReport/importReportSlice';
type Props = {
  //Data: importReport[],

}
interface DataChart {
  Date: string,
  TotalMoeny: number

}

const GradientsChart = (props: Props) => {
  const [data, setData] = useState<DataChart[]>([
    // {
    //   Date: "2022-12-01T17:00:00Z",
    //   TotalMoeny: 0
    // }
  ]);

  const dispatch = useAppDispatch();
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

    let data2=[];
    for (let i = importReports.content.length - 1; i >= 0; i--) {
      data2.push({
        Date: importReports.content[i].dateImport.slice(0, 10),
        TotalMoeny: importReports.content[i].sumMoney

      });
    }
    setData(data2)
  }, []);

  const importReports = useAppSelector((state) => state.importReport.lstRespone);

  const config = {
    data,
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

  return <Area {...config} />;
};

export default GradientsChart