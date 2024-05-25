import React from 'react'
import { useSelector } from 'react-redux'
import { HiLocationMarker, HiPhone } from 'react-icons/hi'

import '../css/AccountPage.css'

const AccountPage = () => {

    const { currentUser } = useSelector(state => state.user)

    return (
        <div className='accountpage'>
            <p className='accountpage-title'>Thông tin tài khoản</p>

            <>
                <div className="accountpage-body">
                    <div className="accountpage-avatar">
                        <div style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKScL9qEq69Tu0H4VBl3JOu9XGZYoQhlq9AQ&usqp=CAU)` }}></div>
                    </div>
                    <div className="accountpage-content">
                        <div className="account-name">
                            <p>{currentUser.username}</p>
                            <span>{currentUser.isAdmin ? "Admin" : "Member"}</span>
                        </div>

                        <div className="account-address">
                            <p>Địa chỉ</p>
                            <span>
                                <HiLocationMarker className='account-icon' />
                                Hà Nội
                            </span>
                        </div>

                        <div className="account-address">
                            <p>Số điện thoại</p>
                            <span>
                                <HiPhone className='account-icon' />
                                +84265662010
                            </span>
                        </div>

                        <span className="account-edit">Sửa</span>
                    </div>
                </div>
            </>
        </div>
    )
}

export default AccountPage
