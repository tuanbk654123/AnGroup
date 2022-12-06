import React from 'react'
import Datatable from '../../datatable/importProcess/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./importProcess.scss"
type Props = {}

const importProcess = (props: Props) => {
  return (
    <div className="list">
      <Sidebar   isActiveHoverChart = {false} isActiveHoverCustomer = {false} isActiveHoverImportPrice = {false} isActiveHoverImportProcess = {true}
      isActiveHoverImportReport = {false} isActiveHoverExportPrcie = {false} isActiveHoverExportProcess = {false} isActiveHoverExportReport = {false}/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default importProcess