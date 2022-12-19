
import "./widget.scss";
import { ArrowDownOutlined, ArrowUpOutlined, UserOutlined } from '@ant-design/icons';
type Props = {
  type: string,
  price: string,

}

const Widget = (props: Props) => {
  let data = {
    title: "string",
    number: "",
    link: "",
    up: true,
    icon: {}
  };

  switch (props.type) {
    case "Kem1":
      data = {
        title: "Giá kem1",
        number: props.price,
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
        title: "Giá kem2",
        up: false,
        number: props.price,
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
        title: "Giá kem3",
        up: true,
        number: props.price,
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
        title: "Giá RXo",
        up: false,
        number:props.price,
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
        title: "Giá R1",
        up: true,
        number: props.price,
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
        title: "Giá R2",
        up: true,
        number: props.price,
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
        title: "Giá R3",
        up: true,
        number: props.price,
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
    </div>
  )
}

export default Widget