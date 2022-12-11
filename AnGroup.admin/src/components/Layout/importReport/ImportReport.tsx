import React from 'react'
import Datatable from '../../datatable/importReport/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./importReport.scss"
type Props = {}

const ImportReport = (props: Props) => {
  return (
    <div className="list">
      <Sidebar  isActiveHoverChart = {false} isActiveHoverCustomer = {false} isActiveHoverImportPrice = {false} isActiveHoverImportProcess = {false}
      isActiveHoverImportReport = {true} isActiveHoverExportPrcie = {false} isActiveHoverExportProcess = {false} isActiveHoverExportReport = {false}/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default ImportReport