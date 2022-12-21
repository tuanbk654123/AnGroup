
import "./datatable.scss";
import { useEffect, useState } from "react";
import { ImportPriceAction } from '../../../features/importPrice/importPriceSlice';
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
import { openNotification } from "../../notice/notification";

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
    priceKemLon: undefined,
    priceKem2: undefined,
    priceKem3: undefined,
    priceRXo: undefined,
    priceR1: undefined,
    priceR2: undefined,
    priceR3: undefined,
    RateKemLon: undefined,
    RateKem2: undefined,
    RateKem3: undefined,
    RateRXo: undefined,
    RateR1: undefined,
    RateR2: undefined,
    RateR3: undefined,
    DateImport: "",
    id: ""
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
    const SearchParamChange = {
      ...SearchParam,
      pageNumber: 1,
      pageSize: 10,

      fromDate: "",
      toDate: ""
    }
    setSearchParam(SearchParamChange)

  }
  // add or up date 

  const onAddOrUpdateUser = async () => {
    if (ImportpriceDto.priceKemLon === undefined && ImportpriceDto.priceKem3 === undefined && ImportpriceDto.priceKem2 === undefined
      && ImportpriceDto.priceRXo === undefined &&
      ImportpriceDto.priceR1 === undefined && ImportpriceDto.priceR2 === undefined && ImportpriceDto.priceR3 === undefined) {
      openNotification("Thông tin không được để trống");
      return;
    }
    let date = ImportpriceDto.DateImport.split('T')[0];
    // add
    if (addOrUpdate === 1) {
      const importPrice = {
        ...ImportpriceDto,
        DateImport: date + "T07:00:00.000Z",
        id: ""
      }
      dispatch(ImportPriceAction.addImportPrice(importPrice));
    }
    // Update
    if (addOrUpdate === 2) {
      const importPrice = {
        ...ImportpriceDto,
        DateImport: date + "T07:00:00.000Z",
      }
      dispatch(ImportPriceAction.updateImportPrice(importPrice));

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
      //fixed: 'left',
      render: ((date: string) => getFullDate(date))
    },
    {
      title: 'Giá Kem1',
      width: 50,
      dataIndex: 'priceKemLon',
      key: 'priceKemLon',
      //fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"
        );
      },
    },
    {
      title: 'Giá Kem2',
      width: 50,
      dataIndex: 'priceKem2',
      key: 'priceKem2',
      //fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"
        );
      },
    },
    {
      title: 'Giá Kem3',
      width: 50,
      dataIndex: 'priceKem3',
      key: 'priceKem3',
      //fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"
        );
      },
    },
    {
      title: 'Giá RXo',
      width: 50,
      dataIndex: 'priceRXo',
      key: 'priceRXo',
      //fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"
        );
      },
    },
    {
      title: 'Giá R1',
      width: 50,
      dataIndex: 'priceR1',
      key: 'priceR1',
      //fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"
        );
      },
    },
    {
      title: 'Giá R2',
      width: 50,
      dataIndex: 'priceR2',
      key: 'priceR2',
      //fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"
        );
      },
    },
    {
      title: 'Giá R3',
      width: 50,
      dataIndex: 'priceR3',
      key: 'priceR3',
      //fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"
        );
      },
    },

    {
      title: 'Hành động',
      dataIndex: 'Action',

      key: 'operation',
      fixed: 'right',
      width: 40,
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
  // Show Add    
  const showDrawer = () => {
    //init state 
    const today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    setImportpriceDto({
      ...ImportpriceDto,
      priceKemLon: undefined,
      priceKem2: undefined,
      priceKem3: undefined,
      priceRXo: undefined,
      priceR1: undefined,
      priceR2: undefined,
      priceR3: undefined,
      RateKemLon: undefined,
      RateKem2: undefined,
      RateKem3: undefined,
      RateRXo: undefined,
      RateR1: undefined,
      RateR2: undefined,
      RateR3: undefined,
      DateImport: date
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
        priceKemLon: record.priceKemLon,
        priceKem2: record.priceKem2,
        priceKem3: record.priceKem3,
        priceRXo: record.priceRXo,
        priceR1: record.priceR1,
        priceR2: record.priceR2,
        priceR3: record.priceR3,
        RateKemLon: record.rateKemLon,
        RateKem2: record.rateKem2,
        RateKem3: record.rateKem3,
        RateRXo: record.rateRXo,
        RateR1: record.rateR1,
        RateR2: record.rateR2,
        RateR3: record.rateR3,
        DateImport: record.dateImport,
        id: record.id,
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

        setCheckRefresh(true);
        await dispatch(ImportPriceAction.deleteImportPrice(id));
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
  const onChangepriceKemLon = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        priceKemLon: parseInt(e.target.value)
      }
    )
  }
  const onChangepriceKem3 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        priceKem3: parseInt(e.target.value)
      }
    )
  }
  const onChangepriceKem2 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        priceKem2: parseInt(e.target.value)
      }
    )
  }
  const onChangepriceRXo = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        priceRXo: parseInt(e.target.value)
      }
    )
  }
  const onChangepriceR1 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        priceR1: parseInt(e.target.value)
      }
    )
  }
  const onChangepriceR2 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        priceR2: parseInt(e.target.value)
      }
    )
  }
  const onChangepriceR3 = (e: any) => {
    setImportpriceDto(
      {
        ...ImportpriceDto,
        priceR3: parseInt(e.target.value)
      }
    )
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    //console.log(date, dateString);
    if(dateString === ''){
      return
    }
    setImportpriceDto(
      {
        ...ImportpriceDto,
        DateImport: dateString
      }
    )
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
          <div className="btnAddHover" style={{ width: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => showDrawer()}>
            <PlusOutlined style={{ paddingInline: '5px', color: '#d32f2f' }} /> <div style={{ paddingInline: '5px', color: '#d32f2f', fontFamily: 'Arial' }}>Thêm mới</div>
          </div>
          <div className="btnAddHover" style={{ width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => refresh()}>
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
            <label >Ngày:</label>
            <DatePicker value={moment(ImportpriceDto.DateImport, dateFormat)}  onChange={onChange} format={dateFormat} style={{ width: '100%' }} />
          </Col>
          <Col span={12}>
            <label >Giá RXo  :</label>
            <Input    suffix="VNĐ" type="number" placeholder="Nhập giá RXo" value={ImportpriceDto.priceRXo} onChange={onChangepriceRXo} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Giá kem lớn  :</label>
            <Input    suffix="VNĐ" type="number" placeholder="Nhập giá kem lớn " value={ImportpriceDto.priceKemLon} onChange={onChangepriceKemLon} />
          </Col>
          <Col span={12}>
            <label >Giá R1  :</label>
            <Input    suffix="VNĐ" type="number" placeholder="Nhập giá R1 " value={ImportpriceDto.priceR1} onChange={onChangepriceR1} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Giá kem 2  :</label>
            <Input    suffix="VNĐ" type="number" placeholder="Nhập giá kem 2" value={ImportpriceDto.priceKem2} onChange={onChangepriceKem2} />
          </Col>
          <Col span={12}>
            <label >Giá R2  :</label>
            <Input     suffix="VNĐ" type="number" placeholder="Nhập giá R2" value={ImportpriceDto.priceR2} onChange={onChangepriceR2} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Giá kem 3  :</label>
            <Input    suffix="VNĐ" type="number" placeholder="Nhập giá kem 3" value={ ImportpriceDto?.priceKem3 } onChange={onChangepriceKem3} />
          </Col>
          <Col span={12}>
            <label >Giá R3  :</label>
            <Input    suffix="VNĐ" type="number" placeholder="Nhập giá R3 " value={ImportpriceDto.priceR3} onChange={onChangepriceR3} />
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