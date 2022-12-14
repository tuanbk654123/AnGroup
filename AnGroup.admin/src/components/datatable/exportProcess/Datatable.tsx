
import "./datatable.scss";
import { useEffect, useState } from "react";
import { ExportProcessAction } from '../../../features/exportProcess/exportProcessSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import { ExclamationCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined
} from '@ant-design/icons';
import { Pagination, Table, Button, Input, DatePicker, Drawer, Row, Col, Space, DatePickerProps, Modal, Tag } from 'antd';

import { exportProcess, searchExportProcessDto, exportProcessDto } from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";

type Props = {}
const Datatable = (props: Props) => {

  //Innit state
  const [SearchParam, setSearchParam] = useState<searchExportProcessDto>({
    pageNumber: 1,
    pageSize: 10,

    fromDate: "",
    toDate: ""
  });
  const [CheckRefresh, setCheckRefresh] = useState(false);
  const [Title, setTitle] = useState("");
  const [exportProcessDto, setexportProcessDto] = useState<exportProcessDto>({
    SumOrange: undefined,
    SumRed: undefined,
    SumGreen: undefined,
    SumBlue: undefined,

    weighOrange: [],
    weighRed: [],
    weighGreen: [],
    weighBlue: [],

    countOrange: undefined,
    countRed: undefined,
    countGreen: undefined,
    countBlue: undefined,
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
    dispatch(ExportProcessAction.searchExportProcess(SearchParam));// init Role select
  }, [dispatch, SearchParam, CheckRefresh])

  // lấy data từ reducer 
  const exportProcesss = useAppSelector((state) => state.exportProcess.lstRespone);

  console.log("Datatable history = " + JSON.stringify(exportProcesss));

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
    dispatch(ExportProcessAction.searchExportProcess(SearchParam));
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
      const exportProcess = {
        ...exportProcessDto,
        id: ""
      }
      dispatch(ExportProcessAction.addExportProcess(exportProcess));
    }
    // Update
    if (addOrUpdate === 2) {
      const exportProcess = {
        ...exportProcessDto,
      }
      dispatch(ExportProcessAction.updateExportProcess(exportProcess));

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
  const roleColumns: ColumnsType<exportProcess> = [
    {
      title: 'Ngày',
      width: 60,
      dataIndex: 'dateExport',
      key: 'dateExport',
      fixed: 'left',
      render: ((date: string) => getFullDate(date))
    },
    {
      title: 'Tổng cam',
      width: 50,
      dataIndex: 'sumOrange',
      key: 'sumOrange',
      fixed: 'left',
      render: (value: any) => {
        return (
          <Tag color='orange' >{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)}</Tag>

        );
      },
    },
    {
      title: 'Tổng đỏ',
      width: 50,
      dataIndex: 'sumRed',
      key: 'sumRed',
      fixed: 'left',
      render: (value: any) => {
        return (
          <Tag color='red' >{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)}</Tag>
        );
      },
    },
    {
      title: 'Tổng xanh lá',
      width: 50,
      dataIndex: 'sumBlue',
      key: 'sumBlue',
      fixed: 'left',
      render: (value: any) => {
        return (
          <Tag color='blue' >{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)}</Tag>
        );
      },
    },
    {
      title: 'Tổng xanh dương',
      width: 50,
      dataIndex: 'sumGreen',
      key: 'sumGreen',
      fixed: 'left',
      render: (value: any) => {
        return (
          <Tag color='green' >{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)}</Tag>
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
    setexportProcessDto({
      ...exportProcessDto,
      SumOrange: undefined,
      SumRed: undefined,
      SumGreen: undefined,
      SumBlue: undefined,

      weighOrange: [],
      weighRed: [],
      weighGreen: [],
      weighBlue: [],

      countOrange: undefined,
      countRed: undefined,
      countGreen: undefined,
      countBlue: undefined,
      dateExport: "",


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

    setexportProcessDto(
      {
        ...exportProcessDto,

        SumOrange: record.SumOrange,
        SumRed: record.SumRed,
        SumGreen:record.SumGreen,
        SumBlue:record.SumBlue,
    
        weighOrange: record.weighOrange,
        weighRed: record.weighRed,
        weighGreen:record.weighGreen,
        weighBlue:record.weighBlue,
    
        countOrange: record.countOrange,
        countRed: record.countRed,
        countGreen:record.countGreen,
        countBlue:record.countBlue,

        dateExport: record.dateExport,
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
        await dispatch(ExportProcessAction.deleteExportProcess(id));
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
  const onChangeProcessOrange = (e: any) => {
    setexportProcessDto(
      {
        ...exportProcessDto,
        countOrange: parseInt(e.target.value)
      }
    )
  }
  const onChangeProcessRed = (e: any) => {
    setexportProcessDto(
      {
        ...exportProcessDto,
        countRed: parseInt(e.target.value)
      }
    )
  }
  const onChangeProcessBlue = (e: any) => {
    setexportProcessDto(
      {
        ...exportProcessDto,
        countBlue: parseInt(e.target.value)
      }
    )
  }
  const onChangeProcessGreen = (e: any) => {
    setexportProcessDto(
      {
        ...exportProcessDto,
        countGreen: parseInt(e.target.value)
      }
    )
  }


  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    //console.log(date, dateString);
    setexportProcessDto(
      {
        ...exportProcessDto,
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
          <div className="total" >Tổng số :<b>{exportProcesss.totalItem}</b> </div>

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
          dataSource={exportProcesss.content}
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
            total={exportProcesss.totalItem}
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
            <label >Số quả cam (vnđ):</label>
            <Input placeholder="Nhập giá cam(vnđ)" value={exportProcessDto.countOrange} onChange={onChangeProcessOrange} />
          </Col>
          <Col span={12}>
            <label >Giá đỏ(vnđ):</label>
            <Input placeholder="Nhập giá đỏ" value={exportProcessDto.countRed} onChange={onChangeProcessRed} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Giá xanh lá(vnđ):</label>
            <Input placeholder="Nhập giá xanh lá" value={exportProcessDto.countBlue} onChange={onChangeProcessBlue} />
          </Col>
          <Col span={12}>
            <label >Giá xanh dương(vnđ):</label>
            <Input placeholder="Nhập giá xanh dương " value={exportProcessDto.countGreen} onChange={onChangeProcessGreen} />
          </Col>
        </Row>

        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Ngày:</label>
            <DatePicker value={moment(exportProcessDto.dateExport, dateFormat)} onChange={onChange} format={dateFormat} style={{ width: '100%' }} />
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