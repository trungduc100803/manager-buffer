import React, { useEffect, useState } from 'react'
import { HiHome, HiTable, HiAcademicCap, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'


import '../css/Sidebar.css'

const Sidebars = () => {
    const location = useLocation()
    const [tab, setTab] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])
    return (
        <div className="sidebar">
            <Link to={'?tab=home'}>
                <div className={`sidebar-item ${tab === 'home' || tab === '' ? 'active' : ''}`}>
                    <HiHome className='sidebar-icon' />
                    <p>Home</p>
                </div>
            </Link>

            <Link to={'?tab=chair'}>
                <div className={`sidebar-item ${tab === 'chair' ? 'active' : ''}`}>
                    <HiTable className='sidebar-icon' />
                    <p>Chair</p>
                </div>
            </Link>
            <Link to={'?tab=table'}>
                <div className={`sidebar-item ${tab === 'table' ? 'active' : ''}`}>
                    <HiAcademicCap className='sidebar-icon' />
                    <p>Table</p>
                </div>
            </Link>
            <Link to={'?tab=account'}>
                <div className={`sidebar-item ${tab === 'account' ? 'active' : ''}`}>
                    <HiUser className='sidebar-icon' />
                    <p>My Account</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebars
