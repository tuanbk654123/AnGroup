
import "./datatable.scss";
import { useEffect, useRef, useState } from "react";
import { ExportProcessAction } from '../../../features/exportProcess/exportProcessSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import { ExclamationCircleOutlined, ExportOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
import {
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined
} from '@ant-design/icons';
import { Pagination, Table, Button, Input, DatePicker, Drawer, Row, Col, Space, DatePickerProps, Modal, Tag, InputRef, Popover } from 'antd';

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
    const SearchParamChange = { ...SearchParam,
      pageNumber: 1,
      pageSize: 10,
  
      fromDate: "",
      toDate: "" }
    setSearchParam(SearchParamChange)

  }
  // add or up date 

  const onAddOrUpdateUser = async () => {
    // set lại giứ trị tag 
    const orange = tags.map(d => (
      parseInt(d, 10)
    ));
    const red = tagsRed.map(d => (
      parseInt(d, 10)
    ));
    const blue = tagsBlue.map(d => (
      parseInt(d, 10)
    ));
    const green = tagsGreen.map(d => (
      parseInt(d, 10)
    ));
    // add
    if (addOrUpdate === 1) {
      const exportProcess = {
        ...exportProcessDto,
        weighOrange: orange,
        weighRed: red,
        weighBlue: blue,
        weighGreen: green,
        id: ""
      }
      dispatch(ExportProcessAction.addExportProcess(exportProcess));
    }
    // Update
    if (addOrUpdate === 2) {

      const exportProcess = {
        ...exportProcessDto,
        weighOrange: orange,
        weighRed: red,
        weighBlue: blue,
        weighGreen: green
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
      title: 'Tổng cam (kg)',
      width: 50,
      dataIndex: 'sumOrange',
      key: 'sumOrange',
      fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)

        );
      },
    },
    {
      title: 'Tổng đỏ (kg)',
      width: 50,
      dataIndex: 'sumRed',
      key: 'sumRed',
      fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)
        );
      },
    },
    {
      title: 'Tổng xanh lá (kg)',
      width: 50,
      dataIndex: 'sumBlue',
      key: 'sumBlue',
      fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)
        );
      },
    },
    {
      title: 'Tổng xanh dương (kg)',
      width: 50,
      dataIndex: 'sumGreen',
      key: 'sumGreen',
      fixed: 'left',
      render: (value: any) => {
        return (
          new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)
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
    const today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    setTags([]);
    settagsBlue([]);
    settagsGreen([]);
    settagsRed([]);
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
      dateExport: date,


    })
    setTitle("Thêm mới ");
    // setState add or up date
    setaddOrUpdate(1);
    // open TAB
    setOpen(true);
  };
  // Show edit  
  const showEditDrawer = (record: any) => {
    //init state 
    console.log("showEditDrawer: ", record);
    setTitle("Sửa");

    setexportProcessDto(
      {
        ...exportProcessDto,

        SumOrange: record.SumOrange,
        SumRed: record.SumRed,
        SumGreen: record.SumGreen,
        SumBlue: record.SumBlue,

        weighOrange: record.weighOrange,
        weighRed: record.weighRed,
        weighGreen: record.weighGreen,
        weighBlue: record.weighBlue,

        countOrange: record.countOrange,
        countRed: record.countRed,
        countGreen: record.countGreen,
        countBlue: record.countBlue,

        dateExport: record.dateExport,
        id: record.id,
      }

    )

    // set lại giứ trị tag 
    setTags(record.weighOrange);
    settagsRed(record.weighRed);
    settagsBlue(record.weighBlue);
    settagsGreen(record.weighGreen);

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
      title: 'Xóa ',
      content: 'Bạn có muốn xóa quá trình này?',
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


  const onChange: DatePickerProps['onChange'] = (date, dateString: string) => {
    //console.log(date, dateString);

    setexportProcessDto(
      {
        ...exportProcessDto,
        dateExport: dateString
      }
    )
  };
  const onChangePriceOrange = (e: any) => {
    setexportProcessDto(
      {
        ...exportProcessDto,
        countOrange: parseInt(e.target.value)
      }
    )
  }
  const onChangePriceRed = (e: any) => {
    setexportProcessDto(
      {
        ...exportProcessDto,
        countRed: parseInt(e.target.value)
      }
    )
  }
  const onChangePriceBlue = (e: any) => {
    setexportProcessDto(
      {
        ...exportProcessDto,
        countBlue: parseInt(e.target.value)
      }
    )
  }
  const onChangePriceGreen = (e: any) => {
    setexportProcessDto(
      {
        ...exportProcessDto,
        countGreen: parseInt(e.target.value)
      }
    )
  }
  //================================================================================
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);


  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        color="orange"
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };
  const tagChild = tags.map(forMap);
  //RED===========================================================================
  const [tagsRed, settagsRed] = useState<string[]>([]);
  const [inputVisibleRed, setinputVisibleRed] = useState<boolean>(false);
  const [inputValueRed, setinputValueRed] = useState('');
  const inputRefRed = useRef<InputRef>(null);


  const handleCloseRed = (removedTag: string) => {
    const newtagsRed = tagsRed.filter((tag) => tag !== removedTag);
    console.log(newtagsRed);
    settagsRed(newtagsRed);
  };

  const showInputRed = () => {
    setinputVisibleRed(true);
  };

  const handleInputChangeRed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueRed(e.target.value);
  };

  const handleInputConfirmRed = () => {
    if (inputValueRed && tagsRed.indexOf(inputValueRed) === -1) {
      settagsRed([...tagsRed, inputValueRed]);
    }
    setinputVisibleRed(false);
    setinputValueRed('');
  };

  const forMapRed = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        color="red"
        onClose={(e) => {
          e.preventDefault();
          handleCloseRed(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };
  const tagChildRed = tagsRed.map(forMapRed);
  //Green
  const [tagsGreen, settagsGreen] = useState<string[]>([]);
  const [inputVisibleGreen, setinputVisibleGreen] = useState<boolean>(false);
  const [inputValueGreen, setinputValueGreen] = useState('');
  const inputRefGreen = useRef<InputRef>(null);


  const handleCloseGreen = (removedTag: string) => {
    const newtagsGreen = tagsGreen.filter((tag) => tag !== removedTag);
    console.log(newtagsGreen);
    settagsGreen(newtagsGreen);
  };

  const showInputGreen = () => {
    setinputVisibleGreen(true);
  };

  const handleInputChangeGreen = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueGreen(e.target.value);
  };

  const handleInputConfirmGreen = () => {
    if (inputValueGreen && tagsGreen.indexOf(inputValueGreen) === -1) {
      settagsGreen([...tagsGreen, inputValueGreen]);
    }
    setinputVisibleGreen(false);
    setinputValueGreen('');
  };

  const forMapGreen = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        color="blue"
        onClose={(e) => {
          e.preventDefault();
          handleCloseGreen(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };
  const tagChildGreen = tagsGreen.map(forMapGreen);

  //blue========================
  const [tagsBlue, settagsBlue] = useState<string[]>([]);
  const [inputVisibleBlue, setinputVisibleBlue] = useState<boolean>(false);
  const [inputValueBlue, setinputValueBlue] = useState('');
  const inputRefBlue = useRef<InputRef>(null);


  const handleCloseBlue = (removedTag: string) => {
    const newtagsBlue = tagsBlue.filter((tag) => tag !== removedTag);
    console.log(newtagsBlue);
    settagsBlue(newtagsBlue);
  };

  const showInputBlue = () => {
    setinputVisibleBlue(true);
  };

  const handleInputChangeBlue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueBlue(e.target.value);
  };

  const handleInputConfirmBlue = () => {
    if (inputValueBlue && tagsBlue.indexOf(inputValueBlue) === -1) {
      settagsBlue([...tagsBlue, inputValueBlue]);
    }
    setinputVisibleBlue(false);
    setinputValueBlue('');
  };

  const forMapBlue = (tag: string) => {
    const tagElem = (
      <Tag
        color="green"
        closable
        onClose={(e) => {
          e.preventDefault();
          handleCloseBlue(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };
  const tagChildBlue = tagsBlue.map(forMapBlue);
  //================================================exporrt report
  // const onChangeDatea: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString);
  //   setCheckRefresh(true);
  //   const a = {
  //     fromDate: dateString,
  //     toDate: dateString
  //   }
  //   dispatch(ExportProcessAction.exportReportExportProcess(a));
  //   timeout(500);
  //   refresh();
  // };
  const onChangeDatea = (dates: any, dateStrings: any) => {
    if (dates) {
      const a = {
        fromDate: dateStrings[0],
        toDate: dateStrings[1]
      }
      dispatch(ExportProcessAction.exportReportExportProcess(a));
      timeout(500);
      refresh();
    }
  };
  const content = (
    <div>
      {/* <DatePicker onChange={onChangeDatea} /> */}
      <RangePicker
        format={dateFormat}
        onChange={onChangeDatea}
      />
    </div>
  );

  return (
    <div className="background">
      <div className="title">
        Quản lý giá nhập
      </div>
      <div className="datatable">
        <div className="tool">
          <div style={{ width: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => showDrawer()}>
            <PlusOutlined style={{ paddingInline: '5px', color: '#d32f2f' }} /> <div style={{ paddingInline: '5px', color: '#d32f2f', fontFamily: 'Arial' }}>Thêm mới</div>
          </div>
          <Popover content={content} title="Chọn ngày">

            <div style={{ width: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }} >
              <ExportOutlined style={{ paddingInline: '5px', color: '#d32f2f' }} /> <div style={{ paddingInline: '5px', color: '#d32f2f', fontFamily: 'Arial' }}>Xuất báo cáo</div>
            </div>
          </Popover>
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
        width={1000}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >

        <Row className="row" gutter={16}>
          <Col span={6}>
            {inputVisible && (
              <Input
                ref={inputRef}
                type="number"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag color="orange" onClick={showInput} className="site-tag-plus">
                <PlusOutlined /> Cam
              </Tag>
            )}
            <div style={{ marginBottom: 0 }}>
              {tagChild}
            </div>
          </Col>
          <Col span={6}>
            {inputVisibleRed && (
              <Input
                ref={inputRefRed}
                type="number"
                size="small"
                style={{ width: 78 }}
                value={inputValueRed}
                onChange={handleInputChangeRed}
                onBlur={handleInputConfirmRed}
                onPressEnter={handleInputConfirmRed}
              />
            )}
            {!inputVisibleRed && (
              <Tag color="red" onClick={showInputRed} className="site-tag-plus">
                <PlusOutlined /> Đỏ
              </Tag>
            )}
            <div style={{ marginBottom: 0 }}>
              {tagChildRed}
            </div>
          </Col>
          <Col span={6}>
            {inputVisibleGreen && (
              <Input
                ref={inputRefGreen}
                type="number"
                size="small"
                style={{ width: 78 }}
                value={inputValueGreen}
                onChange={handleInputChangeGreen}
                onBlur={handleInputConfirmGreen}
                onPressEnter={handleInputConfirmGreen}
              />
            )}
            {!inputVisibleGreen && (
              <Tag color="blue" onClick={showInputGreen} className="site-tag-plus">
                <PlusOutlined /> Xanh dương
              </Tag>
            )}
            <div style={{ marginBottom: 0 }}>
              {tagChildGreen}
            </div>
          </Col>
          <Col span={6}>
            {inputVisibleBlue && (
              <Input
                ref={inputRefBlue}
                type="number"
                size="small"
                style={{ width: 78 }}
                value={inputValueBlue}
                onChange={handleInputChangeBlue}
                onBlur={handleInputConfirmBlue}
                onPressEnter={handleInputConfirmBlue}
              />
            )}
            {!inputVisibleBlue && (
              <Tag color="green" onClick={showInputBlue} className="site-tag-plus">
                <PlusOutlined /> Xanh lá
              </Tag>
            )}
            <div style={{ marginBottom: 0 }}>
              {tagChildBlue}
            </div>
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Số quả cam(quả):</label>
            <Input placeholder="Nhập số quả cam" value={exportProcessDto.countOrange} onChange={onChangePriceOrange} />
          </Col>
          <Col span={12}>
            <label >Số quả đỏ(quả):</label>
            <Input placeholder="Nhập số quả đỏ " value={exportProcessDto.countRed} onChange={onChangePriceRed} />
          </Col>
        </Row>
        <Row className="row" gutter={16}>
          <Col span={12}>
            <label >Số quả xanh lá(quả):</label>
            <Input placeholder="Số quả xanh lá" value={exportProcessDto.countGreen} onChange={onChangePriceBlue} />
          </Col>
          <Col span={12}>
            <label >Số quả xanh dương(quả):</label>
            <Input placeholder="Số quả xanh dương " value={exportProcessDto.countBlue} onChange={onChangePriceGreen} />
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