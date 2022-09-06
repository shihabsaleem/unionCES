import React from 'react'
import "./vhome.scss"
import Sidebar from '../../Component/Sidebar/Sidebar'
import Navbar from '../../Component/Vnavbar/Vnavbar'

const Vhome = () => {
  return (
    <div className="List">
      <Sidebar />
      <div className="ListContainer">
        <Navbar />

        
      </div>
    </div>
  )
}

export default Vhome