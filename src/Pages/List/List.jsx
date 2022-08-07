import React from 'react'
import './list.scss'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Navbar from '../../Component/Navbar/Navbar'
import Table from '../../Component/Table/Table'


const List = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
       
        
        <div className="listContainer">
          <div className="listTitle">Poll Result
          <Table/></div>
        </div>
      </div>
    </div>
  )
}

export default List