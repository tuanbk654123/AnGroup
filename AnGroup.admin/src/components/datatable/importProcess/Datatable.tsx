import "./datatable.scss";
import { useEffect, useState } from "react";
import { ImportProcessAction } from '../../../features/importProcess/importProcessSlice';
import { CustomerAction } from '../../../features/customer/customerSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import { ExclamationCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined
} from '@ant-design/icons';
import { Pagination, Table, Button, Input, DatePicker, Drawer, Row, Col, Space, Modal, Select, SelectProps, Tag } from 'antd';

import { importProcess, SearchImportProcessDto, CustomerDto, searchCustomerDto, ImportProcessDto, customer } from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';

import { openNotification } from "../../notice/notification";
import { log } from "console";


export interface Option {
  value: string,
  label: string,
}

type Props = {}
const Datatable = (props: Props) => {

  //Innit state
  const [SearchParam, setSearchParam] = useState<SearchImportProcessDto>({
    pageNumber: 1,
    pageSize: 10,
    fromDate: "",
    toDate: ""
  });
  const [SearchParamCustomer, setSearchParamCustomer] = useState<searchCustomerDto>({
    pageNumber: 1,
    pageSize: 200,
    Name: "",
    AccountNumber: "",
    fromDate: "",
    toDate: ""
  });
  const [customerDto, setcustomerDto] = useState<CustomerDto>({
    id: "",
    Name: "",
    AccountNumber: "",
    BankName: "",
    Address: "",
    PhoneNumber: "",
    nameGarden: ""
  });
  const [CheckRefresh, setCheckRefresh] = useState(false);
  const [Title, setTitle] = useState("");
  const [ImportpriceDto, setImportpriceDto] = useState<ImportProcessDto>({
    weighKemLon: [],
    weighKem2: [],
    weighKem3: [],
    weighRXo: [],
    weighR1: [],
    weighR2: [],
    weighR3: [],
    DateImport: "",
    idGarden: "",
    statusBill: "",
    id: "",
  });
  const [importProcessDto, setImportProcessDto] = useState<ImportProcessDto[]>([
    {
      weighKemLon: [],
      weighKem2: [],
      weighKem3: [],
      weighRXo: [],
      weighR1: [],
      weighR2: [],
      weighR3: [],
      DateImport: "",
      idGarden: "",
      statusBill: "",
      id: "1",
    }
  ]);
  const [SelectCustomer, setSelectCustomer] = useState<Option[]>([]);
  // add or Update
  const [addOrUpdate, setaddOrUpdate] = useState(0);// 1 is add , 2 is update
  //state open adduser
  const [openAdd, setOpenAdd] = useState(false);
  //state open adduser
  const [open, setOpen] = useState(false);
  const [countAdd, setcountAdd] = useState<number>(2);
  const [modal2Open, setModal2Open] = useState(false);
  //================================================================
  const onAddOrUpdateCustomer = async () => {
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
    setCheckRefresh(true);
    await dispatch(CustomerAction.addCustomer(customer));
    //await dispatch(CustomerAction.searchCustomer(SearchParamCustomer));
    await timeout(500);
    refreshCustomer();
    setModal2Open(false)
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ImportProcessAction.searchImportProcess(SearchParam));// 
    dispatch(CustomerAction.searchCustomer(SearchParamCustomer));



  }, [dispatch, SearchParam, CheckRefresh, SearchParamCustomer, importProcessDto])

  // lấy data từ reducer 
  const importProcesss = useAppSelector((state) => state.importProcess.lstRespone);
  const customers = useAppSelector((state) => state.customer.lstRespone);
  console.log("TUANNNN: " + JSON.stringify(importProcesss));
  console.log("TUANNNN: " + JSON.stringify(customers));

  //Thay đổi Size chage
  const onShowSizeChange = (current: number, pageSize: number) => {

    setSearchParam({
      ...SearchParam,
      pageNumber: current,
      pageSize: pageSize,
    })

  };

  //select 
  const options: SelectProps['options'] = [];
  for (let i = 1; i < 200; i++) {
    const value = `${i}`;
    options.push({
      label: value,
      value
    });
  }
  for (let i = 1; i < 200; i++) {
    const value = `${i}`;
    options.push({
      label: value,
      value
    });
  }
  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const handleChangeKemLonAddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id){
        importProcessDto[i].weighKemLon = value
      }
    
    }
    const importProcessDtoChange = [...importProcessDto ] 
    setImportProcessDto(importProcessDtoChange)
    console.log(`selected K1 ${value}`);
    console.log(`selected K1 ${object.weighKemLon}`);
  };
  const handleChangeKem2AddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id)
        importProcessDto[i].weighKem2 = value
    }
    console.log(`selected K1 ${value}`);
    console.log(`selected K1 ${object.weighKemLon}`);
  };
  const handleChangeKem3AddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id)
        importProcessDto[i].weighKem3 = value
    }
    console.log(`selected K1 ${value}`);
    console.log(`selected K1 ${object.weighKemLon}`);
  };
  const handleChangeRXoAddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id)
        importProcessDto[i].weighRXo = value
    }
    console.log(`selected K1 ${value}`);
    console.log(`selected K1 ${object.weighKemLon}`);
  };
  const handleChangeR1AddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id)
        importProcessDto[i].weighR1 = value
    }
    console.log(`selected K1 ${value}`);
    console.log(`selected K1 ${object.weighKemLon}`);
  };
  const handleChangeR2AddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id)
        importProcessDto[i].weighR2 = value
    }
    console.log(`selected K1 ${value}`);
    console.log(`selected K1 ${object.weighKemLon}`);
  };
  const handleChangeR3AddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id)
        importProcessDto[i].weighR3 = value
    }
    console.log(`selected K1 ${value}`);
    console.log(`selected K1 ${object.weighKemLon}`);
  };

  //==========================================
  //search


  const Search = () => {
    dispatch(ImportProcessAction.searchImportProcess(SearchParam));
  }
  //Refresh 

  const refresh = async () => {
    const SearchParamChange = { ...SearchParam }
    setSearchParam(SearchParamChange)

  }
  const refreshCustomer = async () => {
    const SearchParamChange = { ...SearchParamCustomer }
    setSearchParamCustomer(SearchParamChange)
  }
  const onAdd = async () => {


  }
  // add or up date 
  const onAddOrUpdateUser = async () => {
    //validate
    if (ImportpriceDto.DateImport === "" || ImportpriceDto.DateImport === undefined) {
      openNotification("Ngày tạo không được để trống");
      return;
    }
    // add
    if (addOrUpdate === 1) {
      // const importProcess = {
      //   ...ImportpriceDto,

      // }
      // await dispatch(ImportProcessAction.addImportProcess([importProcess]));
    }
    // Update
    if (addOrUpdate === 2) {
      const importProcess = {
        ...ImportpriceDto,

      }
      await dispatch(ImportProcessAction.updateImportProcess(importProcess));

    }
    await timeout(500);
    refresh();
    setOpen(false);
  };
  function timeout(delay: any) {
    return new Promise(res => setTimeout(res, delay));
  }
  const setOption = () => {
    const temp: Option[] = []

    for (let i = 0; i < customers?.content?.length; i++) {
      const a: Option = {
        value: customers?.content[i].id,
        label: customers?.content[i].nameGarden
      }
      temp.push(a);
    }
    return temp;
  }

  const getFullDate = (date: string): string => {
    const dateAndTime = date.split('T');

    return dateAndTime[0].split('-').reverse().join('-');
  };
  // cột của Bảng==================================================================================
  const roleColumns: ColumnsType<importProcess> = [
    {
      title: 'Ngày',
      width: 80,
      dataIndex: 'dateImport',
      key: 'dateImport',
      fixed: 'left',
      render: ((date: string) => getFullDate(date))
    },
    {
      title: 'Tên vựa',
      width: 80,
      dataIndex: 'idGarden',
      key: 'idGarden',
      fixed: 'left',
      render: (_, record) => {
        function findArrayElementByTitle(array: any, title: any) {
          for (let i = 0; i < array?.length; i++) {
            if (array[i].id === title) return array[i].nameGarden
          }
          return null;
        }
        return (
          <div>
            {findArrayElementByTitle(customers?.content, record.idGarden)}
          </div>
        )
      }
    },
    {
      title: 'Kem Lớn',
      width: 90,
      dataIndex: 'priceKemLon',
      key: 'priceKemLon',
      fixed: 'left',
      render: (_, record) => {

        const listItems = record.weighKemLon?.map((d) => <Tag color='purple' key={d}>{d}</Tag>);
        return (
          <div>
            {listItems}
          </div>
        )
      }
    },
    {
      title: ' Kem 2',
      width: 90,
      dataIndex: 'weighKem2',
      key: 'weighKem2',
      fixed: 'left',
      render: (_, record) => {

        const listItems = record.weighKem2?.map((d) => <Tag color='purple' key={d}>{d}</Tag>);
        return (
          <div>
            {listItems}
          </div>
        )
      }
    },
    {
      title: ' Kem 3',
      width: 90,
      dataIndex: 'weighKem3',
      key: 'weighKem3',
      fixed: 'left',
      render: (_, record) => {

        const listItems = record.weighKem3?.map((d) => <Tag color='purple' key={d}>{d}</Tag>);
        return (
          <div>
            {listItems}
          </div>
        )
      }
    },
    {
      title: ' RXo',
      width: 90,
      dataIndex: 'weighRXo',
      key: 'weighRXo',
      fixed: 'left',
      render: (_, record) => {

        const listItems = record.weighRXo?.map((d) => <Tag color='purple' key={d}>{d}</Tag>);
        return (
          <div>
            {listItems}
          </div>
        )
      }
    },
    {
      title: ' R1',
      width: 90,
      dataIndex: 'weighR1',
      key: 'weighR1',
      fixed: 'left',

      render: (_, record) => {

        const listItems = record.weighR1?.map((d) => <Tag color='purple' key={d}>{d}</Tag>);
        return (
          <div>
            {listItems}
          </div>
        )
      }
    },
    {
      title: ' R2',
      width: 90,
      dataIndex: 'weighR2',
      key: 'weighR2',
      fixed: 'left',
      render: (_, record) => {

        const listItems = record.weighR2?.map((d) => <Tag color='purple' key={d}>{d}</Tag>);
        return (
          <div>
            {listItems}
          </div>
        )
      }
    },
    {
      title: ' R3',
      width: 90,
      dataIndex: 'weighR3',
      key: 'weighR3',
      fixed: 'left',
      render: (_, record) => {

        const listItems = record.weighR3?.map((d) => <Tag color='purple' key={d}>{d}</Tag>);
        return (
          <div>
            {listItems}
          </div>
        )
      }
    },
    {
      title: 'Trạng thái',
      width: 80,
      dataIndex: 'statusBill',
      key: 'statusBill',
      fixed: 'left',
      render: (_, record) => {
        switch (record.statusBill) {
          case "CHUA_THANH_TOAN":
            return (<Tag color='#e70103' >Chưa thanh toán</Tag>)
          case "DA_THANH_TOAN":
            return (<Tag color='#87d068' >Đã thanh toán</Tag>)
        }
        // return (
        //   <div>
        //     {record.statusBill}
        //   </div>
        // )
      }
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
            <div className="exportFile"
              onClick={() => exportFile(record.id)}
            >Xuất</div>
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
    // const tempMockData = [];
    // for (let i = 0; i < customers?.content?.length; i++) {
    //   const data = {
    //     value: customers.content[i].id,
    //     label: customers.content[i].nameGarden,
    //   };
    //   tempMockData.push(data);
    // }
    // setSelectCustomer(tempMockData);

    setTitle("Thêm mới ");
    // setState add or up date
    setaddOrUpdate(1);
    // open TAB
    setOpenAdd(true);
  };
  //exportFile

  const exportFile = async (id: any) => {
    //init state 

    setCheckRefresh(true);
    await dispatch(ImportProcessAction.exportBillImportProcess(id));
    await timeout(500);
    refresh();
  };
  // Show edit  
  const showEditDrawer = (record: any) => {
    //init state 
    console.log("showEditDrawer: ", record);
    setTitle("Sửa giá nhập");

    setImportpriceDto(
      {
        id: record.id,
        weighKemLon: record.weighKemLon,
        weighKem2: record.weighKem2,
        weighKem3: record.weighKem3,
        weighRXo: record.weighRXo,
        weighR1: record.weighR1,
        weighR2: record.weighR2,
        weighR3: record.weighR3,
        DateImport: record.DateImport,
        idGarden: record.idGarden,
        statusBill: record.statusBill,
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
        await dispatch(ImportProcessAction.deleteImportProcess(id));
        await timeout(500);
        refresh();
        setModal1Open(false)
      },
      onCancel() { setModal1Open(false) }
    });
  };

  const onCloseAdd = () => {
    setImportProcessDto([{
      weighKemLon: [],
      weighKem2: [],
      weighKem3: [],
      weighRXo: [],
      weighR1: [],
      weighR2: [],
      weighR3: [],
      DateImport: "",
      idGarden: "",
      statusBill: "",
      id: "1",
    }]);
    setcountAdd(2);
    setOpenAdd(false);
  };

  const onAddComponent = () => {
    setcountAdd(current => current + 1);
    var importProcessDtos: ImportProcessDto = {
      weighKemLon: [],
      weighKem2: [],
      weighKem3: [],
      weighRXo: [],
      weighR1: [],
      weighR2: [],
      weighR3: [],
      DateImport: "",
      idGarden: "",
      statusBill: "",
      id: countAdd + "",
    }
    importProcessDto.push(importProcessDtos);
    //setImportProcessDto(importProcessDto);
    console.log("TUAN:" + JSON.stringify(importProcessDto));
  };

  const onDeleteComponent = (object: ImportProcessDto, index: any) => {

    if (index > -1) { // only splice array when item is found
      importProcessDto.splice(index, 1); // remove one item only
    }
    //const temp = { ...importProcessDto };
    setImportProcessDto([...importProcessDto]);

    console.log("TUAN:" + JSON.stringify(importProcessDto));
  };

  const onClose = () => {
    setOpen(false);
  };
  // const onChangeProcessKemLon = (e: any) => {
  //   setImportpriceDto(
  //     {
  //       ...ImportpriceDto,
  //       ProcessKemLon: e.target.value
  //     }
  //   )
  // }
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

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };
  return (
    <div className="background">
      <div className="title">
        Quản lý nhập hàng
      </div>
      <div className="datatable">
        <div className="tool">
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
          <div className="total" >Tổng số :<b>{importProcesss.totalItem}</b> </div>

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
          dataSource={importProcesss.content}
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
            total={importProcesss.totalItem}
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
          {/* <Col span={12}>
            <label >Giá kem lớn (vnđ):</label>
            <Input placeholder="Nhập giá kem lớn(vnđ)" value={ImportpriceDto.ProcessKemLon} onChange={onChangeProcessKemLon} />
          </Col>
          <Col span={12}>
            <label >Giá kem 2 (vnđ):</label>
            <Input placeholder="Nhập giá kem 2 (vnđ)" value={ImportpriceDto.ProcessKem2} onChange={onChangeProcessKem2} />
          </Col> */}
        </Row>

        <div className="Submit">
          <Space style={{ display: 'flex' }}>
            <Button onClick={onClose}>Huỷ</Button>
            <Button style={{ background: '#d32f2f', borderColor: '#d32f2f' }} onClick={onAddOrUpdateUser} type="primary">
              Lưu
            </Button>
          </Space>
        </div>
      </Drawer>

      <Drawer
        title={Title}
        width={720}
        onClose={onCloseAdd}

        open={openAdd}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        {importProcessDto.map((anObjectMapped, index) => {
          return (
            <div>
              <div className="widget2">
                <Row className="row" gutter={16}>
                  <Col span={12}>
                    <label ><b>Tên vựa:</b></label>
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onChange={onChange}
                      onSearch={onSearch}
                      //options={SelectCustomer}
                      options={setOption()}
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }

                    />
                  </Col>
                  <Col span={12}>
                    <label >Kem lớn:</label>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      value={anObjectMapped.weighKemLon}
                      onChange={(a) => handleChangeKemLonAddElement(anObjectMapped, a)}
                      options={options}
                    />
                  </Col>
                </Row>
                <Row className="row" gutter={16}>
                  <Col span={12}>
                    <label >Kem 2:</label>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      //value={anObjectMapped.weighKem2}
                      //onChange={(a) => handleChangeKem2AddElement(anObjectMapped, a)}
                      options={options}
                    />
                  </Col>
                  <Col span={12}>
                    <label >Kem 3:</label>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      //value={anObjectMapped.weighKem3}
                      //onChange={(a) => handleChangeKem3AddElement(anObjectMapped, a)}
                      options={options}
                    />
                  </Col>
                </Row>
                <Row className="row" gutter={16}>
                  <Col span={12}>
                    <label >RXo:</label>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      //value={anObjectMapped.weighRXo}
                      //onChange={(a) => handleChangeRXoAddElement(anObjectMapped, a)}
                      options={options}
                    />
                  </Col>
                  <Col span={12}>
                    <label >R1:</label>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      //value={anObjectMapped.weighR1}
                      //onChange={(a) => handleChangeR1AddElement(anObjectMapped, a)}
                      options={options}
                    />
                  </Col>
                </Row>
                <Row className="row" gutter={16}>
                  <Col span={12}>
                    <label >R2:</label>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      //value={anObjectMapped.weighR2}
                      //onChange={(a) => handleChangeR2AddElement(anObjectMapped, a)}
                      options={options}
                    />
                  </Col>
                  <Col span={12}>
                    <label >R3:</label>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      //value={anObjectMapped.weighR3}
                     // onChange={(a) => handleChangeR3AddElement(anObjectMapped, a)}
                      options={options}
                    />
                  </Col>
                </Row>
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Space style={{ display: 'flex' }}>

                    <Button style={{ background: '#d32f2f', borderColor: '#d32f2f' }} onClick={onAdd} type="primary">Lưu</Button>
                    <Button onClick={() => onDeleteComponent(anObjectMapped, index)} >
                      Xoá
                    </Button>
                  </Space>
                </div>

              </div>
              <br />
            </div>
          );
        })}


        <div className="Submit">
          <Space style={{ display: 'flex' }}>
            <Button icon={<PlusOutlined />} style={{ background: '#57a4da', borderColor: '#57a4da' }} onClick={onAddComponent} type="primary"></Button>
            <Button icon={<PlusOutlined />} style={{ background: '#87d068', borderColor: '#87d068' }} onClick={() => setModal2Open(true)} type="primary">Thêm vựa</Button>
            <Button style={{ background: '#d32f2f', borderColor: '#d32f2f' }} onClick={onAddOrUpdateUser} type="primary">
              Lưu
            </Button>
            <Button onClick={onCloseAdd}>Huỷ</Button>
          </Space>
        </div>
      </Drawer>

      <Modal
        title="Thêm mới khách hàng"
        centered
        open={modal2Open}
        onOk={() => onAddOrUpdateCustomer()}
        onCancel={() => setModal2Open(false)}
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
      </Modal>
    </div>
  )
}

export default Datatable