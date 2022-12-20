
import "./datatable.scss";
import { useEffect, useState } from "react";
import { ExportReportAction } from '../../../features/exportReport/exportReportSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import { CheckCircleOutlined, ExclamationCircleOutlined, PlusOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import {
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined
} from '@ant-design/icons';
import { Pagination, Table, Button, DatePicker, Drawer, Row, Space, Modal, Tag, Input, Select } from 'antd';

import { exportReport, searchExportReportDto, exportReportDto } from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';


type Props = {}
const Datatable = (props: Props) => {

  //Innit state
  const [SearchParam, setSearchParam] = useState<searchExportReportDto>({
    pageNumber: 1,
    pageSize: 10,
    statusExport:undefined,
    fromDate: "",
    toDate: ""
  });
  const [CheckRefresh, setCheckRefresh] = useState(false);
  const [Title, setTitle] = useState("");
  const [exportReportDto, setexportReportDto] = useState<exportReportDto>({
    fromDate: "",
    toDate: "",
    statusExport: "",
    nameOwner: "",
    licenPalates: "",
    totalNumber: undefined,
    totalWeigtToTruck: undefined,
    totalPaper: undefined,
    totalWeigtReal: undefined,
    totalMoeny: undefined,
    carFee: undefined,
    totalPayment: undefined,

    id: ""
  });
  // add or Update
  const [addOrUpdate, setaddOrUpdate] = useState(0);// 1 is add , 2 is update
  //state open adduser
  const [open, setOpen] = useState(false);
  //================================================================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [objectExport, setobjectExport] = useState({
    id: "",
    licenPalates: "",
    nameOwner: ""
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ExportReportAction.searchExportReport(SearchParam));// init Role select
  }, [dispatch, SearchParam, CheckRefresh])

  // lấy data từ reducer 
  const exportReports = useAppSelector((state) => state.exportReport.lstRespone);

  console.log("Datatable history = " + JSON.stringify(exportReports));

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
    dispatch(ExportReportAction.searchExportReport(SearchParam));
  }
  //Refresh 

  const refresh = async () => {
    const SearchParamChange = {
      ...SearchParam,
      pageNumber: 1,
      pageSize: 10,
      statusExport:undefined,
      fromDate: "",
      toDate: ""
    }
    setSearchParam(SearchParamChange)

  }
  // add or up date 

  const onAddOrUpdateUser = async () => {
    // add
    if (addOrUpdate === 1) {
      const exportReport = {
        ...exportReportDto,
        id: ""
      }
      dispatch(ExportReportAction.addExportReport(exportReport));
    }
    // Update
    if (addOrUpdate === 2) {
      const exportReport = {
        ...exportReportDto,
      }
      dispatch(ExportReportAction.updateExportReport(exportReport));

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
  //
  const exportFile = (record: any) => {
    setobjectExport({
      ...objectExport,
      id: record.id,
    })
    setIsModalOpen(true);
  };

  const handleOk = async () => {

    setCheckRefresh(true);
    dispatch(ExportReportAction.exportReportExportProcess(objectExport));
    await timeout(1000);
    refresh();
    setobjectExport({
      id: "",
      licenPalates: "",
      nameOwner: ""
    })
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const exportFile = async (record: any) => {
  //   //init state 
  //   const data = {
  //     id: record.id,
  //     licenPalates: record.licenPalates,
  //     nameOwner: record.nameOwner
  //   }
  //   setCheckRefresh(true);
  //   dispatch(ExportReportAction.exportReportExportProcess(data));
  //   await timeout(1000);
  //   refresh();
  // };

  const onChangelicenPalates = (e: any) => {
    setobjectExport(
      {
        ...objectExport,
        licenPalates: e.target.value
      }
    )
  }
  const onChangenameOwner = (e: any) => {
    setobjectExport(
      {
        ...objectExport,
        nameOwner: e.target.value
      }
    )
  }
  // cột của Bảng==================================================================================
  const roleColumns: ColumnsType<exportReport> = [
    {
      title: 'Từ Ngày',
      width: 60,
      dataIndex: 'fromDate',
      key: 'fromDate',
      //fixed: 'left',
      render: ((date: string) => getFullDate(date))
    },
    {
      title: 'Đến Ngày',
      width: 60,
      dataIndex: 'toDate',
      key: 'toDate',
      //fixed: 'left',
      render: ((date: string) => getFullDate(date))
    },
    {
      title: 'Trạng thái',
      width: 60,
      dataIndex: 'statusExport',
      key: 'statusExport',
      //fixed: 'left',
      render: (_, record) => {
        switch (record.statusExport) {
          case "CHUA_XU_LY":
            return (<Tag icon={<SyncOutlined spin />} color='#00CCFF' >Đang xử lý</Tag>)
          case "DA_XU_LY":
            return (<Tag icon={<CheckCircleOutlined />} color='#87d068' >Đã xử lý</Tag>)
        }
      }
    },
    {
      title: 'Tổng số quả',
      width: 50,
      dataIndex: 'totalNumber',
      key: 'totalNumber',
      //fixed: 'left',
    },
    {
      title: 'Trọng lượng giấy',
      width: 50,
      dataIndex: 'totalPaper',
      key: 'totalPaper',
      //fixed: 'left',
    },
    {
      title: 'Trọng lượng thực',
      width: 50,
      dataIndex: 'totalWeigtReal',
      key: 'totalWeigtReal',
      //fixed: 'left',
    },
    {
      title: 'Tên chủ hàng',
      width: 50,
      dataIndex: 'nameOwner',
      key: 'nameOwner',
      //fixed: 'left',
    },
    {
      title: 'Biển số xe',
      width: 50,
      dataIndex: 'licenPalates',
      key: 'licenPalates',
      //fixed: 'left',
    },
    {
      title: 'Tổng tiền',
      width: 50,
      dataIndex: 'totalMoeny',
      key: 'totalMoeny',
      //fixed: 'left',
      render: (value: any) => {
        return (
          <Tag color='green' >{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"}</Tag>
        );
      },
    },
    {
      title: 'Cước xe',
      width: 50,
      dataIndex: 'carFee',
      key: 'carFee',
      //fixed: 'left',
      render: (value: any) => {
        return (
          <Tag color='yellow' >{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"}</Tag>
        );
      },
    }, {
      title: 'Tổng thanh toán',
      width: 50,
      dataIndex: 'totalPayment',
      key: 'totalPayment',
      //fixed: 'left',
      render: (value: any) => {
        return (
          <Tag color='red' >{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value) + " vnđ"}</Tag>
        );
      },
    },

    {
      title: 'Hành động',
      dataIndex: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 50,
      //render: () => <a>action</a>,
      render: (_, record) => {
        return (
          <div className="cellAction">
            <div className="exportFile"
              onClick={() => exportFile(record)}
            >Xuất</div>
            <Modal title="Thông tin" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Row className="row" gutter={16}>
                <Input placeholder="Nhập tên chủ hàng" value={objectExport.nameOwner} onChange={onChangenameOwner} />
              </Row>
              <Row className="row" gutter={16}>
                <Input placeholder="Nhập Biển số xe" value={objectExport.licenPalates} onChange={onChangelicenPalates} />
              </Row>
            </Modal>
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
  const onChangeStatus = (value: string) => {
    console.log(`selected ${value}`);

    const SearchParamChange = {
      ...SearchParam,
      pageNumber: 1,
      pageSize: 10,
      statusExport:value,
      fromDate: "",
      toDate: ""
    }
    setSearchParam(SearchParamChange)
 
  };

  const onSearchStatus = (value: string) => {
    //console.log('search:', value);
  };
  
  // Show Add    
  const showDrawer = () => {
    //init state 
    setexportReportDto({
      ...exportReportDto,
      fromDate: "",
      toDate: "",
      statusExport: "",
      nameOwner: "",
      licenPalates: "",
      totalNumber: undefined,
      totalWeigtToTruck: undefined,
      totalPaper: undefined,
      totalWeigtReal: undefined,
      totalMoeny: undefined,
      carFee: undefined,
      totalPayment: undefined,
    })
    setTitle("Thêm mới giá nhập");
    // setState add or up date
    setaddOrUpdate(1);
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
        await dispatch(ExportReportAction.deleteExportReport(id));
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

  return (
    <div className="background">
      <div className="title">
        Quản lý giá nhập
      </div>
      <div className="datatable">
        <div className="tool">
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
          <div className="total" >Tổng số :<b>{exportReports.totalItem}</b> </div>

          <div className="search">
            <div className="inputsearch">

              <RangePicker
                format={dateFormat}
                onChange={onChangeDate}
              />
            </div>
            <div className="inputsearch">
              <Select
                showSearch
                placeholder="Chọn trạng thái"
                optionFilterProp="children"
                onChange={onChangeStatus}
                onSearch={onSearchStatus}
                value={SearchParam.statusExport}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  {
                    value: 'DA_XU_LY',
                    label: 'Đã xử lý',
                  },
                  {
                    value: 'CHUA_XU_LY',
                    label: 'Đang xử lý',
                  },
                
                ]}
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
          dataSource={exportReports.content}
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
            total={exportReports.totalItem}
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