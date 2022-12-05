import React from 'react'
import Datatable from '../../datatable/importPrice/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./importPrice.scss"
type Props = {}

const ImportPrice = (props: Props) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default ImportPrice