import React from 'react'
import "./history.scss"
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import Datatable from '../../datatable/history/Datatable'
type Props = {}

const History = (props: Props) => {
  return (
    <div className="list">
    <Sidebar  isActiveHoverChart = {false} isActiveHoverCustomer = {false} isActiveHoverImportPrice = {false} isActiveHoverImportProcess = {false}
      isActiveHoverImportReport = {false} isActiveHoverExportPrcie = {false} isActiveHoverExportProcess = {false} isActiveHoverExportReport = {false}/>
    <div className="listContainer">
      <Navbar/>
      <Datatable/>
    </div>
  </div>
  )
}

export default History