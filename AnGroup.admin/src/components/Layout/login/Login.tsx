import { Button, Image, Input } from 'antd';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { authAction, LoginPayload } from '../../../features/auth/authSlice';
import background from './ICON.png'
import './login.scss'
// import { Redirect } from 'react-router-dom';
// import { useAppSelector } from './../../../../app/hooks';

function Login() {
    // const isLogging = useAppSelector(state => state.auth.isLoggedIn);
    // console.log('login : ',isLogging)
    const [login, setLogin] = useState<LoginPayload>({
        username: "",
        password: ""
      });
    const dispatch = useAppDispatch();
    const handleLogin = () => {

        dispatch(
            authAction.login(login)
        )
    }
    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
        setLogin({
            ...login,
            username: e.target.value
        })
    };
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
        setLogin({
            ...login,
            password: e.target.value
        })
    };
    return (
        // isLogging? <Redirect to ='/home'/>:
        <div className='root'>
            <div className='middle'>
                <div className='top'>
                    <div className='icon'>
                        <Image
                            width='300px'
                            src={background}
                        />
                    </div>
                </div>
                <div className='descrip'>
                    Một sản phẩm của hệ sinh thái An Group
                </div>
                <div className='input'>
                    <Input placeholder="Tài khoản" onChange={onChangeUserName} onPressEnter = {handleLogin} value={login.username}>
                    </Input>
                </div>
                <div className='input'>
                    <Input.Password placeholder="Mật khẩu" onChange={onChangePassword} onPressEnter = {handleLogin} value={login.password}>
                    </Input.Password >
                </div>

                <div className='button'>
                    <Button style={{ width: '380px', borderRadius:"5px", background:"#e4375f"
                    , border:"#e4375f" }} type="primary"
                        onClick={handleLogin}
                    >Đăng nhập</Button>
                </div>

            </div>

        </div>
    )
}



export default Login