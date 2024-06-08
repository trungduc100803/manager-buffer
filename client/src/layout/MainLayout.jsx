import React from 'react'
import Sidebars from '../components/Sidebar'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'

import '../css/MainLayout.css'
import HomePage from '../pages/HomePage'
import AccountPage from '../pages/AccountPage'
import ChairPage from '../pages/ChairPage'
import TablePage from '../pages/TablePage'
import Manager from '../pages/Manager'
import Revenue from '../pages/Revenue'
import Notify from '../pages/Notify'
import Logo from '../assets/logo.png'


const MainLayout = () => {
    const location = useLocation()
    const [tab, setTab] = useState('home')
    const [activeSidebar, setActiveSidebar] = useState(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])

    const handleActiveSidebar = () => {
        setActiveSidebar(true)
    }

    return (
        <div className='main-layout'>
            <div className={activeSidebar ? 'side-layout activeTablet' : 'side-layout'}>
                <Sidebars setActiveSidebar={setActiveSidebar} />
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
                {
                    tab === 'admin' && <Manager />
                }
                {
                    tab === 'revenue' && <Revenue />
                }
                {
                    tab === 'notify' && <Notify />
                }

            </div>
            <div className="header">
                <div className="menu" onClick={handleActiveSidebar}>
                    <HiMenu className='menu-icon' />
                </div>
                <div className="header-logo">
                    <img src={Logo} alt="" className="logo-icon" />
                </div>
            </div>
        </div>
    )
}

export default MainLayout
