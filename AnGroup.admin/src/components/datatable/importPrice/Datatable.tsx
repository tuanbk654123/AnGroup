import React from 'react'
import "./datatable.scss";
import { useEffect, useState } from "react";
import { ImportPriceAction } from '../../../features/importPrice/historySlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import { ExclamationCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined
} from '@ant-design/icons';
import { Pagination, Table, Button, Input, DatePicker, Drawer, Row, Col, Space, DatePickerProps, Modal } from 'antd';

import { importPrice, searchImportPriceDto, ImportpriceDto } from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";

type Props = {}
const Datatable = (props: Props) => {

  //Innit state
  const [SearchParam, setSearchParam] = useState<searchImportPriceDto>({
    pageNumber: 1,
    pageSize: 10,

    fromDate: "",
    toDate: ""
  });
  const [CheckRefresh, setCheckRefresh] = useState(false);
  const [Title, setTitle] = useState("");
  const [ImportpriceDto, setImportpriceDto] = useState<ImportpriceDto>({
    PriceKemLon: undefined,
    PriceKem2: undefined,
    PriceKem3: undefined,
    PriceRXo: undefined,
    PriceR1: undefined,
    PriceR2: undefined,
    PriceR3: undefined,
    RateKemLon: undefined,
    RateKem2: undefined,
    RateKem3: undefined,
    RateRXo: undefined,
    RateR1: undefined,
    RateR2: undefined,
    RateR3: undefined,
    DateImport: ""
  });
  // add or Update
  const [addOrUpdate, setaddOrUpdate] = useState(0);// 1 is add , 2 is update
  //state open adduser
  const [open, setOpen] = useState(false);
  //================================================================

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ImportPriceAction.searchImportPrice(SearchParam));// init Role select
  }, [dispatch, SearchParam, CheckRefresh])

  // lấy data từ reducer 
  const importPrices = useAppSelector((state) => state.importPrice.lstRespone);

  console.log("Datatable history = " + JSON.stringify(importPrices));

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
    dispatch(ImportPriceAction.searchImportPrice(SearchParam));
  }
  //Refresh 

  const refresh = async () => {
    const SearchParamChange = { ...SearchParam }
    setSearchParam(SearchParamChange)

  }
  // add or up date 

  const onAddOrUpdateUser = async () => {
    // add
    if (addOrUpdate === 1) {

      //await dispatch( userAction.addUser(lstUsers));
    }
    // Update
    if (addOrUpdate === 2) {

      //await dispatch(userAction.updateUser(UpdateUser));

    }
    await timeout(500);
    refresh();
    setOpen(false);
  };
  function timeout(delay: any) {
    return new Promise(res => setTimeout(res, delay));
  }
  const getFullDate = (date: string): string => {
    const dateAndTime = date.split('T');

    return dateAndTime[0].split('-').reverse().join('-');
  };
  // cột của Bảng==================================================================================
  const roleColumns: ColumnsType<importPrice> = [
    {
      title: 'Ngày',
      width: 60,
      dataIndex: 'dateImport',
      key: 'dateImport',
      fixed: 'left',
      render: ((date: string) => getFullDate(date))
    },
    {
      title: 'Giá Kem1',
      width: 50,
      dataIndex: 'priceKemLon',
      key: 'priceKemLon',
      fixed: 'left',
    },
    {
      title: 'Giá Kem2',
      width: 50,
      dataIndex: 'priceKem2',
      key: 'priceKem2',
      fixed: 'left',
    },
    {
      title: 'Giá Kem3',
      width: 50,
      dataIndex: 'priceKem3',
      key: 'priceKem3',
      fixed: 'left',
    },
    {
      title: 'Giá RXo',
      width: 50,
      dataIndex: 'priceRXo',
      key: 'priceRXo',
      fixed: 'left',
    },
    {
      title: 'Giá R1',
      width: 50,
      dataIndex: 'priceR1',
      key: 'priceR1',
      fixed: 'left',
    },
    {
      title: 'Giá R2',
      width: 50,
      dataIndex: 'priceR2',
      key: 'priceR2',
      fixed: 'left',
    },
    {
      title: 'Giá R3',
      width: 50,
      dataIndex: 'priceR3',
      key: 'priceR3',
      fixed: 'left',
    },
    {
      title: 'Tỷ lệ Kem1',
      width: 50,
      dataIndex: 'rateKemLon',
      key: 'rateKemLon',
      fixed: 'left',
    },
    {
      title: 'Tỷ lệ Kem2',
      width: 50,
      dataIndex: 'rateKem2',
      key: 'rateKem2',
      fixed: 'left',
    },
    {
      title: 'Tỷ lệ Kem3',
      width: 50,
      dataIndex: 'rateKem3',
      key: 'rateKem3',
      fixed: 'left',
    },
    {
      title: 'Tỷ lệ RXo',
      width: 50,
      dataIndex: 'rateRXo',
      key: 'rateRXo',
      fixed: 'left',
    },
    {
      title: 'Tỷ lệ R1',
      width: 50,
      dataIndex: 'rateR1',
      key: 'rateR1',
      fixed: 'left',
    },
    {
      title: 'Tỷ lệ R2',
      width: 50,
      dataIndex: 'rateR2',
      key: 'rateR2',
      fixed: 'left',
    },
    {
      title: 'Tỷ lệ R3',
      width: 50,
      dataIndex: 'rateR3',
      key: 'rateR3',
      fixed: 'left',
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

            <div className="viewButton"
              onClick={() => showEditDrawer(record)}
            >Sửa</div>

            <div
              className="deleteButton"
              onClick={() => handleDelete(record.id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },


  ];
  const { RangePicker } = DatePicker;
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
  // Show Add  
  const showDrawer = () => {
    //init state 
    setImportpriceDto({
      ...ImportpriceDto
    })


    setTitle("Thêm mới giá nhập");

    // setState add or up date
    setaddOrUpdate(1);
    // open TAB
    setOpen(true);
  };

  // Show edit  
  const showEditDrawer = (record: any) => {
    //init state 
    console.log("showEditDrawer: ", record);
    setTitle("Sửa giá nhập");

    setImportpriceDto(
      {
        ...ImportpriceDto,
        PriceKemLon: record.priceKemLon,
        PriceKem2: record.priceKem2,
        PriceKem3:record.priceKem3,
        PriceRXo: record.priceRXo,
        PriceR1: record.priceR1,
        PriceR2: record.priceR2,
        PriceR3: record.priceR3,
        RateKemLon: record.rateKemLon,
        RateKem2: record.rateKem2,
        RateKem3: record.rateKem3,
        RateRXo: record.rateRXo,
        RateR1: record.rateR1,
        RateR2: record.rateR2,
        RateR3: record.rateR3,
        DateImport:record.dateImport
      }
    )
    // setState add or up date
    setaddOrUpdate(2);
    // open TAB
    setOpen(true);
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
        const lstId = [id];
        setCheckRefresh(true);
        //await dispatch(userAction.deleteUser(lstId));
        await timeout(500);
        refresh();
        setModal1Open(false)
      },
      onCancel() { setModal1Open(false) }
    });
  };

  const onClose = () => {
    setOpen(false);
  };
  const onChangePriceKemLon = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        PriceKemLon: e
      }
    )
  }
  const onChangePriceKem3 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        PriceKem3: e
      }
    )
  }
  const onChangePriceKem2 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        PriceKem2: e
      }
    )
  }
  const onChangePriceRXo = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        PriceRXo: e
      }
    )
  }
  const onChangePriceR1 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        PriceR1: e
      }
    )
  }
  const onChangePriceR2 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        PriceR2: e
      }
    )
  }
  const onChangePriceR3 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        PriceR3: e
      }
    )
  }
  const onChangeRateKemLon = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        RateKemLon: e
      }
    )
  }
  const onChangeRateR1 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        RateR1: e
      }
    )
  }
  const onChangeRateR2 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        RateR2: e
      }
    )
  }
  const onChangeRateR3 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        RateR3: e
      }
    )
  }
  const onChangeRateRXo = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        RateRXo: e
      }
    )
  }
  const onChangeRateKem2 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        RateKem2: e
      }
    )
  }
  const onChangeRateKem3 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        RateKem3: e
      }
    )
  }
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="background">
      <div className="title">
        Quản lý giá nhập
      </div>
      <div className="datatable">
        <div className="tool">

          {/* <div style={{width:'150px', display:'flex', justifyContent:'center', alignItems:'center', cursor: 'pointer',fontWeight:'bold'}}>
            <AppstoreAddOutlined style= {{paddingInline:'5px', color:'#d32f2f' }}/> <div style= {{paddingInline:'5px', color:'#d32f2f' ,fontFamily:'Arial' }}>Cấu hình hiển thị</div>
          </div> */}
          <div style={{ width: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => showDrawer()}>
            <PlusOutlined style={{ paddingInline: '5px', color: '#d32f2f' }} /> <div style={{ paddingInline: '5px', color: '#d32f2f', fontFamily: 'Arial' }}>Thêm mới</div>
          </div>
          <div style={{ width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => refresh()}>
            <ReloadOutlined style={{ paddingInline: '5px', color: '#d32f2f' }} /> <div style={{ paddingInline: '5px', color: '#d32f2f', fontFamily: 'Arial', }}>Làm mới</div>
          </div>
          <div style={{ width: '50px', display: 'flex', justifyContent: 'center', borderLeft: '0.5px solid lightgrey', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }}>
            <BarsOutlined style={{ color: '#d32f2f' }}></BarsOutlined>
          </div>
        </div>
        <div className="datatableTitle">
          <div className="total" >Tổng số :<b>{importPrices.totalItem}</b> </div>

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
          dataSource={importPrices.content}
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
            total={importPrices.totalItem}
          />

        </div>


      </div>
      <Drawer
        title={Title}
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >

        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Giá kem lớn (vnđ):</label>
            <Input placeholder="Nhập giá kem lớn(vnđ)" value={ImportpriceDto.PriceKemLon} onChange={onChangePriceKemLon} />
          </Col>
          <Col span={12}>
            <label >Giá kem 2:</label>
            <Input placeholder="Nhập giá kem 2" value={ImportpriceDto.PriceKem2} onChange={onChangePriceKem2} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Giá kem 3:</label>
            <Input placeholder="Nhập giá kem 3" value={ImportpriceDto.PriceKem3} onChange={onChangePriceKem3} />
          </Col>
          <Col span={12}>
            <label >Giá R1:</label>
            <Input placeholder="Nhập giá R1 " value={ImportpriceDto.PriceR1} onChange={onChangePriceR1} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Giá R2:</label>
            <Input placeholder="Nhập giá R2" value={ImportpriceDto.PriceR2} onChange={onChangePriceR2} />
          </Col>
          <Col span={12}>
            <label >Giá R3:</label>
            <Input placeholder="Nhập giá R3 " value={ImportpriceDto.PriceR3} onChange={onChangePriceR3} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Giá RXo:</label>
            <Input placeholder="Nhập giá RXo" value={ImportpriceDto.PriceRXo} onChange={onChangePriceRXo} />
          </Col>
          <Col span={12}>
            <label >Tỷ lệ RXo:</label>
            <Input placeholder="Tỷ lệ RXo " value={ImportpriceDto.RateRXo} onChange={onChangeRateRXo} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Tỷ lệ kem lớn:</label>
            <Input placeholder="Nhập Tỷ lệ kem lớn" value={ImportpriceDto.RateKemLon} onChange={onChangeRateKemLon} />
          </Col>
          <Col span={12}>
            <label >Tỷ lệ kem 2:</label>
            <Input placeholder="Nhập giá kem 2" value={ImportpriceDto.RateKem2} onChange={onChangeRateKem2} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Tỷ lệ kem 3:</label>
            <Input placeholder="Nhập giá kem 3" value={ImportpriceDto.RateKem3} onChange={onChangeRateKem3} />
          </Col>
          <Col span={12}>
            <label >Tỷ lệ R1:</label>
            <Input placeholder="Nhập giá R1 " value={ImportpriceDto.RateR1} onChange={onChangeRateR1} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Tỷ lệ R2:</label>
            <Input placeholder="Nhập giá R2" value={ImportpriceDto.RateR2} onChange={onChangeRateR2} />
          </Col>
          <Col span={12}>
            <label >Tỷ lệ R3:</label>
            <Input placeholder="Nhập giá R3 " value={ImportpriceDto.RateR3} onChange={onChangeRateR3} />
          </Col>
        </Row>

        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Ngày:</label>
            <DatePicker   defaultValue={moment(ImportpriceDto.DateImport, dateFormat)}  onChange={onChange}  format={dateFormat} style={{ width: '100%' }} />
          
          </Col>
          <Col span={12}>

          </Col>
        </Row>
        {/* </Form> */}
        <div className="Submit">
          <Space style={{ display: 'flex' }}>
            <Button onClick={onClose}>Huỷ</Button>
            <Button style={{ background: '#d32f2f', borderColor: '#d32f2f' }} onClick={onAddOrUpdateUser} type="primary">
              Lưu
            </Button>
          </Space>
        </div>
      </Drawer>
    </div>
  )
}

export default Datatable