import React,{useContext}from 'react'
import {DataContext} from '../context/DataContext'
const Test = () => {
    const data = useContext(DataContext)
    console.log(data)
  return (
    <>
      <h1>Sell Article Page</h1>
    </>
  )
}

export default Test
