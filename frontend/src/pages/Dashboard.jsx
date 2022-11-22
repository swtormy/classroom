import React from 'react'
import BarGraph from '../components/BarGraph';
import Drivers from '../components/Drivers';


const Dashboard = () => {
  return (
    <div style={{
        'margin':'5em',
        'width': '50rem'
    }}>
        <BarGraph  />
        <br/>
        <Drivers />

        <button></button>
    </div>
  )
}

export default Dashboard