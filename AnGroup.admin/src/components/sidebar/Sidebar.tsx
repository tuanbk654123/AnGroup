import  { useEffect, useState } from 'react'
import "./sidebar.scss"

import { Link } from "react-router-dom";
import {
   PoundCircleFilled, EditFilled, FileTextFilled, UserOutlined, AreaChartOutlined
 
} from '@ant-design/icons';
import { Image } from 'antd';
import background from './VANAN.png'


type Props = {
    isActiveHoverChart:boolean;
    isActiveHoverCustomer:boolean;
    isActiveHoverImportPrice:boolean;
    isActiveHoverImportProcess:boolean;
    isActiveHoverImportReport:boolean;
    isActiveHoverExportPrcie:boolean;
    isActiveHoverExportProcess:boolean;
    isActiveHoverExportReport:boolean;
}

const Sidebar = (props: Props) => {
    const [isActiveHoverChart, setIsActiveHoverChart] = useState(props.isActiveHoverChart);
    const [isActiveHoverCustomer, setIsActiveHoverCustomer] = useState(props.isActiveHoverCustomer);
    const [isActiveHoverImportPrice, setIsActiveHoverImportPrice] = useState(props.isActiveHoverImportPrice);
    const [isActiveHoverImportProcess, setIsActiveHoverImportProcess] = useState(props.isActiveHoverImportProcess);
    const [isActiveHoverImportReport, setIsActiveHoverImportReport] = useState(props.isActiveHoverImportReport);
    const [isActiveHoverExportPrcie, setIsActiveHoverExportPrcie] = useState(props.isActiveHoverExportPrcie);
    const [isActiveHoverExportProcess, setIsActiveHoverExportProcess] = useState(props.isActiveHoverExportProcess);
    const [isActiveHoverExportReport, setIsActiveHoverExportReport] = useState(props.isActiveHoverExportReport);

    const resetAll =  () => {
        setIsActiveHoverChart(false);
        setIsActiveHoverCustomer(false);
        setIsActiveHoverImportPrice(false);
        setIsActiveHoverImportProcess(false);
        setIsActiveHoverImportReport(false);
        setIsActiveHoverExportPrcie(false);
        setIsActiveHoverExportProcess(false);
        setIsActiveHoverExportReport(false);

    };
    const handleClickChart =  () => {
        // 👇️ toggle
        if (isActiveHoverChart) return;
        resetAll();
        setIsActiveHoverChart(true);
    };
    const handleClickCustomer =  () => {
        // 👇️ toggle
        if (isActiveHoverCustomer) return;
        resetAll();
        setIsActiveHoverCustomer(true);
    };
    const handleClickImportPrice =  () => {
        // 👇️ toggle
        if (isActiveHoverImportPrice) return;
        resetAll();
        setIsActiveHoverImportPrice(true);
    };
    const handleClickImportProcess =  () => {
        // 👇️ toggle
        if (isActiveHoverImportProcess) return;
        resetAll();
        setIsActiveHoverImportProcess(true);
    };
    const handleClickImportReport =  () => {
        // 👇️ toggle
        if (isActiveHoverImportReport) return;
        resetAll();
        setIsActiveHoverImportReport(true);
    };
    const handleClickExportPrcie =  () => {
        // 👇️ toggle
        if (isActiveHoverExportPrcie) return;
        resetAll();
        setIsActiveHoverExportPrcie(true);
    };
    const handleClickExportProcess =  () => {
        // 👇️ toggle
        if (isActiveHoverExportProcess) return;
        resetAll();
        setIsActiveHoverExportProcess(true);
    };
    const handleClickExportReport =  () => {
        // 👇️ toggle
        if (isActiveHoverExportReport) return;
        resetAll();
        setIsActiveHoverExportReport(true);
    };
    useEffect(() => {
       
      }, [ isActiveHoverExportReport, isActiveHoverExportProcess, 
        isActiveHoverExportPrcie, isActiveHoverImportReport, 
        isActiveHoverImportProcess, isActiveHoverImportPrice,
        isActiveHoverCustomer,isActiveHoverChart ])
    

    return (
        <div className='sidebar'>
            <div className='top'>
                <Image
                    width='200px'

                    //src="./../../public/img/"
                    src={background}
                />

            </div>
            <div className='hr1' />
            <div className='center'>
                <ul>
                    <p className='title'>THỐNG KÊ</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li onClick={ handleClickChart} style={{  marginLeft:isActiveHoverChart? "20px" : "",  padding:isActiveHoverChart? "20px" : "", borderRadius: isActiveHoverChart ?" 20px 0px 0px 20px":"", background: isActiveHoverChart ? '#d32f2f' : '#ffffff' }} >

                            <AreaChartOutlined  className='icon' style={{ color: isActiveHoverChart ? '#ffffff' : '#d32f2f' }}/>
                            <span style={{ fontSize:"0.77vw",  color: isActiveHoverChart ? '#ffffff' : '#d32f2f' }}>Biểu đồ</span>

                        </li>
                    </Link>
                    {/* <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>

                            <UserOutlined className='icon' />
                            <span>Người dùng</span>

                        </li>
                    </Link>
                    <Link to="/role" style={{ textDecoration: "none" }}>
                        <li>

                            <LockOutlined className='icon' />
                            <span>Quyền</span>

                        </li>
                    </Link> */}
                    {/* <Link to="/loginhistory" style={{ textDecoration: "none" }}>
                        <li>
                            <HistoryOutlined className='icon' />
                            <span>Lịch sử đăng nhập</span>
                        </li>
                    </Link> */}
                    <p className='title'>KHÁCH HÀNG</p>
                    <Link to="/customer" style={{ textDecoration: "none" }} >
                        <li onClick={handleClickCustomer} style={{ marginLeft:isActiveHoverCustomer? "20px" : "",  padding:isActiveHoverCustomer? "20px" : "", borderRadius: isActiveHoverCustomer ? " 20px 0px 0px 20px":"", background: isActiveHoverCustomer ? '#d32f2f' : '#ffffff' }} >
                            <UserOutlined className='icon' style={{ color: isActiveHoverCustomer ? '#ffffff' : '#d32f2f' }} />
                            <span style={{  fontSize:"0.77vw", color: isActiveHoverCustomer ? '#ffffff' : '#d32f2f' }} >
                                Quản lý khách hàng
                            </span>
                        </li>
                    </Link>
                    <p className='title'>NHẬP</p>
                    <Link to="/importPrice" style={{ textDecoration: "none" }}>
                        <li onClick={handleClickImportPrice} style={{ marginLeft:isActiveHoverImportPrice? "20px" : "",  padding:isActiveHoverImportPrice? "20px" : "",borderRadius: isActiveHoverImportPrice ? " 20px 0px 0px 20px":"", background: isActiveHoverImportPrice ? '#d32f2f' : '#ffffff' }} >
                            <PoundCircleFilled className='icon' style={{ color: isActiveHoverImportPrice ? '#ffffff' : '#d32f2f' }} />
                            <span style={{ fontSize:"0.77vw", color: isActiveHoverImportPrice ? '#ffffff' : '#d32f2f' }}>
                                Giá nhập
                            </span>
                        </li>
                    </Link>
                    <Link to="/importProcess" style={{ textDecoration: "none" }}>
                        <li onClick={handleClickImportProcess} style={{ marginLeft:isActiveHoverImportProcess? "20px" : "",  padding:isActiveHoverImportProcess? "20px" : "",borderRadius: isActiveHoverImportProcess?" 20px 0px 0px 20px":"", background: isActiveHoverImportProcess ? '#d32f2f' : '#ffffff' }} >
                            <EditFilled className='icon' style={{ color: isActiveHoverImportProcess ? '#ffffff' : '#d32f2f' }} />
                            <span style={{ fontSize:"0.77vw", color: isActiveHoverImportProcess ? '#ffffff' : '#d32f2f' }}>
                                Quá trình nhập
                            </span>
                        </li>
                    </Link>
                    <Link to="/importReport" style={{ textDecoration: "none" }}>
                        <li onClick={handleClickImportReport} style={{ marginLeft:isActiveHoverImportReport? "20px" : "", padding:isActiveHoverImportReport? "20px" : "", borderRadius: isActiveHoverImportReport? " 20px 0px 0px 20px":"", background: isActiveHoverImportReport ? '#d32f2f' : '#ffffff' }} >
                            <FileTextFilled className='icon' style={{ color: isActiveHoverImportReport ? '#ffffff' : '#d32f2f' }} />
                            <span style={{  fontSize:"0.77vw", color: isActiveHoverImportReport ? '#ffffff' : '#d32f2f' }}>
                                Báo cáo nhập
                            </span>
                        </li>
                    </Link>
                    <p className='title'>XUẤT</p>
                    <Link to="/exportPrice" style={{ textDecoration: "none" }}>
                        <li onClick={handleClickExportPrcie} style={{ marginLeft:isActiveHoverExportPrcie? "20px" : "", padding:isActiveHoverExportPrcie? "20px" : "", borderRadius:isActiveHoverExportPrcie? " 20px 0px 0px 20px":"", background: isActiveHoverExportPrcie ? '#d32f2f' : '#ffffff' }} >
                            <PoundCircleFilled className='icon' style={{ color: isActiveHoverExportPrcie ? '#ffffff' : '#d32f2f' }} />
                            <span style={{  fontSize:"0.77vw", color: isActiveHoverExportPrcie ? '#ffffff' : '#d32f2f' }}>
                                Giá xuất
                            </span>
                        </li>
                    </Link>
                    <Link to="/exportProcess" style={{ textDecoration: "none" }}>
                        <li onClick={handleClickExportProcess} style={{ marginLeft:isActiveHoverExportProcess? "20px" : "", padding:isActiveHoverExportProcess? "20px" : "", borderRadius:isActiveHoverExportProcess?" 20px 0px 0px 20px":"", background: isActiveHoverExportProcess ? '#d32f2f' : '#ffffff' }} >
                            <EditFilled className='icon' style={{ color: isActiveHoverExportProcess ? '#ffffff' : '#d32f2f' }} />
                            <span style={{  fontSize:"0.77vw", color: isActiveHoverExportProcess ? '#ffffff' : '#d32f2f' }}>
                                Quá trình xuất
                            </span>
                        </li>
                    </Link>
                    <Link to="/exportReport" style={{ textDecoration: "none" }}>
                        <li onClick={handleClickExportReport} style={{ marginLeft:isActiveHoverExportReport? "20px" : "",  padding:isActiveHoverExportReport? "20px" : "",borderRadius: isActiveHoverExportReport?" 20px 0px 0px 20px":"", background: isActiveHoverExportReport ? '#d32f2f' : '#ffffff' }} >
                            <FileTextFilled className='icon' style={{ color: isActiveHoverExportReport ? '#ffffff' : '#d32f2f' }} />
                            <span style={{ fontSize:"0.77vw",  color: isActiveHoverExportReport ? '#ffffff' : '#d32f2f' }}>
                                Báo cáo xuất
                            </span>
                        </li>
                    </Link>

                    {/* <p className='title'>Hành động</p>
          
                    <li onClick={() => signOut()}>
                        <LogoutOutlined className='icon' />
                        <span>Đăng xuất</span>
                    </li> */}
                </ul>
            </div>
            <div className='bottom'>
                <div className='colorOption'></div>
                <div className='colorOption'></div>
            </div>
        </div >
    )
}

export default Sidebar