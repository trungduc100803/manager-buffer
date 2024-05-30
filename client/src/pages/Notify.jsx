import React, { useEffect } from 'react'
import { useState } from 'react'
import { socket } from '../socketIO'

import '../css/Notify.css'
import handleRequestApi from '../api'

export default function Notify() {
    const [tab, setTab] = useState(true)

    useEffect(() => {
        // get all notify
    }, [])

    return (
        <div className='notify'>
            <div className="tab-manager">
                <div className={tab ? 'tab-manager-item active' : "tab-manager-item"} onClick={() => setTab(true)}>
                    <p>Phê duyệt</p>
                </div>

                <div className={tab ? 'tab-manager-item' : 'tab-manager-item active'} onClick={() => setTab(false)}>
                    <p>Thông báo</p>
                </div>
            </div>
            <div className="notify-content">
                {
                    tab ? <Approve /> :
                        <Noti />
                }
            </div>
        </div>
    )
}

const Approve = () => {


    useState(() => {
        const getNotifys = async () => {
            const notifys = await handleRequestApi.getAllNotifyProduct()
            console.log(notifys.notifyProducts)
        }
        getNotifys()
    }, [])

    return <>
        <div className="approve">
            appp
        </div>
    </>
}

const Noti = () => {
    return <>
        <div className="noti">
            noti
        </div>
    </>
}
