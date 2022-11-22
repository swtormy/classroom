import React from 'react'
import { useStateContext } from '../context/ContextProvider';

const Drivers = () => {
    const {
        driver1,driver2,driver3,
        driver1plus,driver1minus,driver2plus,driver2minus,driver3plus,driver3minus
    } = useStateContext()
  return (
    <div className='flex justify-evenly'>
        <div>
            <h2>{driver1 <= 0 ? '+'+Math.abs(driver1) : '-'+Math.abs(driver1)}</h2>
            <div>
                <button onClick={driver1plus}>+</button>
                <button onClick={driver1minus}>-</button>
            </div>
        </div>
        <div>
            <h2>{driver2}</h2>
            <div>
                <button onClick={driver2plus}>+</button>
                <button onClick={driver2minus}>-</button>
            </div>
        </div>
        <div>
            <h2>{driver3 <= 0 ? '+'+Math.abs(driver3) : '-'+Math.abs(driver3)}</h2>
            <div>
                <button onClick={driver3plus}>+</button>
                <button onClick={driver3minus}>-</button>
            </div>
        </div>
    </div>
  )
}

export default Drivers