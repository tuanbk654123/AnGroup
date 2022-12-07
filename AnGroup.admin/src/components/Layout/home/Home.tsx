import React from 'react'
import Chart from '../../chart/Chart';
import Featured from '../../featured/Featured';
// import Navbar from '../../navbar/Navbar';
import { Redirect } from 'react-router-dom';
// import { Button } from 'antd';
// import { useAppSelector } from './../../../app/hooks';

import Sidebar from '../../sidebar/Sidebar';
// import Sidebar from '../../sidebar/Sidebar';
// import Widget from '../../widget/Widget';
import "./home.scss"
import Navbar from '../../navbar/Navbar';
import Widget from '../../widget/Widget';

function Home() {
   const access_token = localStorage.getItem('access_token');
   //console.log('home : ',access_token)
  

  return (
     access_token !== null?
    <div className='home'>
    <Sidebar  isActiveHoverChart = {true} isActiveHoverCustomer = {false} isActiveHoverImportPrice = {false} isActiveHoverImportProcess = {false}
      isActiveHoverImportReport = {false} isActiveHoverExportPrcie = {false} isActiveHoverExportProcess = {false} isActiveHoverExportReport = {false}/>
    <div className='homeContainer'>
        < Navbar/>
        <h2 style={{margin:"10px", color:"#8A3688"}}>GIÁ NHẬP HÔM NAY</h2>
        <div className="widgets">
          <Widget type="Kem1" />
          <Widget type="Kem2" />
          <Widget type="Kem3" />
          <Widget type="RXo" />
          <Widget type="R1" />
          <Widget type="R2" />
          <Widget type="R3" />
        
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Biểu đồ giá nhập " aspect={2 / 1} />
        </div>
      
  
    </div>
  </div>
  :
  <Redirect to = "login" />

  )
}

export default Home