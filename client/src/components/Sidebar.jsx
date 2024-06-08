import React, { useEffect, useState } from 'react'
import { HiHome, HiTable, HiAcademicCap, HiUser, HiLogout, HiDatabase, HiCalculator, HiBell } from 'react-icons/hi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'

import '../css/Sidebar.css'
import { setAuthPending, setAuthSuccess } from '../redux/authSlice'
import handleRequestApi from '../api';
import Logo from '../assets/logo.png'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        outLine: 'none',
        minWidth: '400px',
        zIndex: '1000'
    },
};

const Sidebars = ({ setActiveSidebar }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const [tab, setTab] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])


    const handleSignOut = async () => {
        dispatch(setAuthPending())
        const auth = await handleRequestApi.signout()
        if (auth.success) {
            dispatch(setAuthSuccess(null))
            navigate('/sign-in')
        }
    }

    const handleLogout = () => {
        setActiveSidebar(false)
        openModal()
    }


    return (
        <div className="sidebar">

            <div className="sidebar-logo">
                <img src={Logo} alt="" />
            </div>

            <Link to={'?tab=home'} onClick={() => setActiveSidebar(false)}>
                <div className={`sidebar-item ${tab === 'home' || tab === '' ? 'active' : ''}`}>
                    <HiHome className='sidebar-icon' />
                    <p>Tổng quan</p>
                </div>
            </Link>

            <Link to={'?tab=chair'} onClick={() => setActiveSidebar(false)}>
                <div className={`sidebar-item ${tab === 'chair' ? 'active' : ''}`}>
                    <HiTable className='sidebar-icon' />
                    <p>Ghế</p>
                </div>
            </Link>
            <Link to={'?tab=table'} onClick={() => setActiveSidebar(false)}>
                <div className={`sidebar-item ${tab === 'table' ? 'active' : ''}`}>
                    <HiAcademicCap className='sidebar-icon' />
                    <p>Bàn</p>
                </div>
            </Link>
            {
                currentUser.isAdmin &&
                <Link to={`?tab=notify&name=${currentUser.username}`} onClick={() => setActiveSidebar(false)}>
                    <div className={`sidebar-item ${tab === 'notify' ? 'active' : ''}`}>
                        <HiBell className='sidebar-icon' />
                        <p>Thông báo</p>
                    </div>
                </Link>
            }
            {
                currentUser.isAdmin &&
                <Link to={`?tab=admin&name=${currentUser.username}`} onClick={() => setActiveSidebar(false)}>
                    <div className={`sidebar-item ${tab === 'admin' ? 'active' : ''}`}>
                        <HiDatabase className='sidebar-icon' />
                        <p>Quản lý hàng hóa</p>
                    </div>
                </Link>
            }
            {
                currentUser.isAdmin &&
                <Link to={`?tab=revenue&name=${currentUser.username}`} onClick={() => setActiveSidebar(false)}>
                    <div className={`sidebar-item ${tab === 'revenue' ? 'active' : ''}`}>
                        <HiCalculator className='sidebar-icon' />
                        <p>Doanh thu</p>
                    </div>
                </Link>
            }
            <Link to={'?tab=account'}>
                <div className={`sidebar-item ${tab === 'account' ? 'active' : ''}`} onClick={() => setActiveSidebar(false)}>
                    {
                        currentUser !== null ?
                            <div className="avatar-user">
                                <img src={currentUser.urlImgProfile} alt="" />
                            </div>
                            :
                            <HiUser className='sidebar-icon' />
                    }
                    <p>Tài khoản</p>
                </div>
            </Link>

            <div onClick={handleLogout} className={`sidebar-item sidebar-item-logout `} >
                <HiLogout className='sidebar-icon' />
                <p>Đăng xuất</p>
            </div>




            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <>
                    <div className="modal-signout">
                        <p>Bạn chắc chắn muốn đăng xuất?</p>
                        <div className="btns-modal">
                            <button onClick={handleSignOut} className='btn-modal btn-modal-ok'>Đúng vây</button>
                            <button onClick={closeModal} className='btn-modal btn-modal-cancel'>Không</button>
                        </div>
                    </div>
                </>
            </Modal>

        </div>
    )
}

export default Sidebars
