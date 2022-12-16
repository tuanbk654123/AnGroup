
import "./datatable.scss";
import { useEffect, useState } from "react";
import { ImportReportAction } from '../../../features/importReport/importReportSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import {
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined
} from '@ant-design/icons';
import { Pagination, Table, Button, DatePicker, Modal, Tag } from 'antd';

import { importReport, SearchImportReportDto } from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";
import { ImportProcessAction } from "../../../features/importProcess/importProcessSlice";

type Props = {}
const Datatable = (props: Props) => {

  //Innit state
  const [SearchParam, setSearchParam] = useState<SearchImportReportDto>({
    pageNumber: 1,
    pageSize: 10,

    fromDate: "",
    toDate: ""
  });
  const [CheckRefresh, setCheckRefresh] = useState(false);

  //state open adduser

  //================================================================

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ImportReportAction.searchImportReport(SearchParam));// init Role select
  }, [dispatch, SearchParam, CheckRefresh])

  // lấy data từ reducer 
  const importReports = useAppSelector((state) => state.importReport.lstRespone);

  console.log("Datatable history = " + JSON.stringify(importReports));

  //Thay đổi Size chage
  const onShowSizeChange = (current: number, pageSize: number) => {

    setSearchParam({
      ...SearchParam,
      pageNumber: current,
      pageSize: pageSize,
    })

  };


  //==========================================
  //search


  const Search = () => {
    dispatch(ImportReportAction.searchImportReport(SearchParam));
  }
  //Refresh 

  const refresh = async () => {
    const SearchParamChange = { ...SearchParam,
      pageNumber: 1,
      pageSize: 10,
  
      fromDate: "",
      toDate: "" }
    setSearchParam(SearchParamChange)

  }
  const exportFile = async (date: any) => {
    //init state 

    setCheckRefresh(true);
     dispatch(ImportProcessAction.exportReportImportProcess(date));
    await timeout(500);
    refresh();
  };
  function timeout(delay: any) {
    return new Promise(res => setTimeout(res, delay));
  }
  const getFullDate = (date: string): string => {
    const dateAndTime = date.split('T');

    return dateAndTime[0].split('-').reverse().join('-');
  };
  // cột của Bảng==================================================================================
  const roleColumns: ColumnsType<importReport> = [
    {
      title: 'Ngày',
      width: 60,
      dataIndex: 'dateImport',
      key: 'dateImport',
      fixed: 'left',
      render: ((date: string) => getFullDate(date))
    },
    {
      title: 'Kem1',
      width: 50,
      dataIndex: 'priceKemLon',
      key: 'priceKemLon',
      fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)
        );
      },
    },
    {
      title: ' Kem2',
      width: 50,
      dataIndex: 'priceKem2',
      key: 'priceKem2',
      fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)
        );
      },
    },
    {
      title: ' Kem3',
      width: 50,
      dataIndex: 'priceKem3',
      key: 'priceKem3',
      fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)
        );
      },
    },
    {
      title: ' RXo',
      width: 50,
      dataIndex: 'priceRXo',
      key: 'priceRXo',
      fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)
        );
      },
    },
    {
      title: ' R1',
      width: 50,
      dataIndex: 'priceR1',
      key: 'priceR1',
      fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)
        );
      },
    },
    {
      title: ' R2',
      width: 50,
      dataIndex: 'priceR2',
      key: 'priceR2',
      fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)
        );
      },
    },
    {
      title: ' R3',
      width: 50,
      dataIndex: 'priceR3',
      key: 'priceR3',
      fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)
        );
      },
    },
    {
      title: 'Tổng cân',
      width: 50,
      dataIndex: 'sumKg',
      key: 'sumKg',
      fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)
        );
      },
    },
    {
      title: 'Tổng tiền',
      width: 50,
      dataIndex: 'sumMoney',
      key: 'sumMoney',
      fixed: 'left',

      render: (value: any) => {
        return (
          <Tag color='red' >{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"}</Tag>
        );
      },
    },
   
    {
      title: 'Action',
      dataIndex: 'Action',

      key: 'operation',
      fixed: 'right',
      width: 100,
      //render: () => <a>action</a>,
      render: (_, record) => {
        return (
          <div className="cellAction">

            {/* <div
              className="deleteButton"
              onClick={() => handleDelete(record.id)}
            >
              Xóa
            </div> */}
            <div className="exportFile"
              onClick={() => exportFile(record.dateImport)}
            >Xuất</div>
          </div>
        );
      },
    },


  ];
  const { RangePicker } = DatePicker;
  //const dateFormat = 'DD-MM-YYYY';
  const dateFormat = 'YYYY-MM-DD';
  const onChangeDate = (dates: any, dateStrings: any) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      setSearchParam({
        ...SearchParam,
        fromDate: dateStrings[0],
        toDate: dateStrings[1]
      })
    } else {
      console.log('Clear', dateStrings[0]);
      setSearchParam({
        ...SearchParam,
        fromDate: "",
        toDate: ""
      })
    }
  };


  const { confirm } = Modal;
  const [modal1Open, setModal1Open] = useState(false);

  const handleDelete = async (id: any) => {
    confirm({
      open: modal1Open,
      icon: <ExclamationCircleOutlined />,
      title: 'Xóa giá nhập',
      content: 'Bạn có muốn xóa giá nhập này?',
      async onOk() {

        setCheckRefresh(true);
        await dispatch(ImportReportAction.deleteImportReport(id));
        await timeout(500);
        refresh();
        setModal1Open(false)
      },
      onCancel() { setModal1Open(false) }
    });
  };


  return (
    <div className="background">
      <div className="title">
        Quản lý giá nhập
      </div>
      <div className="datatable">
        <div className="tool">

  
          {/* <div style={{ width: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => showDrawer()}>
            <PlusOutlined style={{ paddingInline: '5px', color: '#d32f2f' }} /> <div style={{ paddingInline: '5px', color: '#d32f2f', fontFamily: 'Arial' }}>Thêm mới</div>
          </div> */}
          <div style={{ width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => refresh()}>
            <ReloadOutlined style={{ paddingInline: '5px', color: '#d32f2f' }} /> <div style={{ paddingInline: '5px', color: '#d32f2f', fontFamily: 'Arial', }}>Làm mới</div>
          </div>
          <div style={{ width: '50px', display: 'flex', justifyContent: 'center', borderLeft: '0.5px solid lightgrey', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }}>
            <BarsOutlined style={{ color: '#d32f2f' }}></BarsOutlined>
          </div>
        </div>
        <div className="datatableTitle">
          <div className="total" >Tổng số :<b>{importReports.totalItem}</b> </div>

          <div className="search">
            <div className="inputsearch">

              <RangePicker
                format={dateFormat}
                onChange={onChangeDate}
              />
            </div>

            <div className="inputsearch">
              <Button style={{ background: '#d32f2f', borderColor: '#d32f2f' }} type="primary" icon={<SearchOutlined />} onClick={() => Search()}>
                Search
              </Button>
            </div>
          </div>


        </div>

        <Table
          style={{ padding: '10px' }}
          columns={roleColumns}
          dataSource={importReports.content}
          pagination={false}
          rowKey={record => record.id}
          scroll={{
            x: 1500,
            y: 700,
          }

          }

        />
        <div className="datatablePagging">
          <Pagination
            showSizeChanger
            //onShowSizeChange={onShowSizeChange}
            onChange={onShowSizeChange}
            defaultCurrent={1}
            total={importReports.totalItem}
          />

        </div>


      </div>
    
    </div>
  )
}

export default Datatable