

import { Button} from 'antd';
import "./navbar.scss";
import { LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/hooks';
import { authAction } from '../../features/auth/authSlice';
type Props = {}

const Navbar = (props: Props) => {
  //const userLogin = useAppSelector(state => state.auth.currentUser)  ;
  const userLogin = localStorage.getItem("user_name");
  const dispatch = useAppDispatch();
  const handleLogout = () => {

    dispatch(
        authAction.logout()
    )
}
  return (
    <div className="navbar">
      <div className="wrapper">

        <div className="items">


          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
          <div className="text" >
            Xin chào , <b style={{whiteSpace:"pre-line"}}> admin! _</b>
          </div>
          
          <Button style={{whiteSpace:"pre-line"}} icon={<LogoutOutlined/> }  onClick={()=>handleLogout()}></Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar