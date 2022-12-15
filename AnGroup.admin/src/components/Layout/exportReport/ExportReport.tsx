import React from 'react'
import Datatable from '../../datatable/exportReport/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./exportReport.scss"
type Props = {}

const ExportReport = (props: Props) => {
  return (
    <div className="list">
       <Sidebar  isActiveHoverChart = {false} isActiveHoverCustomer = {false} isActiveHoverImportPrice = {false} isActiveHoverImportProcess = {false}
      isActiveHoverImportReport = {false} isActiveHoverExportPrcie = {false} isActiveHoverExportProcess = {false} isActiveHoverExportReport = {true}/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default ExportReport