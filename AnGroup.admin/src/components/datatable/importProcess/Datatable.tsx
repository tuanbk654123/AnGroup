import "./datatable.scss";
import { useEffect, useState } from "react";
import { ImportProcessAction } from '../../../features/importProcess/importProcessSlice';
import { CustomerAction } from '../../../features/customer/customerSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import PhoneInput from 'react-phone-number-input'
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, ExportOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined
} from '@ant-design/icons';
import { Pagination, Table, Button, Input, DatePicker, Drawer, Row, Col, Space, Modal, Select, SelectProps, Tag, DatePickerProps, Popover } from 'antd';

import { importProcess, SearchImportProcessDto, CustomerDto, searchCustomerDto, ImportProcessDto } from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';

import { openNotification } from "../../notice/notification";
import moment from "moment";


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
    statusBill:undefined,
    toDate: ""
  });
  const [SearchParamCustomer, setSearchParamCustomer] = useState<searchCustomerDto>({
    pageNumber: 1,
    pageSize: 200,
    Name: "",
    AccountNumber: "",
    fromDate: "",
    NameGarden: "",
    PhoneNumber: "",
    toDate: ""
  });
  const [customerDto, setcustomerDto] = useState<CustomerDto>({
    id: "",
    Name: "",
    AccountNumber: "",
    bankName: "",
    Address: "",
    PhoneNumber: "",
    nameGarden: ""
  });
  const [CheckRefresh, setCheckRefresh] = useState(false);
  const [Title, setTitle] = useState("");

  const [importProcessDto, setImportProcessDto] = useState<ImportProcessDto[]>([
    {
      weighKemLon: [],
      weighKem2: [],
      weighKem3: [],
      weighRXo: [],
      weighR1: [],
      weighR2: [],
      weighR3: [],
      dateImport: "",
      idGarden: "",
      statusBill: "",
      id: "1",
    }
  ]);
  const [UpdateImportProcessDto, setUpdateImportProcessDto] = useState<ImportProcessDto>(
    {
      weighKemLon: undefined,
      weighKem2: undefined,
      weighKem3: undefined,
      weighRXo: undefined,
      weighR1: undefined,
      weighR2: undefined,
      weighR3: undefined,
      dateImport: "",
      idGarden: "",
      statusBill: "",
      id: "",
    }
  );

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
      openNotification("T??n v???a kh??ng ???????c ????? tr???ng");
      return;
    }
    if (customerDto.AccountNumber === "" || customerDto.AccountNumber === undefined) {
      openNotification("S??? t??i kho???n kh??ng ???????c ????? tr???ng");
      return;
    }
    if (customerDto.Name === "" || customerDto.Name === undefined) {
      openNotification("T??n t??i kho???n kh??ng ???????c ????? tr???ng");
      return;
    }
    if (customerDto.bankName === "" || customerDto.bankName === undefined) {
      openNotification("T??n ng??n h??ng kh??ng ???????c ????? tr???ng");
      return;
    }
    if (customerDto.Address === "" || customerDto.Address === undefined) {
      openNotification("?????a ch??? kh??ng ???????c ????? tr???ng");
      return;
    }
    if (customerDto.PhoneNumber === "" || customerDto.PhoneNumber === undefined) {
      openNotification("S??? ??i???n tho???i kh??ng ???????c ????? tr???ng");
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

  // l???y data t??? reducer 
  const importProcesss = useAppSelector((state) => state.importProcess.lstRespone);
  const customers = useAppSelector((state) => state.customer.lstRespone);
  // console.log("TUANNNN: " + JSON.stringify(importProcesss));
  // console.log("TUANNNN: " + JSON.stringify(customers));

  //Thay ?????i Size chage
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
  const handleChangeKemLonAddElementUpdate = (value: number[]) => {
    setUpdateImportProcessDto(
      {
        ...UpdateImportProcessDto,
        weighKemLon: value
      }
    )
  };
  const handleChangeKem2AddElementUpdate = (value: number[]) => {
    setUpdateImportProcessDto(
      {
        ...UpdateImportProcessDto,
        weighKem2: value
      }
    )
  };
  const handleChangeKem3AddElementUpdate = (value: number[]) => {
    setUpdateImportProcessDto(
      {
        ...UpdateImportProcessDto,
        weighKem3: value
      }
    )
  };
  const handleChangeRXoAddElementUpdate = (value: number[]) => {
    setUpdateImportProcessDto(
      {
        ...UpdateImportProcessDto,
        weighRXo: value
      }
    )
  };
  const handleChangeR1AddElementUpdate = (value: number[]) => {
    setUpdateImportProcessDto(
      {
        ...UpdateImportProcessDto,
        weighR1: value
      }
    )
  };
  const handleChangeR2AddElementUpdate = (value: number[]) => {
    setUpdateImportProcessDto(
      {
        ...UpdateImportProcessDto,
        weighR2: value
      }
    )
  };
  const handleChangeR3AddElementUpdate = (value: number[]) => {
    setUpdateImportProcessDto(
      {
        ...UpdateImportProcessDto,
        weighR3: value
      }
    )
  };
  const handleChangeKemLonAddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id) {
        importProcessDto[i].weighKemLon = value
      }

    }
    const importProcessDtoChange = [...importProcessDto]
    setImportProcessDto(importProcessDtoChange)
  };
  const handleChangeKem2AddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id)
        importProcessDto[i].weighKem2 = value
    }
    const importProcessDtoChange = [...importProcessDto]
    setImportProcessDto(importProcessDtoChange)
  };
  const handleChangeKem3AddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id)
        importProcessDto[i].weighKem3 = value
    }
    const importProcessDtoChange = [...importProcessDto]
    setImportProcessDto(importProcessDtoChange)
  };
  const handleChangeRXoAddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id)
        importProcessDto[i].weighRXo = value
    }
    const importProcessDtoChange = [...importProcessDto]
    setImportProcessDto(importProcessDtoChange)
  };
  const handleChangeR1AddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id)
        importProcessDto[i].weighR1 = value
    }
    const importProcessDtoChange = [...importProcessDto]
    setImportProcessDto(importProcessDtoChange)
  };
  const handleChangeR2AddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id)
        importProcessDto[i].weighR2 = value
    }
    const importProcessDtoChange = [...importProcessDto]
    setImportProcessDto(importProcessDtoChange)
  };
  const handleChangeR3AddElement = (object: any, value: number[]) => {
    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id)
        importProcessDto[i].weighR3 = value
    }
    const importProcessDtoChange = [...importProcessDto]
    setImportProcessDto(importProcessDtoChange)
  };

  //==========================================
  //search


  const Search = () => {
    dispatch(ImportProcessAction.searchImportProcess(SearchParam));
  }
  //Refresh 

  const refresh = async () => {
    const SearchParamChange = {
      ...SearchParam,
      pageNumber: 1,
      pageSize: 10,
      statusBill:undefined,
      fromDate: "",
      toDate: ""
    }
    setSearchParam(SearchParamChange)

  }
  const refreshCustomer = async () => {
    const SearchParamChange = { ...SearchParamCustomer }
    setSearchParamCustomer(SearchParamChange)
  }
  const onAdd = async (anObjectMapped: any, index: any) => {

    var date = new Date();

    // Get year, month, and day part from the date
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = year + "-" + month + "-" + day;
    console.log(formattedDate);  // Prints: 04-05-2022
    anObjectMapped.dateImport = formattedDate;
    anObjectMapped.statusBill = "CHUA_THANH_TOAN";
    await dispatch(ImportProcessAction.addImportProcess([anObjectMapped]));

    //

    if (index > -1) { // only splice array when item is found
      importProcessDto.splice(index, 1); // remove one item only
    }
    //const temp = { ...importProcessDto };
    setImportProcessDto([...importProcessDto]);
    // N???u h???t ph???n t??? th?? ????ng tab
    if (importProcessDto.length === 0) {
      onCloseAdd();
    }


  }
  const onAddAll = async () => {

    var date = new Date();
    // Get year, month, and day part from the date
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = year + "-" + month + "-" + day;


    for (let i = 0; i < importProcessDto?.length; i++) {

      importProcessDto[i].dateImport = formattedDate;
      importProcessDto[i].statusBill = "CHUA_THANH_TOAN";
    }


    dispatch(ImportProcessAction.addImportProcess(importProcessDto));

    // ????ng tab
    await timeout(500);
    refresh();
    onCloseAdd();
  }
  // add or up date 
  const onAddOrUpdateUser = async () => {
    let date =  UpdateImportProcessDto.dateImport.split('T')[0];
    //validate
    if (UpdateImportProcessDto.dateImport === "" || UpdateImportProcessDto.dateImport === undefined) {
      openNotification("Ng??y t???o kh??ng ???????c ????? tr???ng");
      return;
    }
    // add
    if (addOrUpdate === 1) {
    }
    // Update
    if (addOrUpdate === 2) {
      const importProcess = {
        ...UpdateImportProcessDto,
        dateImport: date+"T07:00:00.000Z",
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

  const setValueOption = (object: any) => {

    for (let i = 0; i < customers?.content?.length; i++) {
      if (customers?.content[i].id === object.idGarden) {
        return customers?.content[i].nameGarden
      }
    }
    return "";
  }


  const getFullDate = (date: string): string => {
    const dateAndTime = date.split('T');

    return dateAndTime[0].split('-').reverse().join('-');
  };
  // c???t c???a B???ng==================================================================================
  const roleColumns: ColumnsType<importProcess> = [
    {
      title: 'Ng??y',
      width: 70,
      dataIndex: 'dateImport',
      key: 'dateImport',
      //fixed: 'left',
      render: ((date: string) => getFullDate(date))
    },
    {
      title: 'T??n v???a',
      width: 70,
      dataIndex: 'idGarden',
      key: 'idGarden',
      //fixed: 'left',
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
      title: 'Tr???ng th??i',
      width: 90,
      dataIndex: 'statusBill',
      key: 'statusBill',
      //fixed: 'left',
      render: (_, record) => {
        switch (record.statusBill) {
          case "CHUA_THANH_TOAN":
            return (<Tag icon={<CloseCircleOutlined />} color='#e70103' >Ch??a thanh to??n</Tag>)
          case "DA_THANH_TOAN":
            return (<Tag icon={<CheckCircleOutlined />} color='#87d068' >???? thanh to??n</Tag>)
        }
      }
    },

    {
      title: 'Kem L???n',
      width: 90,
      dataIndex: 'priceKemLon',
      key: 'priceKemLon',
      //fixed: 'left',
      // ellipsis: true,
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
      //fixed: 'left',
      // ellipsis: true,
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
      //fixed: 'left',
      // ellipsis: true,
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
      //fixed: 'left',
      // ellipsis: true,

      render: (_, record) => {

        const listItems = record.weighRXo?.map((d) => (
          <Tag color='purple' key={d}>{d}</Tag>
        )
        );
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
      //fixed: 'left',
      // ellipsis: true,
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
      //fixed: 'left',
      // ellipsis: true,
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
      //fixed: 'left',
      // ellipsis: true,
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
      title: 'H??nh ?????ng',
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
            >S???a</div>
            <div className="exportFile"
              onClick={() => exportFile(record.id)}
            >Xu???t</div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(record.id)}
            >
              X??a
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
    setTitle("Th??m m???i ");
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
    setTitle("S???a qu?? tr??nh nh???p");
    setUpdateImportProcessDto(
      {
        id: record.id,
        weighKemLon: record.weighKemLon,
        weighKem2: record.weighKem2,
        weighKem3: record.weighKem3,
        weighRXo: record.weighRXo,
        weighR1: record.weighR1,
        weighR2: record.weighR2,
        weighR3: record.weighR3,
        dateImport: record.dateImport,
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
      title: 'X??a gi?? nh???p',
      content: 'B???n c?? mu???n x??a gi?? nh???p n??y?',
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
      dateImport: "",
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
      dateImport: "",
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
  const onChangebankName = (value: string) => {
    setcustomerDto(
      {
        ...customerDto,
        bankName: value
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
        PhoneNumber: e
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

  const onChange = (value: string, object: any) => {
    //console.log(`selected ${value}`);

    for (let i = 0; i < importProcessDto?.length; i++) {
      if (importProcessDto[i].id === object.id) {
        importProcessDto[i].idGarden = value
      }

    }
    const importProcessDtoChange = [...importProcessDto]
    setImportProcessDto(importProcessDtoChange)
  };

  const onChangeUpdate = (value: string) => {

    setUpdateImportProcessDto(
      {
        ...UpdateImportProcessDto,
        idGarden: value
      }
    )

  };
  const onChangeDateUpdate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setUpdateImportProcessDto(
      {
        ...UpdateImportProcessDto,
        dateImport: dateString
      }
    )
  };
  const onSearch = (value: string) => {
    console.log('search:', value);
  };
  const onChangeDatea: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setCheckRefresh(true);
    dispatch(ImportProcessAction.exportReportImportProcess(dateString));
    timeout(500);
    refresh();
  };
  const content = (
    <div>
      <DatePicker onChange={onChangeDatea} />
    </div>
  );
  const onChangeStatus = (value: string) => {
    console.log(`selected ${value}`);

    const SearchParamChange = {
      ...SearchParam,
      pageNumber: 1,
      pageSize: 10,
      statusBill:value,
      fromDate: "",
      toDate: ""
    }
    setSearchParam(SearchParamChange)
 
  };
  
  const onSearchStatus = (value: string) => {
    //console.log('search:', value);
  };
  
  return (
    <div className="background">
      <div className="title">
        Qu???n l?? nh???p h??ng
      </div>
      <div className="datatable">
        <div className="tool">
          <div className="btnAddHover" style={{ width: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => showDrawer()}>
            <PlusOutlined style={{ paddingInline: '5px', color: '#d32f2f' }} /> <div style={{ paddingInline: '5px', color: '#d32f2f', fontFamily: 'Arial' }}>Th??m m???i</div>
          </div>
          <Popover content={content} title="Ch???n ng??y">

            <div className="btnAddHover" style={{ width: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} >
              <ExportOutlined style={{ paddingInline: '5px', color: '#d32f2f' }} /> <div style={{ paddingInline: '5px', color: '#d32f2f', fontFamily: 'Arial' }}>Xu???t b??o c??o</div>
            </div>
          </Popover>
          <div className="btnAddHover" style={{ width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => refresh()}>
            <ReloadOutlined style={{ paddingInline: '5px', color: '#d32f2f' }} /> <div style={{ paddingInline: '5px', color: '#d32f2f', fontFamily: 'Arial', }}>L??m m???i</div>
          </div>
          <div style={{ width: '50px', display: 'flex', justifyContent: 'center', borderLeft: '0.5px solid lightgrey', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }}>
            <BarsOutlined style={{ color: '#d32f2f' }}></BarsOutlined>
          </div>
        </div>
        <div className="datatableTitle">
          <div className="total" >T???ng s??? :<b>{importProcesss.totalItem}</b> </div>

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
                placeholder="Ch???n tr???ng th??i"
                optionFilterProp="children"
                onChange={onChangeStatus}
                onSearch={onSearchStatus}
                value={SearchParam.statusBill}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  {
                    value: 'DA_THANH_TOAN',
                    label: '???? Thanh to??n',
                  },
                  {
                    value: 'CHUA_THANH_TOAN',
                    label: 'Ch??a thanh to??n',
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
          <Col span={12}>
            <label ><b>T??n v???a:</b></label>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChangeUpdate}
              onSearch={onSearch}
              value={UpdateImportProcessDto.idGarden}
              options={setOption()}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }

            />
          </Col>
          <Col span={12}>
            <label >Kem l???n:</label>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              value={UpdateImportProcessDto.weighKemLon}
              onChange={handleChangeKemLonAddElementUpdate}
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
              value={UpdateImportProcessDto.weighKem2}
              onChange={handleChangeKem2AddElementUpdate}
              options={options}
            />
          </Col>
          <Col span={12}>
            <label >Kem 3:</label>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              value={UpdateImportProcessDto.weighKem3}
              onChange={handleChangeKem3AddElementUpdate}
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
              value={UpdateImportProcessDto.weighRXo}
              onChange={handleChangeRXoAddElementUpdate}
              options={options}
            />
          </Col>
          <Col span={12}>
            <label >R1:</label>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              value={UpdateImportProcessDto.weighR1}
              onChange={handleChangeR1AddElementUpdate}
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
              value={UpdateImportProcessDto.weighR2}
              onChange={handleChangeR2AddElementUpdate}
              options={options}
            />
          </Col>
          <Col span={12}>
            <label >R3:</label>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              value={UpdateImportProcessDto.weighR3}
              onChange={handleChangeR3AddElementUpdate}
              options={options}
            />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Ng??y:</label>
            <DatePicker value={moment(UpdateImportProcessDto.dateImport, dateFormat)} onChange={onChangeDateUpdate} format={dateFormat} style={{ width: '100%' }} />

          </Col>
          <Col span={12}>

          </Col>
        </Row>
        <div className="Submit"  style={{ display: 'flex' , paddingTop:"30px"}}>
          <Space style={{ display: 'flex' }}>
            <Button onClick={onClose}>Hu???</Button>
            <Button style={{ background: '#d32f2f', borderColor: '#d32f2f' }} onClick={onAddOrUpdateUser} type="primary">
              L??u
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
                    <label ><b>T??n v???a:</b></label>
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onChange={(a) => onChange(a, anObjectMapped)}
                      onSearch={onSearch}
                      value={setValueOption(anObjectMapped)}
                      options={setOption()}
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }

                    />
                  </Col>
                  <Col span={12}>
                    <label >Kem l???n:</label>
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
                      value={anObjectMapped.weighKem2}
                      onChange={(a) => handleChangeKem2AddElement(anObjectMapped, a)}
                      options={options}
                    />
                  </Col>
                  <Col span={12}>
                    <label >Kem 3:</label>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      value={anObjectMapped.weighKem3}
                      onChange={(a) => handleChangeKem3AddElement(anObjectMapped, a)}
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
                      value={anObjectMapped.weighRXo}
                      onChange={(a) => handleChangeRXoAddElement(anObjectMapped, a)}
                      options={options}
                    />
                  </Col>
                  <Col span={12}>
                    <label >R1:</label>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      value={anObjectMapped.weighR1}
                      onChange={(a) => handleChangeR1AddElement(anObjectMapped, a)}
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
                      value={anObjectMapped.weighR2}
                      onChange={(a) => handleChangeR2AddElement(anObjectMapped, a)}
                      options={options}
                    />
                  </Col>
                  <Col span={12}>
                    <label >R3:</label>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      value={anObjectMapped.weighR3}
                      onChange={(a) => handleChangeR3AddElement(anObjectMapped, a)}
                      options={options}
                    />
                  </Col>
                </Row>
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Space style={{ display: 'flex' }}>

                    <Button style={{ background: '#d32f2f', borderColor: '#d32f2f' }} onClick={() => onAdd(anObjectMapped, index)} type="primary">L??u</Button>
                    <Button onClick={() => onDeleteComponent(anObjectMapped, index)} >
                      Xo??
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
            <Button icon={<PlusOutlined />} style={{ background: '#87d068', borderColor: '#87d068' }} onClick={() => setModal2Open(true)} type="primary">Th??m v???a</Button>
            <Button style={{ background: '#d32f2f', borderColor: '#d32f2f' }} onClick={onAddAll} type="primary">
              L??u t???t c???
            </Button>
            <Button onClick={onCloseAdd}>Hu???</Button>
          </Space>
        </div>
      </Drawer>

      <Modal
        title="Th??m m???i kh??ch h??ng"
        centered
        open={modal2Open}
        onOk={() => onAddOrUpdateCustomer()}
        onCancel={() => setModal2Open(false)}
      >
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >T??n v???a:</label>
            <Input placeholder="Nh???p t??n v???a" value={customerDto.nameGarden} onChange={onChangenameGarden} />
          </Col>
          <Col span={12}>
            <label >S??? t??i kho???n:</label>
            <Input placeholder="Nh???p s??? t??i kho???n" value={customerDto.AccountNumber} onChange={onChangeAccountNumber} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >T??n t??i kho???n:</label>
            <Input placeholder="Nh???p t??n t??i kho???n" value={customerDto.Name} onChange={onChangeName} />
          </Col>
          <Col span={12}>
            <label >T??n ng??n h??ng:</label>
            {/* <Input placeholder="Nh???p t??n ng??n h??ng" value={customerDto.bankName} onChange={onChangebankName} /> */}
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Search to Select"
              onChange={onChangebankName}
              value={customerDto.bankName}
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={[
                {
                  value: 'CBBANK',
                  label: 'CBBANK (Ng??n h??ng TMCP X??y D???ng)',
                },
                {
                  value: 'GPBANK',
                  label: 'GPBANK (Ng??n h??ng TMCP D???u Kh?? To??n C???u)',
                },
                {
                  value: 'OCEANBANK',
                  label: 'OCEANBANK (Ng??n h??ng TMCP X??y D???ng)',
                },
                {
                  value: 'AGRIBANK',
                  label: 'AGRIBANK (Ng??n h??ng TMCP N??ng Nghi???p v?? Ph??t tri???n n??ng th??n Vi???t Nam)',
                },
                {
                  value: 'Hong_Leong_Bank_Vietnam',
                  label: 'Hong_Leong_Bank_Vietnam (Ng??n h??ng 100% v???n n?????c ngo??i)',
                },
                {
                  value: 'Public_Bank',
                  label: 'Public_Bank (Ng??n h??ng 100% v???n n?????c ngo??i)',
                },
                {
                  value: 'ANZ',
                  label: 'ANZ (Ng??n h??ng ANZ Vi???t Nam)',
                },
                {
                  value: 'Hong_Leong_Bank',
                  label: 'Hong_Leong_Bank (Hong Leong Bank Vietnam)',
                },
                {
                  value: 'Standard_Chartered_Bank',
                  label: 'Standard_Chartered_Bank (Shinhan Bank Vietnam Limited-SHBVN)',
                },
                {
                  value: 'HSBC',
                  label: 'HSBC (Hongkong-Shanghai Bank)',
                },
                {
                  value: 'Public_Bank',
                  label: 'Public_Bank (Ng??n h??ng 100% v???n n?????c ngo??i)',
                },
                {
                  value: 'COOP_BANK',
                  label: 'COOP_BANK (Ng??n h??ng H???p t??c x?? Vi???t Nam)',
                },
                {
                  value: 'VRB',
                  label: 'VRB (Ng??n h??ng li??n doanh Vi???t-Nga)',
                },
                {
                  value: 'Indovina_Bank',
                  label: 'Indovina_Bank (Ng??n h??ng TNHH Indovina)',
                },
                {
                  value: 'VIETBANK',
                  label: 'VIETBANK (Ng??n h??ng TMCP Viet Nam Th????ng T??n)',
                },
                {
                  value: 'NCB',
                  label: 'NCB (Ng??n h??ng 100% v???n n?????c ngo??i)',
                },
                {
                  value: 'PGBANK',
                  label: 'PGBANK (Ng??n h??ng TMCP X??ng d???u Petrolimex)',
                },
                {
                  value: 'SAIGONBANK',
                  label: 'SAIGONBANK (Ng??n h??ng TMCP S??i G??n C??ng Th????ng)',
                },
                {
                  value: 'BAOVIET_BANK',
                  label: 'BAOVIET_BANK (Ng??n h??ng TMCP B???o Vi???t)',
                },
                {
                  value: 'VIETCAPITAL',
                  label: 'VIETCAPITAL (Ng??n h??ng TMCP B???n Vi???t)',
                },
                {
                  value: 'KIENLONGBANK',
                  label: 'KIENLONGBANK (Ng??n h??ng TMCP Ki??n Long)',
                },
                {
                  value: 'NAMABANK',
                  label: 'NAMABANK (Ng??n h??ng TMCP Nam ??)',
                },
                {
                  value: 'VIETABANK',
                  label: 'VIETABANK (Ng??n h??ng TMCP Vi???t ??)',
                },
                {
                  value: 'DONGABANK',
                  label: 'DONGABANK (Ng??n h??ng TMCP ????ng ??)',
                },
                {
                  value: 'BAC_A_BANK',
                  label: 'BAC_A_BANK (Ng??n h??ng TMCP B???c ??)',
                },
                {
                  value: 'SEABANK',
                  label: 'SEABANK (Ng??n h??ng TMCP ????ng Nam ??)',
                },
                {
                  value: 'ABBANK',
                  label: 'ABBANK (Ng??n h??ng TMCP An B??nh)',
                },
                {
                  value: 'Lienviet_Post_Bank',
                  label: 'Lienviet_Post_Bank (Ng??n h??ng TMCP Li??n Vi???t)',
                },
                {
                  value: 'OCB',
                  label: 'OCB (Ng??n h??ng TMCP Ph????ng ????ng)',
                },
                {
                  value: 'TPBANK',
                  label: 'TPBANK (Ng??n h??ng TMCP Ti??n Phong)',
                },
                {
                  value: 'TECHCOMBANK',
                  label: 'TECHCOMBANK (Ng??n h??ng TMCP K??? Th????ng)',
                },
                {
                  value: 'PVcomBank',
                  label: 'PVcomBank (Ng??n h??ng TMCP PVCombank)',
                },
                {
                  value: 'VIB',
                  label: 'VIB (Ng??n h??ng TMCP Qu???c T???)',
                },
                {
                  value: 'MSB',
                  label: 'MSB (Ng??n h??ng TMCP H??ng H???i)',
                },
                {
                  value: 'HDBANK',
                  label: 'HDBANK (Ng??n h??ng TMCP Ph??t Tri???n TP HCM)',
                },
                {
                  value: 'SHB',
                  label: 'SHB (Ng??n h??ng TMCP S??i G??n H?? N???i)',
                },
                {
                  value: 'EXIMBANK',
                  label: 'EXIMBANK (Ng??n h??ng TMCP Xu???t Nh???p Kh???u)',
                },
                {
                  value: 'ACB',
                  label: 'ACB (Ng??n h??ng TMCP ?? Ch??u)',
                },
                {
                  value: 'SCB',
                  label: 'SCB (Ng??n h??ng TMCP S??i G??n)',
                },
                {
                  value: 'VPBANK',
                  label: 'VPBANK (Ng??n h??ng TMCP Vi???t Nam Th???nh V?????ng)',
                },
                {
                  value: 'MBBANK',
                  label: 'MBBANK (Ng??n h??ng TMCP Qu??n ?????i)',
                },
                {
                  value: 'SACOMBANK',
                  label: 'SACOMBANK (Ng??n h??ng TMCP S??i G??n Th????ng T??n)',
                },
                {
                  value: 'VIETCOMBANK',
                  label: 'VIETCOMBANK (Ng??n h??ng TMCP Ngo???i th????ng)',
                },
                {
                  value: 'BIDV',
                  label: 'BIDV (Ng??n h??ng TMCP ?????u T?? Ph??t Tri???n Vi???t Nam)',
                },
                {
                  value: 'VIETINBANK',
                  label: 'VIETINBANK (Ng??n h??ng TMCP C??ng Th????ng)',
                }
              ]}
            />
          </Col>
        </Row>  <Row className="row" gutter={16}>
          <Col span={12}>
            <label >?????a ch???:</label>
            <Input placeholder="Nh???p ?????a ch???" value={customerDto.Address} onChange={onChangeAddress} />
          </Col>
          <Col span={12}>
            <label >S??? ??i???n tho???i:</label>
            {/* <Input placeholder="Nh???p s??? ??i???n tho???i" value={customerDto.PhoneNumber} onChange={onChangePhoneNumber} /> */}
            <PhoneInput style={{ with: "100%", height: "30px", display: "flex" }} defaultCountry="VN" placeholder="Nh???p s??? ??i???n tho???i" value={customerDto.PhoneNumber} onChange={onChangePhoneNumber} />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default Datatable