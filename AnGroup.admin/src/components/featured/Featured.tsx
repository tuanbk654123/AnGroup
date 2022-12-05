import "./featured.scss";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ArrowDownOutlined,ArrowUpOutlined ,MoreOutlined } from '@ant-design/icons';

<ArrowDownOutlined />
const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Biểu đồ tròn</h1>
        {/* <MoreVertIcon fontSize="small" /> */}
        <MoreOutlined />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5}  />
        </div>
        <p className="title">Tổng số tiền nhập hôm nay (vnđ)</p>
        <p className="amount">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(250000000)}</p>
        <p className="desc">
          Sự thay đổi
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Hôm nay</div>
            <div className="itemResult negative">
              <ArrowDownOutlined />
              <div className="resultAmount">420k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Tuần trước</div>
            <div className="itemResult positive">
              <ArrowUpOutlined />
              <div className="resultAmount">236k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Tháng trước</div>
            <div className="itemResult positive">
              <ArrowUpOutlined />
              <div className="resultAmount">98k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
