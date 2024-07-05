import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import '../css/Notify.css'
import handleRequestApi from '../api'
import { formatNumberWithDots, formatDate } from '../utils/index'
import { setAllNotifyProductSuccess } from '../redux/notifyProductSlice'
import NotNotify from '../assets/noNotify.webp'

export default function Notify() {
    const [tab, setTab] = useState(true)
    const [numberNotify, setNumberNotify] = useState(0)
    const { allNotifyProduct } = useSelector(state => state.notifyP)

    useEffect(() => {
        let number = 0
        allNotifyProduct.forEach(notify => {
            if (notify.status === false) {
                number++
                return
            }
        });
        setNumberNotify(number)
    }, [allNotifyProduct])


    return (
        <div className='notify'>
            <div className="tab-manager">
                <div className={tab ? 'tab-manager-item active' : "tab-manager-item"} onClick={() => setTab(true)}>
                    <p>Phê duyệt</p>
                    {
                        numberNotify > 0 && <span>{numberNotify}</span>
                    }
                </div>

                {/* <div className={tab ? 'tab-manager-item' : 'tab-manager-item active'} onClick={() => setTab(false)}>
                    <p>Thông báo</p>
                </div> */}
            </div>
            <div className="notify-content">
                {
                    tab && tab ? <Approve /> :
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
            allNotifyProduct && allNotifyProduct.length > 0 ?
                <div className="approve">
                    {
                        allNotifyProduct.map((notify, i) => <NotifyProduct notify={notify} key={i} />)
                    }
                </div> :
                <div className='img_notNotify'>
                    <img src={NotNotify} alt="" />
                </div>

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
        const getChairFromSender = async () => {
            const chair = await handleRequestApi.getChairById(notify.idProduct)
            const chairData = await chair.chair
            setproduct(chairData)
        }

        const getTableFromSender = async () => {
            const table = await handleRequestApi.getTableById(notify.idProduct)
            const tableData = await table.table
            setproduct(tableData)
        }

        getAuthSender()
        notify.slug === 'chair' ? getChairFromSender() :
            getTableFromSender()
    }, [])


    const handleAccept = async () => {
        if (notify.slug === 'chair') {
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
                id: notify.idProduct
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
        } else {
            const billData = {
                sender: notify.sender,
                idTable: notify.idProduct,
                number: notify.number,
                dateOut: notify.dateOut,
                totalPrice: notify.totalPrice,
                nameTable: product.name,
                priceTable: product.price,
                urlImgTable: product.urlImgTable,
                // colorTable: product.color,
                size: product.size
            }
            const tableData = {
                number: notify.number,
                id: notify.idProduct
            }

            //khi nhan dong y se them bill và tru di so luong ghe trong kho
            const bill = await handleRequestApi.addBillTable(billData)
            const table = await handleRequestApi.exportTable(tableData)
            // khi thành cong sẽ cap nhat lai notify
            if (bill.success && table.success) {
                await handleRequestApi.editStatusNotifyProduct(notify._id)
                const allNotify = await handleRequestApi.getAllNotifyProduct()
                dispatch(setAllNotifyProductSuccess(allNotify.notifyProducts))
                toast.success('Phê duyệt thành công👌👌')
            }
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
                        {
                            notify.slug === 'chair' ?
                                <Link to={`/detail-product?type=chair&id=${product._id}&product=${product.name}`}>
                                    <img src={product.urlImg} alt="" />
                                </Link> :
                                <Link to={`/detail-product?type=table&id=${product._id}&product=${product.name}`}>
                                    <img src={product.urlImgTable} alt="" />
                                </Link>
                        }
                    </div>
                    <div className="notifyProduct-info-item">
                        <p>Số lượng muốn xuất:</p>
                        <span>{notify.number}</span>
                    </div>
                    {
                        notify.status &&
                        <div className="notifyProduct-info-item">
                            <p>Ngày xuất:</p>
                            <span>{formatDate(notify.dateOut)}</span>
                        </div>
                    }
                    <div className="notifyProduct-info-item">
                        <p>Tổng giá trị:</p>
                        <span>{formatNumberWithDots(notify.totalPrice)}</span>
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
