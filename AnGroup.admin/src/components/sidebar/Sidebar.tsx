import  { useEffect, useState } from 'react'
import "./sidebar.scss"

import { Link } from "react-router-dom";
import {
    AppstoreFilled, PoundCircleFilled, EditFilled, FileTextFilled, UserOutlined
 
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
                    <p className='title'>Thống kê</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li onClick={ handleClickChart} style={{borderRadius: isActiveHoverChart ?" 20px 0px 0px 20px":"", background: isActiveHoverChart ? '#d32f2f' : '#ffffff' }} >

                            <AppstoreFilled className='icon' style={{ color: isActiveHoverChart ? '#ffffff' : '#d32f2f' }}/>
                            <span style={{ color: isActiveHoverChart ? '#ffffff' : '#d32f2f' }}>Biểu đồ</span>

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
                    <p className='title'>Khách hàng</p>
                    <Link to="/customer" style={{ textDecoration: "none" }} >
                        <li onClick={handleClickCustomer} style={{ borderRadius: isActiveHoverCustomer ? " 20px 0px 0px 20px":"", background: isActiveHoverCustomer ? '#d32f2f' : '#ffffff' }} >
                            <UserOutlined className='icon' style={{ color: isActiveHoverCustomer ? '#ffffff' : '#d32f2f' }} />
                            <span style={{ color: isActiveHoverCustomer ? '#ffffff' : '#d32f2f' }} >
                                Quản lý khách hàng
                            </span>
                        </li>
                    </Link>
                    <p className='title'>Nhập</p>
                    <Link to="/importPrice" style={{ textDecoration: "none" }}>
                        <li onClick={handleClickImportPrice} style={{ borderRadius: isActiveHoverImportPrice ? " 20px 0px 0px 20px":"", background: isActiveHoverImportPrice ? '#d32f2f' : '#ffffff' }} >
                            <PoundCircleFilled className='icon' style={{ color: isActiveHoverImportPrice ? '#ffffff' : '#d32f2f' }} />
                            <span style={{ color: isActiveHoverImportPrice ? '#ffffff' : '#d32f2f' }}>
                                Giá nhập
                            </span>
                        </li>
                    </Link>
                    <Link to="/importProcess" style={{ textDecoration: "none" }}>
                        <li onClick={handleClickImportProcess} style={{ borderRadius: isActiveHoverImportProcess?" 20px 0px 0px 20px":"", background: isActiveHoverImportProcess ? '#d32f2f' : '#ffffff' }} >
                            <EditFilled className='icon' style={{ color: isActiveHoverImportProcess ? '#ffffff' : '#d32f2f' }} />
                            <span style={{ color: isActiveHoverImportProcess ? '#ffffff' : '#d32f2f' }}>
                                Quá trình nhập
                            </span>
                        </li>
                    </Link>
                    <Link to="/importPrice" style={{ textDecoration: "none" }}>
                        <li onClick={handleClickImportReport} style={{ borderRadius: isActiveHoverImportReport? " 20px 0px 0px 20px":"", background: isActiveHoverImportReport ? '#d32f2f' : '#ffffff' }} >
                            <FileTextFilled className='icon' style={{ color: isActiveHoverImportReport ? '#ffffff' : '#d32f2f' }} />
                            <span style={{ color: isActiveHoverImportReport ? '#ffffff' : '#d32f2f' }}>
                                Báo cáo nhập
                            </span>
                        </li>
                    </Link>
                    <p className='title'>Xuất</p>
                    <Link to="/importPrice" style={{ textDecoration: "none" }}>
                        <li onClick={handleClickExportPrcie} style={{ borderRadius:isActiveHoverExportPrcie? " 20px 0px 0px 20px":"", background: isActiveHoverExportPrcie ? '#d32f2f' : '#ffffff' }} >
                            <PoundCircleFilled className='icon' style={{ color: isActiveHoverExportPrcie ? '#ffffff' : '#d32f2f' }} />
                            <span style={{ color: isActiveHoverExportPrcie ? '#ffffff' : '#d32f2f' }}>
                                Giá xuất
                            </span>
                        </li>
                    </Link>
                    <Link to="/importPrice" style={{ textDecoration: "none" }}>
                        <li onClick={handleClickExportProcess} style={{ borderRadius:isActiveHoverExportProcess?" 20px 0px 0px 20px":"", background: isActiveHoverExportProcess ? '#d32f2f' : '#ffffff' }} >
                            <EditFilled className='icon' style={{ color: isActiveHoverExportProcess ? '#ffffff' : '#d32f2f' }} />
                            <span style={{ color: isActiveHoverExportProcess ? '#ffffff' : '#d32f2f' }}>
                                Quá trình xuất
                            </span>
                        </li>
                    </Link>
                    <Link to="/importPrice" style={{ textDecoration: "none" }}>
                        <li onClick={handleClickExportReport} style={{ borderRadius: isActiveHoverExportReport?" 20px 0px 0px 20px":"", background: isActiveHoverExportReport ? '#d32f2f' : '#ffffff' }} >
                            <FileTextFilled className='icon' style={{ color: isActiveHoverExportReport ? '#ffffff' : '#d32f2f' }} />
                            <span style={{ color: isActiveHoverExportReport ? '#ffffff' : '#d32f2f' }}>
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