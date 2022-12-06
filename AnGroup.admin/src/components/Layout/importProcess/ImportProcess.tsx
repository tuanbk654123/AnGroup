import React from 'react'
import Datatable from '../../datatable/importProcess/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./importProcess.scss"
type Props = {}

const importProcess = (props: Props) => {
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

export default importProcess