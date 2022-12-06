import React from 'react'
import Datatable from '../../datatable/role/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./role.scss"
type Props = {}

const Role = (props: Props) => {
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

export default Role