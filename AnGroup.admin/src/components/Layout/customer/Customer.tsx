import React from 'react'
import Datatable from '../../datatable/customer/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./customer.scss"
type Props = {}

const Customer = (props: Props) => {
  return (
    <div className="list">
      <Sidebar  isActiveHoverChart = {false} isActiveHoverCustomer = {true} isActiveHoverImportPrice = {false} isActiveHoverImportProcess = {false}
      isActiveHoverImportReport = {false} isActiveHoverExportPrcie = {false} isActiveHoverExportProcess = {false} isActiveHoverExportReport = {false}/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default Customer