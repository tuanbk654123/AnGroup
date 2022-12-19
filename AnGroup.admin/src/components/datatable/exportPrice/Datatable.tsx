
import "./datatable.scss";
import { useEffect, useState } from "react";
import { ExportPriceAction } from '../../../features/exportPrice/exportPriceSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import { ExclamationCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined
} from '@ant-design/icons';
import { Pagination, Table, Button, Input, DatePicker, Drawer, Row, Col, Space, DatePickerProps, Modal, Tag } from 'antd';

import { exportPrice, searchExportPriceDto, exportPriceDto } from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";

type Props = {}
const Datatable = (props: Props) => {

  //Innit state
  const [SearchParam, setSearchParam] = useState<searchExportPriceDto>({
    pageNumber: 1,
    pageSize: 10,

    fromDate: "",
    toDate: ""
  });
  const [CheckRefresh, setCheckRefresh] = useState(false);
  const [Title, setTitle] = useState("");
  const [exportPriceDto, setexportPriceDto] = useState<exportPriceDto>({
    priceBlue: undefined,
    priceGreen: undefined,
    priceRed: undefined,
    priceOrange: undefined,
   
    dateExport: "",
    id: ""
  });
  // add or Update
  const [addOrUpdate, setaddOrUpdate] = useState(0);// 1 is add , 2 is update
  //state open adduser
  const [open, setOpen] = useState(false);
  //================================================================

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ExportPriceAction.searchExportPrice(SearchParam));// init Role select
  }, [dispatch, SearchParam, CheckRefresh])

  // lấy data từ reducer 
  const exportPrices = useAppSelector((state) => state.exportPrice.lstRespone);

  console.log("Datatable history = " + JSON.stringify(exportPrices));

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
    dispatch(ExportPriceAction.searchExportPrice(SearchParam));
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
  // add or up date 

  const onAddOrUpdateUser = async () => {
    let date =  exportPriceDto.dateExport.split('T')[0];
    // add
    if (addOrUpdate === 1) {
      const exportPrice = {
        ...exportPriceDto,
        dateExport: date+"T07:00:00.000Z",
        id: ""
      }
       dispatch(ExportPriceAction.addExportPrice(exportPrice));
    }
    // Update
    if (addOrUpdate === 2) {
      const exportPrice = {
        ...exportPriceDto,
        dateExport: date+"T07:00:00.000Z",
      }
       dispatch(ExportPriceAction.updateExportPrice(exportPrice));

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
  const roleColumns: ColumnsType<exportPrice> = [
    {
      title: 'Ngày',
      width: 60,
      dataIndex: 'dateExport',
      key: 'dateExport',
      //fixed: 'left',
      render: ((date: string) => getFullDate(date))
    },
    {
      title: 'Giá cam',
      width: 50,
      dataIndex: 'priceOrange',
      key: 'priceOrange',
      //fixed: 'left',
      render: (value: any) => {
        return (
          <Tag color='orange' >{ new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"}</Tag>
         
        );
      },
    },
    {
      title: 'Giá đỏ',
      width: 50,
      dataIndex: 'priceRed',
      key: 'priceRed',
      //fixed: 'left',
      render: (value: any) => {
        return (
          <Tag color='red' >{ new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"}</Tag>
        );
      },
    },
    {
      title: 'Giá xanh lá',
      width: 50,
      dataIndex: 'priceBlue',
      key: 'priceBlue',
      //fixed: 'left',
      render: (value: any) => {
        return (
          <Tag color='blue' >{ new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"}</Tag>
        );
      },
    },
    {
      title: 'Giá xanh dương',
      width: 50,
      dataIndex: 'priceGreen',
      key: 'priceGreen',
      //fixed: 'left',
      render: (value: any) => {
        return (
          <Tag color='green' >{ new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"}</Tag>
        );
      },
    },
 
    {
      title: 'Hành động',
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
    let date =  today.getFullYear() +"-"+ (today.getMonth()+1) +"-" + today.getDate()  ;
    setexportPriceDto({
      ...exportPriceDto,
      priceBlue: undefined,
      priceGreen: undefined,
      priceRed: undefined,
      priceOrange: undefined,
     
      dateExport: date,

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

    setexportPriceDto(
      {
        ...exportPriceDto,
        priceBlue: record.priceBlue,
        priceGreen: record.priceGreen,
        priceRed: record.priceRed,
        priceOrange: record.priceOrange,
       
        dateExport: record.dateExport,
        id : record.id,
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
        await dispatch(ExportPriceAction.deleteExportPrice(id));
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
  const onChangePriceOrange = (e: any) => {
    setexportPriceDto(
      {
        ...exportPriceDto,
        priceOrange: parseInt(e.target.value)
      }
    )
  }
  const onChangePriceRed = (e: any) => {
    setexportPriceDto(
      {
        ...exportPriceDto,
        priceRed: parseInt(e.target.value)
      }
    )
  }
  const onChangePriceBlue = (e: any) => {
    setexportPriceDto(
      {
        ...exportPriceDto,
        priceBlue: parseInt(e.target.value)
      }
    )
  }
  const onChangePriceGreen = (e: any) => {
    setexportPriceDto(
      {
        ...exportPriceDto,
        priceGreen: parseInt(e.target.value)
      }
    )
  }
 
  
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    //console.log(date, dateString);
    setexportPriceDto(
      {
        ...exportPriceDto,
        dateExport: dateString
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
          <div  className="btnAddHover" style={{ width: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => showDrawer()}>
            <PlusOutlined style={{ paddingInline: '5px', color: '#d32f2f' }} /> <div style={{ paddingInline: '5px', color: '#d32f2f', fontFamily: 'Arial' }}>Thêm mới</div>
          </div>
          <div  className="btnAddHover" style={{ width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => refresh()}>
            <ReloadOutlined style={{ paddingInline: '5px', color: '#d32f2f' }} /> <div style={{ paddingInline: '5px', color: '#d32f2f', fontFamily: 'Arial', }}>Làm mới</div>
          </div>
          <div style={{ width: '50px', display: 'flex', justifyContent: 'center', borderLeft: '0.5px solid lightgrey', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }}>
            <BarsOutlined style={{ color: '#d32f2f' }}></BarsOutlined>
          </div>
        </div>
        <div className="datatableTitle">
          <div className="total" >Tổng số :<b>{exportPrices.totalItem}</b> </div>

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
          dataSource={exportPrices.content}
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
            total={exportPrices.totalItem}
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
            <label >Giá cam (vnđ):</label>
            <Input placeholder="Nhập giá cam(vnđ)" value={exportPriceDto.priceOrange} onChange={onChangePriceOrange} />
          </Col>
          <Col span={12}>
            <label >Giá đỏ(vnđ):</label>
            <Input placeholder="Nhập giá đỏ" value={exportPriceDto.priceRed} onChange={onChangePriceRed} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Giá xanh lá(vnđ):</label>
            <Input placeholder="Nhập giá xanh lá" value={exportPriceDto.priceBlue} onChange={onChangePriceBlue} />
          </Col>
          <Col span={12}>
            <label >Giá xanh dương(vnđ):</label>
            <Input placeholder="Nhập giá xanh dương " value={exportPriceDto.priceGreen} onChange={onChangePriceGreen} />
          </Col>
        </Row>
      
        <Row className="row" gutter={16}>
          <Col span={12}>
          <label >Ngày:</label>
            <DatePicker value={moment(exportPriceDto.dateExport, dateFormat)} onChange={onChange} format={dateFormat} style={{ width: '100%' }} />
          </Col>
          <Col span={12}>
          
          </Col>
          <Col span={12}>
          </Col>
        </Row>


        <Row className="row" gutter={16}>

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