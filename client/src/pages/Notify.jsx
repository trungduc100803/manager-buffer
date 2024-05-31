import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import '../css/Notify.css'
import handleRequestApi from '../api'
import { setAllNotifyProductSuccess } from '../redux/notifyProductSlice'

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
    const dispatch = useDispatch()
    const { allNotifyProduct } = useSelector(state => state.notifyP)


    useState(() => {
        const getNotifys = async () => {
            const notifys = await handleRequestApi.getAllNotifyProduct()
            dispatch(setAllNotifyProductSuccess(notifys.notifyProducts))
        }
        getNotifys()
    }, [])




    return <>
        {
            allNotifyProduct.length > 0 ?
                <div className="approve">
                    {
                        allNotifyProduct && allNotifyProduct.map((notify, i) => <NotifyProduct notify={notify} key={i} />)
                    }
                </div> :
                'chua cos thong baso'
        }
    </>
}

const NotifyProduct = ({ notify }) => {

    const [auth, setAuth] = useState(null)
    const dispatch = useDispatch()
    const [product, setproduct] = useState(null)
    useEffect(() => {
        const getAuthSender = async () => {
            const auth = await handleRequestApi.getAuthById(notify.sender)
            const authData = await auth.auth
            setAuth(authData)
        }
        const getProductFromSender = async () => {
            const chair = await handleRequestApi.getChairById(notify.idProduct)
            const chairData = await chair.chair
            setproduct(chairData)
        }
        getAuthSender()
        getProductFromSender()
    }, [])

    const handleAccept = async () => {
        const billData = {
            sender: notify.sender,
            idChair: notify.idProduct,
            number: notify.number,
            dateOut: notify.dateOut,
            totalPrice: notify.totalPrice,
            nameChair: product.name,
            priceChair: product.price,
            urlImgChair: product.urlImg[0],
            colorChair: product.color
        }
        const chairData = {
            number: notify.number,
            id: product._id
        }

        //khi nhan dong y se them bill và tru di so luong ghe trong kho
        const bill = await handleRequestApi.addBill(billData)
        const chair = await handleRequestApi.exportChair(chairData)
        // khi thành cong sẽ cap nhat lai notify
        if (bill.success && chair.success) {
            await handleRequestApi.editStatusNotifyProduct(notify._id)
            const allNotify = await handleRequestApi.getAllNotifyProduct()
            dispatch(setAllNotifyProductSuccess(allNotify.notifyProducts))
            toast.success('Phê duyệt thành công👌👌')
        }

    }

    const handleCancel = async () => {
        await handleRequestApi.editStatusNotifyProduct(notify._id)
        const allNotify = await handleRequestApi.getAllNotifyProduct()
        dispatch(setAllNotifyProductSuccess(allNotify.notifyProducts))
    }

    return auth && <div className="notifyProduct">
        <div className="notifyProduct-body">
            <div className="notifyProduct-head">
                <img src={auth.urlImgProfile} alt="" />
                <span className='notifyProduct-title'>{auth.username}: <span>{notify.content}</span></span>
            </div>
            {
                product &&
                <div className="notifyProduct-info">
                    <p>Thông tin sản phẩm muốn xuất kho</p>
                    <div className="notifyProduct-info-item">
                        <p>Tên sản phẩm:</p>
                        <span>{product.name}</span>
                    </div>
                    <div className="notifyProduct-info-item">
                        <p>Hình ảnh:</p>
                        <Link to={`/detail-product?type=chair&id=${product._id}&product=${product.name}`}>
                            <img src={product.urlImg} alt="" />
                        </Link>
                    </div>
                    <div className="notifyProduct-info-item">
                        <p>Số lượng muốn xuất:</p>
                        <span>{notify.number}</span>
                    </div>
                    <div className="notifyProduct-info-item">
                        <p>Tổng giá trị:</p>
                        <span>{notify.totalPrice}</span>
                    </div>

                    {
                        !notify.status &&
                        <div className="notifyProduct-info-btns">
                            <button onClick={handleAccept} className="notifyProduct-info-btn ok">Đồng ý xuất kho</button>
                            <button onClick={handleCancel} className="notifyProduct-info-btn cancel">Từ chối</button>
                        </div>
                    }
                </div>
            }
        </div>
    </div>
}

const Noti = () => {
    return <>
        <div className="noti">
            noti
        </div>
    </>
}
