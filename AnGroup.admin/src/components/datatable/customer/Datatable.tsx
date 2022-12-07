
import "./datatable.scss";
import { useEffect, useState } from "react";
import { CustomerAction } from '../../../features/customer/customerSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import { ExclamationCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined
} from '@ant-design/icons';
import { Pagination, Table, Button, Input, DatePicker, Drawer, Row, Col, Space, Modal } from 'antd';

import { customer, searchCustomerDto, CustomerDto } from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';

import { openNotification } from "../../notice/notification";

type Props = {}
const Datatable = (props: Props) => {

  //Innit state
  const [SearchParam, setSearchParam] = useState<searchCustomerDto>({
    pageNumber: 1,
    pageSize: 10,
    Name: "",
    AccountNumber: "",
    fromDate: "",
    toDate: ""
  });
  const [CheckRefresh, setCheckRefresh] = useState(false);
  const [Title, setTitle] = useState("");
  const [customerDto, setcustomerDto] = useState<CustomerDto>({
    id: "",
    Name: "",
    AccountNumber: "",
    BankName: "",
    Address: "",
    PhoneNumber: "",
    nameGarden: ""
  });
  // add or Update
  const [addOrUpdate, setaddOrUpdate] = useState(0);// 1 is add , 2 is update
  //state open adduser
  const [open, setOpen] = useState(false);
  //================================================================

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(CustomerAction.searchCustomer(SearchParam));// init Role select
  }, [dispatch, SearchParam, CheckRefresh])

  // lấy data từ reducer 
  const importPrices = useAppSelector((state) => state.customer.lstRespone);

  

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
    dispatch(CustomerAction.searchCustomer(SearchParam));
  }
  //Refresh 

  const refresh = async () => {
    const SearchParamChange = { ...SearchParam }
    setSearchParam(SearchParamChange)

  }
  // add or up date 

  const onAddOrUpdate = async () => {
    //validate
    if (customerDto.nameGarden === "" || customerDto.nameGarden === undefined) {
      openNotification("Tên vựa không được để trống");
      return;
    }
    if (customerDto.AccountNumber === "" || customerDto.AccountNumber === undefined) {
      openNotification("Số tài khoản không được để trống");
      return;
    }
    if (customerDto.Name === "" || customerDto.Name === undefined) {
      openNotification("Tên tài khoản không được để trống");
      return;
    }
    if (customerDto.BankName === "" || customerDto.BankName === undefined) {
      openNotification("Tên ngân hàng không được để trống");
      return;
    }
    if (customerDto.Address === "" || customerDto.Address === undefined) {
      openNotification("Địa chỉ không được để trống");
      return;
    }
    if (customerDto.PhoneNumber === "" || customerDto.PhoneNumber === undefined) {
      openNotification("Số điện thoại không được để trống");
      return;
    }

    const customer = {
      ...customerDto,

    }
    // add
    if (addOrUpdate === 1) {
      await dispatch(CustomerAction.addCustomer(customer));
    }
    // Update
    if (addOrUpdate === 2) {
      await dispatch(CustomerAction.updateCustomer(customer));
    }
    await timeout(500);
    refresh();
    setOpen(false);
  };
  function timeout(delay: any) {
    return new Promise(res => setTimeout(res, delay));
  }

  // cột của Bảng==================================================================================
  const roleColumns: ColumnsType<customer> = [
    {
      title: 'Tên vựa',
      width: 100,
      dataIndex: 'nameGarden',
      key: 'nameGarden',
      fixed: 'left',
    },
    {
      title: 'Số tài khoản',
      width: 100,
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      fixed: 'left',
    },
    {
      title: 'Tên tài khoản',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Tên ngân hàng',
      width: 100,
      dataIndex: 'bankName',
      key: 'bankName',
      fixed: 'left',
    },
    {
      title: 'Địa chỉ',
      width: 100,
      dataIndex: 'address',
      key: 'address',
      fixed: 'left',
    },
    {
      title: 'Số điện thoại',
      width: 100,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      fixed: 'left',
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

    setcustomerDto({
      id: "",
      Name: "",
      AccountNumber: "",
      BankName: "",
      Address: "",
      PhoneNumber: "",
      nameGarden: ""
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

    setcustomerDto(
      {
        id: record.id,
        Name: record.name,
        AccountNumber: record.accountNumber,
        BankName: record.bankName,
        Address: record.address,
        PhoneNumber: record.phoneNumber,
        nameGarden: record.nameGarden
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
        await dispatch(CustomerAction.deleteCustomer(id));
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
  const onChangeAccountNumber = (e: any) => {
    setcustomerDto(
      {
        ...customerDto,
        AccountNumber: e.target.value
      }
    )
  }
  const onChangeAddress = (e: any) => {
    setcustomerDto(
      {
        ...customerDto,
        Address: e.target.value
      }
    )
  }
  const onChangeBankName = (e: any) => {
    setcustomerDto(
      {
        ...customerDto,
        BankName: e.target.value
      }
    )
  }
  const onChangenameGarden = (e: any) => {
    setcustomerDto(
      {
        ...customerDto,
        nameGarden: e.target.value
      }
    )
  }
  const onChangePhoneNumber = (e: any) => {
    setcustomerDto(
      {
        ...customerDto,
        PhoneNumber: e.target.value
      }
    )
  }
  const onChangeName = (e: any) => {
    setcustomerDto(
      {
        ...customerDto,
        Name: e.target.value
      }
    )
  }

  return (
    <div className="background">
      <div className="title">
        Quản lý khách hàng
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
            <label >Tên vựa:</label>
            <Input placeholder="Nhập tên vựa" value={customerDto.nameGarden} onChange={onChangenameGarden} />
          </Col>
          <Col span={12}>
            <label >Số tài khoản:</label>
            <Input placeholder="Nhập số tài khoản" value={customerDto.AccountNumber} onChange={onChangeAccountNumber} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Tên tài khoản:</label>
            <Input placeholder="Nhập tên tài khoản" value={customerDto.Name} onChange={onChangeName} />
          </Col>
          <Col span={12}>
            <label >Tên ngân hàng:</label>
            <Input placeholder="Nhập tên ngân hàng" value={customerDto.BankName} onChange={onChangeBankName} />
          </Col>
        </Row>  <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Địa chỉ:</label>
            <Input placeholder="Nhập địa chỉ" value={customerDto.Address} onChange={onChangeAddress} />
          </Col>
          <Col span={12}>
            <label >Số điện thoại:</label>
            <Input placeholder="Nhập số điện thoại" value={customerDto.PhoneNumber} onChange={onChangePhoneNumber} />
          </Col>
        </Row>

        {/* </Form> */}
        <div className="Submit">
          <Space style={{ display: 'flex' }}>
            <Button onClick={onClose}>Huỷ</Button>
            <Button style={{ background: '#d32f2f', borderColor: '#d32f2f' }} onClick={onAddOrUpdate} type="primary">
              Lưu
            </Button>
          </Space>
        </div>
      </Drawer>
    </div>
  )
}

export default Datatable