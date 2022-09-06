import React from 'react'
import "./vhome.scss"
import Vsidebar from '../../Component/Vsidebar/Vsidebar'
import Vnavbar from '../../Component/Vnavbar/Vnavbar'

const Vhome = () => {
  return (
    <div className="home">
      <Vsidebar />
      <div className="homeContainer">
        <Vnavbar />

        
      </div>
    </div>
  )
}

export default Vhome