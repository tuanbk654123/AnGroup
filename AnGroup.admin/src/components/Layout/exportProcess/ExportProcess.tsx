import React from 'react'
import Datatable from '../../datatable/exportProcess/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./exportProcess.scss"
type Props = {}

const ExportProcess = (props: Props) => {
  return (
    <div className="list">
      <Sidebar  isActiveHoverChart = {false} isActiveHoverCustomer = {false} isActiveHoverImportPrice = {false} isActiveHoverImportProcess = {false}
      isActiveHoverImportReport = {false} isActiveHoverExportPrcie = {false} isActiveHoverExportProcess = {true} isActiveHoverExportReport = {false}/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default ExportProcess