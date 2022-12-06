import React from 'react'
import "./widget.scss";
// import { useEffect } from "react";
import { ArrowDownOutlined, ArrowUpOutlined, UserOutlined } from '@ant-design/icons';
type Props = {
  type: string,
}

const Widget = (props: Props) => {
  let data = {
    title: "string",
    number: "",
    link: "",
    up: true,
    icon: {}
  };
  // const dispatch = useDispatch();
  // const users = useSelector((state) => state.user.posts)  ;
  // console.log("Widget",users.totalItem);
  // useEffect(() => {

  //   dispatch(searchUser("","","",null,1,10));


  // }, [dispatch])

  //temporary
  const amount = 10000;
  //const diff = 20;

  switch (props.type) {
    case "Kem1":
      data = {
        title: "GIÁ KEM1",

        number: new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(amount),
        link: "VNĐ",
        up: true,
        icon: (
          <UserOutlined
            className="icon"
            style={{
              color: "black",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "Kem2":
      data = {
        title: "GIÁ KEM2",
        up: false,
        number: new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(amount),
        link: "VNĐ",
        icon: (
          <UserOutlined
            className="icon"
            style={{
              color: "black",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "Kem3":
      data = {
        title: "GIÁ KEM3",
        up: true,
        number: new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(amount),
        link: "VNĐ",
        icon: (
          <UserOutlined
            className="icon"
            style={{
              color: "black",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "RXo":
      data = {
        title: "GIÁ RXo",
        up: false,
        number: new Intl.NumberFormat('vi-VN', {  currency: 'VND' }).format(amount),
        link: "VNĐ",
        icon: (
          <UserOutlined
            className="icon"
            style={{
              color: "black",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "R1":
      data = {
        title: "GIÁ R1",
        up: true,
        number: new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(amount),
        link: "VNĐ",
        icon: (
          <UserOutlined
            className="icon"
            style={{
              color: "black",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "R2":
      data = {
        title: "GIÁ R2",
        up: true,
        number: new Intl.NumberFormat('vi-VN', {  currency: 'VND' }).format(amount),
        link: "VNĐ",
        icon: (
          <UserOutlined
            className="icon"
            style={{
              color: "black",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "R3":
      data = {
        title: "GIÁ R3",
        up: true,
        number: new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(amount),
        link: "VNĐ",
        icon: (
          <UserOutlined
            className="icon"
            style={{
              color: "black",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }


  return (
    <div className="widget">
      <div className="left">
        <span className="title"  style={{ color: "#8A3688" }}>{data.title}</span>
        <span className="counter">
          {data.number}
        </span>

        <span className="link">
          <div>
            {data.up ? <ArrowUpOutlined style={{ color: "#00cc00" }} /> : <ArrowDownOutlined style={{ color: "#d32f2f" }} />}
          </div>

          {data.link}

        </span>
      </div>
      {/* <div className="right">
      <div className="percentage positive">
        <UserOutlined />
        {diff} %
      </div>
      {data.icon}
    </div> */}
    </div>
  )
}

export default Widget