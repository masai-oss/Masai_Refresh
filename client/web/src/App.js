import React from 'react'
import { Routes } from './Routes/Routes'
import { Navbar } from './Structure/Navbar'
import { IsAdmin } from "./Structure/Common/";
import styles from './App.module.css'
import { DotsLogo } from './Structure/Common/DotsLogo';

const App = () => {
    const isAdmin = IsAdmin();
    return (
        <div className={styles.container}>
            <Navbar isAdmin={isAdmin} />
            <div className={styles.pageWrapper}>
                <Routes />
            </div>
            <DotsLogo />
        </div>
    )
}

export default App
