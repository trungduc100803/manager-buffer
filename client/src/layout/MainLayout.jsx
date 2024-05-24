import React from 'react'
import Sidebars from '../components/Sidebar'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import '../css/MainLayout.css'
import HomePage from '../pages/HomePage'
import AccountPage from '../pages/AccountPage'
import ChairPage from '../pages/ChairPage'
import TablePage from '../pages/TablePage'

const MainLayout = () => {
    const location = useLocation()
    const [tab, setTab] = useState('home')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])
    return (
        <div className='main-layout'>
            <div className="side-layout">
                <Sidebars />
            </div>
            <div className="body-layout">
                {
                    tab === 'home' && <HomePage />
                }
                {
                    tab === 'account' && <AccountPage />
                }
                {
                    tab === 'chair' && <ChairPage />
                }
                {
                    tab === 'table' && <TablePage />
                }
            </div>
        </div>
    )
}

export default MainLayout
