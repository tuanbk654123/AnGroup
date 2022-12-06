import React from 'react'
import Datatable from '../../datatable/importPrice/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./importPrice.scss"
type Props = {}

const ImportPrice = (props: Props) => {
  return (
    <div className="list">
      <Sidebar  isActiveHoverChart = {false} isActiveHoverCustomer = {false} isActiveHoverImportPrice = {true} isActiveHoverImportProcess = {false}
      isActiveHoverImportReport = {false} isActiveHoverExportPrcie = {false} isActiveHoverExportProcess = {false} isActiveHoverExportReport = {false}/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default ImportPrice