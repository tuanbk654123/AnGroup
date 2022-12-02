import React from 'react'
import "./history.scss"
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import Datatable from '../../datatable/history/Datatable'
type Props = {}

const History = (props: Props) => {
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

export default History