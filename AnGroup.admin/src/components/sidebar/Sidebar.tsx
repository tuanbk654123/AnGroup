import React from 'react'
import "./sidebar.scss"
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PersonIcon from '@mui/icons-material/Person';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from "react-router-dom";
import {
     AppstoreFilled, PoundCircleFilled, EditFilled, FileTextFilled
    // ,LinkOutlined    
} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
//import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Image } from 'antd';
import background from './VANAN.png'

import { useAppDispatch } from '../../app/hooks';
import { authAction } from '../../features/auth/authSlice';

type Props = {}

const Sidebar = (props: Props) => {

    const dispatch = useAppDispatch();

    const handleLoginout = () => {
        dispatch(
            authAction.logout()

        )
    }
    let navigate = useHistory();
    const routeChange = () => {
        let path = `/login`;
        navigate.push(path);
    };
    function signOut() {
        handleLoginout();
        routeChange();
    };
    return (
        <div className='sidebar'>
            <div className='top'>
                <Image
                    width='200px'

                    //src="./../../public/img/"
                    src={background}
                />
                {/* <Link to="/" style={{ textDecoration: "none" }}>
            <span className='logo'>SSO APEC</span>
        </Link> */}
            </div>
            <div className='hr1' />
            <div className='center'>
                <ul>
                    <p className='title'>Trang chủ</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>

                            <AppstoreFilled className='icon' />
                            <span>Biểu đồ</span>

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
                    <p className='title'>Nhập</p>
                    <Link to="/importPrice" style={{ textDecoration: "none" }}>
                        <li>
                            <PoundCircleFilled className='icon' />
                            <span>
                                Giá nhập
                            </span>
                        </li>
                    </Link>
                    <Link to="/importPrice" style={{ textDecoration: "none" }}>
                        <li>
                            <EditFilled className='icon' />
                            <span>
                                Quá trình nhập
                            </span>
                        </li>
                    </Link>
                    <Link to="/importPrice" style={{ textDecoration: "none" }}>
                        <li>
                            <FileTextFilled className='icon' />
                            <span>
                                Báo cáo nhập
                            </span>
                        </li>
                    </Link>
                    <p className='title'>Xuất</p>
                    <Link to="/importPrice" style={{ textDecoration: "none" }}>
                        <li>
                            <PoundCircleFilled className='icon' />
                            <span>
                                Giá xuất
                            </span>
                        </li>
                    </Link>
                    <Link to="/importPrice" style={{ textDecoration: "none" }}>
                        <li>
                            <EditFilled className='icon' />
                            <span>
                                Quá trình xuất
                            </span>
                        </li>
                    </Link>
                    <Link to="/importPrice" style={{ textDecoration: "none" }}>
                        <li>
                            <FileTextFilled className='icon' />
                            <span>
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
        </div>
    )
}

export default Sidebar