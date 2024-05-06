import React,{useContext}from 'react'
import {DataContext} from '../context/DataContext'
const Test = () => {
    const data = useContext(DataContext)
    console.log(data)
  return (
    <div>
      {data}
    </div>
  )
}

export default Test
