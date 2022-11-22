import React, { createContext, useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'; 

const StateContext = createContext()

export const ContextProvider = ({ children }) => {
    const [kpiLeft, setKpiLeft] = useState(18)
    const [driver1, setDraiver1] = useState(2)
    const [driver2, setDraiver2] = useState(5)
    const [driver3, setDraiver3] = useState(9)
    const history = useNavigate()

    const [textArea, setTextArea] = useState()

    const driver1plus = () => {
        setDraiver1(driver1-1)
        console.log(driver1);
    }
    const driver1minus = () => {
        setDraiver1(driver1+1)
        console.log(driver1);
    }
    const driver2plus = () => {
        setDraiver2(driver2+1)
        console.log(driver2);
    }
    const driver2minus = () => {
        setDraiver2(driver2-1)
        console.log(driver2);
    }
    const driver3plus = () => {
        setDraiver3(driver3-1)
        console.log(driver3);
    }
    const driver3minus = () => {
        setDraiver3(driver3+1)
        console.log(driver3);
    }

    return (
        <StateContext.Provider
          value={{
            kpiLeft, setKpiLeft,
            driver1, setDraiver1,
            driver2, setDraiver2,
            driver3, setDraiver3,
            driver1plus,driver1minus,driver2plus,driver2minus,driver3plus,driver3minus,
            history,
            textArea,
            setTextArea
          }}
        >
          {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)