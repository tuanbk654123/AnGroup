
import Featured from '../../featured/Featured';
// import Navbar from '../../navbar/Navbar';
import { Redirect } from 'react-router-dom';
// import { Button } from 'antd';
// import { useAppSelector } from './../../../app/hooks';

import Sidebar from '../../sidebar/Sidebar';
import "./home.scss"
import Navbar from '../../navbar/Navbar';
import Widget from '../../widget/Widget';
import GradientsChart from '../../gradientsChart/GradientsChart';
import { Card } from 'antd';
import { useEffect } from 'react';
import { ExportPriceAction } from '../../../features/exportPrice/exportPriceSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ImportPriceAction } from '../../../features/importPrice/importPriceSlice';

const { Meta } = Card;

function Home() {
  const access_token = localStorage.getItem('access_token');



  const dispatch = useAppDispatch();
  const exportPrices = useAppSelector((state) => state.exportPrice.lstRespone);
  const importPrices = useAppSelector((state) => state.importPrice.lstRespone);

  useEffect(() => {
    const today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    //let dateFrom = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate() - 10);
    dispatch(ExportPriceAction.searchExportPrice({
      pageNumber: 1,
      pageSize: 10,
      fromDate: date,
      toDate: date
    }))

    dispatch(ImportPriceAction.searchImportPrice({
      pageNumber: 1,
      pageSize: 10,
      fromDate: date,
      toDate: date
    }));



  }, [dispatch])

  return (
    access_token !== null ?
      <div className='home'>
        <Sidebar isActiveHoverChart={true} isActiveHoverCustomer={false} isActiveHoverImportPrice={false} isActiveHoverImportProcess={false}
          isActiveHoverImportReport={false} isActiveHoverExportPrcie={false} isActiveHoverExportProcess={false} isActiveHoverExportReport={false} />
        <div className='homeContainer'>
          < Navbar />
          <h2 style={{ margin: "10px", color: "#8A3688" }}>THỐNG KÊ HÔM NAY</h2>
          <div className="widgets">
            <Card
              hoverable
              style={{ borderRadius:"1vw",width: "20vw", backgroundColor: '#fff7e6',borderColor:"#Be5b25" }}
              color="orange"

            >
              {/* <Meta style={{ fontSize: "3vh" }} title="Giá cam" description={new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(exportPrices.content[0]?.priceOrange === undefined ? 0 : exportPrices.content[0]?.priceOrange) + " VNĐ"} /> */}
              <p style={{fontSize:"2vw",fontWeight:"bold",  color: "#Be5b25" }}>{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(exportPrices.content[0]?.priceOrange === undefined ? 0 : exportPrices.content[0]?.priceOrange) + " VNĐ"}</p>
            </Card>
            <Card
              hoverable
              style={{ borderRadius:"1vw",width: "20vw", backgroundColor: '#fff1f0',borderColor:"#Be2525" }}
            >
              {/* <Meta style={{ fontSize: "3vh" }} title="Giá đỏ" description={new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(exportPrices.content[0]?.priceRed === undefined ? 0 : exportPrices.content[0]?.priceRed) + " VNĐ"} /> */}
              <p style={{fontSize:"2vw",fontWeight:"bold",  color: "#Be2525" }}>{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(exportPrices.content[0]?.priceRed === undefined ? 0 : exportPrices.content[0]?.priceRed) + " VNĐ"}</p>
           
            </Card>
            <Card
              hoverable
              style={{ borderRadius:"1vw",width: "20vw", backgroundColor: '#f6ffed',borderColor:"#49be25" }}
            >
              {/* <Meta style={{ fontSize: "3vh" , color:"#b7e7dc" }} title="Giá xanh lá" description={new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(exportPrices.content[0]?.priceBlue === undefined ? 0 : exportPrices.content[0]?.priceBlue) + " VNĐ"} /> */}
              {/* <p style={{ fontSize:"20px", color: "#49be25" }}>Giá xanh lá</p> */}
              <p style={{fontSize:"2vw",fontWeight:"bold",  color: "#49be25" }}>{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(exportPrices.content[0]?.priceBlue === undefined ? 0 : exportPrices.content[0]?.priceBlue) + " VNĐ"}</p>
            </Card>
            <Card
              hoverable
              style={{ borderRadius:"1vw", width: "20vw", backgroundColor: '#e6f7ff', borderColor:"#2587be" }}
            >
              {/* <Meta style={{ fontSize: "3vh" }} title="Giá Xanh dương" description={new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(exportPrices.content[0]?.priceGreen === undefined ? 0 : exportPrices.content[0]?.priceGreen) + " VNĐ"} /> */}
              {/* <p style={{ fontSize:"20px", color: "#2587be" }}>Giá xanh dương</p> */}
              <p style={{  display:"inline-block", fontSize:"2vw",fontWeight:"bold",  color: "#2587be" }}>{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(exportPrices.content[0]?.priceGreen === undefined ? 0 : exportPrices.content[0]?.priceGreen) + " VNĐ"}</p>
            </Card>
          </div>
          <div className="charts">
            <div className="Featured">
              <Featured />
            </div>
            <div className="GradientsChart">
              <h3 style={{ margin: "10px", color: "#111111" }}>Biểu đồ giá nhập</h3>

              <GradientsChart
              //  Data={importReports.content}
              />
            </div>
          </div>
          <div className="widgets">
            <Widget type="Kem1" price={new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(importPrices.content[0]?.priceKemLon === undefined ? 0 : importPrices.content[0]?.priceKemLon)} />
            <Widget type="Kem2" price={new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(importPrices.content[0]?.priceKem2 === undefined ? 0 : importPrices.content[0]?.priceKem2)} />
            <Widget type="Kem3" price={new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(importPrices.content[0]?.priceKem3 === undefined ? 0 : importPrices.content[0]?.priceKem3)} />
            <Widget type="RXo" price={new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(importPrices.content[0]?.priceRXo === undefined ? 0 : importPrices.content[0]?.priceRXo)} />
            <Widget type="R1" price={new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(importPrices.content[0]?.priceR1 === undefined ? 0 : importPrices.content[0]?.priceR1)} />
            <Widget type="R2" price={new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(importPrices.content[0]?.priceR2 === undefined ? 0 : importPrices.content[0]?.priceR2)} />
            <Widget type="R3" price={new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(importPrices.content[0]?.priceR3 === undefined ? 0 : importPrices.content[0]?.priceR3)} />
          </div>
        </div>
      </div>
      :
      <Redirect to="login" />

  )
}

export default Home