import React from 'react'
import NavBar from '../Components/User/NavBar'
import { Outlet } from 'react-router'

const Homepage = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default Homepage