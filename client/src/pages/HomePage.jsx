import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import '../css/HomePage.css'
import CardHomeDash from '../components/CardHomeDash'
import handleRequestApi from '../api'
import { setAllBillFailure, setAllBillPending, setAllBillSuccess } from '../redux/billSlice'
import { setAllBillTableFailure, setAllBillTablePending, setAllBillTableSuccess } from '../redux/billTableSlice'


const HomePage = () => {

    const [numberChair, setNumberChair] = useState(0)
    const [numberTable, setNumberTable] = useState(0)

    const dispatch = useDispatch()
    const { allBill, loading } = useSelector(state => state.bill)
    const { allBillTable } = useSelector(state => state.billTable)

    const getBillTableToday = async () => {
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const formattedDate = year + '-' + month + '-' + day
        dispatch(setAllBillTablePending())
        const bills = await handleRequestApi.getBillTableToday(formattedDate)
        if (!bills.success) {
            dispatch(setAllBillTableFailure(bills.message))
            return
        }
        dispatch(setAllBillTableSuccess(bills.bills))
    }

    const getBillToday = async () => {
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const formattedDate = year + '-' + month + '-' + day
        dispatch(setAllBillPending())
        const bills = await handleRequestApi.getBillToday(formattedDate)
        if (!bills.success) {
            dispatch(setAllBillFailure(bills.message))
            return
        }
        dispatch(setAllBillSuccess(bills.bills))
    }


    useEffect(() => {
        const getCountChair = async () => {
            const count = await handleRequestApi.countChair()
            if (!count.success) {
                setNumberChair(0)
                return
            }
            setNumberChair(count.count)
        }
        const getCountTable = async () => {
            const count = await handleRequestApi.countTable()
            if (!count.success) {
                setNumberTable(0)
                return
            }
            setNumberTable(count.count)
        }
        getCountChair()
        getCountTable()
        getBillToday()
        getBillTableToday()
    }, [])

    return (
        <div className='home-page'>
            <p>Tổng quan</p>
            <div className="home-dash">
                <div className="home-dash-item">
                    <CardHomeDash title={'Tổng số ghế'} number={numberChair} />
                </div>
                <div className="home-dash-item">
                    <CardHomeDash title={'Tổng số bàn'} number={numberTable} />
                </div>
            </div>

            <p className='title'>Doanh thu trong ngày</p>
            <div className="revenuehome">
                <div className="revenuehome-chair">
                    <p className="revenuehome-title">Doanh thu ghế</p>
                    <div className="revenue">
                        {
                            loading ? 'loading ....' :
                                allBill ?
                                    <div className="revenue-body">
                                        <div className="revenue-head">
                                            <div className="revenue-head-item stt">STT</div>
                                            <div className="revenue-head-item sender">Người bán</div>
                                            <div className="revenue-head-item product">Sản phẩm</div>
                                            <div className="revenue-head-item img">Hình ảnh</div>
                                            <div className="revenue-head-item color">Màu sắc</div>
                                            <div className="revenue-head-item number">Số lượng</div>
                                            <div className="revenue-head-item dateOut">Ngày xuất</div>
                                            <div className="revenue-head-item price">Đơn giá</div>
                                            <div className="revenue-head-item totalPrice">Tổng</div>
                                        </div>
                                        {
                                            allBill && allBill.map((bill, i) => <RevenueComp revenue={bill} stt={i + 1} key={i} />)
                                        }
                                    </div> :
                                    <p>chuaw cos hoa down</p>
                        }
                    </div>
                </div>

                <div className="revenuehome-table">
                    <p className="revenuehome-title">Doanh thu bàn</p>
                    <div className="revenue">
                        {
                            allBillTable &&
                            <div className="revenue-body">
                                <div className="revenue-head">
                                    <div className="revenue-head-item stt">STT</div>
                                    <div className="revenue-head-item sender">Người bán</div>
                                    <div className="revenue-head-item product">Sản phẩm</div>
                                    <div className="revenue-head-item img">Hình ảnh</div>
                                    <div className="revenue-head-item color">Màu sắc</div>
                                    <div className="revenue-head-item number">Số lượng</div>
                                    <div className="revenue-head-item dateOut">Ngày xuất</div>
                                    <div className="revenue-head-item price">Đơn giá</div>
                                    <div className="revenue-head-item totalPrice">Tổng</div>
                                </div>
                                {
                                    allBillTable && allBillTable.map((bill, i) => <RevenueComp revenue={bill} stt={i + 1} key={i} />)
                                }
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}


const RevenueComp = ({ revenue, stt }) => {

    const [authSender, setAuthSender] = useState(null)

    useEffect(() => {
        const getAuthSender = async (id) => {
            const auth = await handleRequestApi.getAuthById(id)
            if (auth.success) {
                setAuthSender(auth.auth)
                return
            }
        }

        getAuthSender(revenue.sender)
    }, [revenue])

    return <>
        <div className="revenueComp">
            <div className="revenueComp-item stt">{stt}</div>
            <div className="revenueComp-item sender">{authSender && authSender.username}</div>
            <div className="revenueComp-item product">{revenue.nameChair || revenue.nameTable}</div>
            <div className="revenueComp-item img">
                <img src={revenue.urlImgChair || revenue.urlImgTable} alt="" />
            </div>
            <div className="revenueComp-item color">{revenue.colorChair || revenue.colorTable}</div>
            <div className="revenueComp-item number">{revenue.number}</div>
            <div className="revenueComp-item dateOut">{revenue.dateOut}</div>
            <div className="revenueComp-item price">{revenue.priceChair || revenue.priceTable}</div>
            <div className="revenueComp-item totalPrice">{revenue.totalPrice}</div>
        </div>
    </>
}

export default HomePage
