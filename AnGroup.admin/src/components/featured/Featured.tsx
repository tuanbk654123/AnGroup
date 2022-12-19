import "./featured.scss";
import { useEffect } from 'react';

import { Pie } from '@ant-design/plots';

import "react-circular-progressbar/dist/styles.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { ExportReportAction } from "../../features/exportReport/exportReportSlice";

const Featured = () => {
  const dispatch = useAppDispatch();

  const chartReports = useAppSelector((state) => state.exportReport.responeChartPie);

  useEffect(() => {
    const today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let dateFrom = today.getFullYear() + "-" + (today.getMonth() - 3) + "-" + (today.getDate());
    dispatch(ExportReportAction.chartExportReport({
      pageNumber: 1,
      pageSize: 1,
      fromDate: dateFrom,
      toDate: date
    }));
  }, [dispatch]);

  const data = [
    {
      type: 'Cam',
      value: chartReports.orange,
    },
    {
      type: 'Đỏ',
      value: chartReports.red,
    },
    {
      type: 'Xanh lá',
      value: chartReports.blue,
    },
    {
      type: 'Xanh Dương',
      value: chartReports.green,
    }
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    color: ['#e28743', '#e0a0af', '#83f772', '#9cc7fb'],
  };
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Biểu đồ tròn</h1>
      </div>
      <Pie style={{height:"35vh"}} {...config} />
      <div className="bottom">
        <p className="title">Biểu đồ khối lượng xuất 3 tháng gần đây (Kg)</p>
      </div>

    </div>
  );
};

export default Featured;
