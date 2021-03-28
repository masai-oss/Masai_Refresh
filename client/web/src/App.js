import React from 'react'
import { Routes } from './Routes/Routes'
import { Navbar } from './Structure/Navbar'
import { IsAdmin } from "./Structure/Common/";

const App = () => {
    const isAdmin = IsAdmin();
    return (
        <div>
            <Navbar isAdmin={isAdmin} />
            <Routes />
        </div>
    )
}

export default App
