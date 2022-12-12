import React from 'react'
import Datatable from '../../datatable/exportPrice/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./exportPrice.scss"
type Props = {}

const ExportPrice = (props: Props) => {
  return (
    <div className="list">
      <Sidebar  isActiveHoverChart = {false} isActiveHoverCustomer = {false} isActiveHoverImportPrice = {false} isActiveHoverImportProcess = {false}
      isActiveHoverImportReport = {false} isActiveHoverExportPrcie = {true} isActiveHoverExportProcess = {false} isActiveHoverExportReport = {false}/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default ExportPrice