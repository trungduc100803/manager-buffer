import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Chart } from "react-google-charts";

import '../css/HomePage.css'
import CardHomeDash from '../components/CardHomeDash'
import handleRequestApi from '../api'
// import { setAllBillFailure, setAllBillPending, setAllBillSuccess } from '../redux/billSlice'
// import { setAllBillTableFailure, setAllBillTablePending, setAllBillTableSuccess } from '../redux/billTableSlice'
import { getDataChartChair, getDataChartTable } from '../utils/index'


export const data = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Platinum", 100.45, "color: #e5e4e2"], // CSS-style declaration
    ["Platinum", 100.45, "color: #e5e4e2"], // CSS-style declaration
    ["Platinum", 100.45, "color: #e5e4e2"], // CSS-style declaration
    ["Platinum", 100.45, "color: #e5e4e2"], // CSS-style declaration
    ["Platinum", 100.45, "color: #e5e4e2"], // CSS-style declaration
    ["Platinum", 100.45, "color: #e5e4e2"], // CSS-style declaration
];

const HomePage = () => {

    const [numberChair, setNumberChair] = useState(0)
    const [numberTable, setNumberTable] = useState(0)
    const [monthlyChair, setMonthlyChair] = useState([])
    const [monthlyTable, setMonthlyTable] = useState([])

    // const dispatch = useDispatch()
    // const { allBill, loading } = useSelector(state => state.bill)
    // const { allBillTable } = useSelector(state => state.billTable)

    // const getBillTableToday = async () => {
    //     const date = new Date()
    //     const day = date.getDate()
    //     const month = date.getMonth() + 1
    //     const year = date.getFullYear()
    //     const formattedDate = year + '-' + month + '-' + day
    //     dispatch(setAllBillTablePending())
    //     const bills = await handleRequestApi.getBillTableToday(formattedDate)
    //     if (!bills.success) {
    //         dispatch(setAllBillTableFailure(bills.message))
    //         return
    //     }
    //     dispatch(setAllBillTableSuccess(bills.bills))
    // }

    // const getBillToday = async () => {
    //     const date = new Date()
    //     const day = date.getDate()
    //     const month = date.getMonth() + 1
    //     const year = date.getFullYear()
    //     const formattedDate = year + '-' + month + '-' + day
    //     dispatch(setAllBillPending())
    //     const bills = await handleRequestApi.getBillToday(formattedDate)
    //     if (!bills.success) {
    //         dispatch(setAllBillFailure(bills.message))
    //         return
    //     }
    //     dispatch(setAllBillSuccess(bills.bills))
    // }

    const getMonthChair = async () => {
        const chairs = await handleRequestApi.getMonthlyBill()
        if (!chairs.success) return
        setMonthlyChair(chairs.monthlyBills[0]?.bills)
    }

    const getMonthTable = async () => {
        const tables = await handleRequestApi.getMonthlyBillTable()
        if (!tables.success) return
        setMonthlyTable(tables.monthlyBills[0]?.bills)
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
        // getBillToday()
        // getBillTableToday()
        getMonthChair()
        getMonthTable()
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

            <p className='title'>Số lượng các mẫu ghế đã bán ra trong vòng 30 ngày kể từ hôm nay</p>
            {monthlyChair && <Chart chartType="ColumnChart" className="chart" data={getDataChartChair(monthlyChair)} />}

            <p className='title'>Số lượng các mẫu bàn đã bán ra trong vòng 30 ngày kể từ hôm nay</p>
            {monthlyTable && <Chart chartType="ColumnChart" className="chart" data={getDataChartTable(monthlyTable)} />}


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
