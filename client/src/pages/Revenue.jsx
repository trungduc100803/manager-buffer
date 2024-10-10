import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'


import '../css/Revenue.css'
import { formatDate, formatNumberWithDots } from '../utils/index'
import handleRequestApi from '../api'
import { setAllBillFailure, setAllBillPending, setAllBillSuccess } from '../redux/billSlice'
import { setAllBillTableFailure, setAllBillTablePending, setAllBillTableSuccess } from '../redux/billTableSlice'

export default function Revenue() {
    const [tab, setTab] = useState('true')

    return <>
        <div className="tab-manager revenu">
            <div className={tab === 'true' ? 'tab-manager-item active' : "tab-manager-item"} onClick={() => setTab('true')}>
                <p>Ghế</p>
            </div>

            <div className={tab === 'true' ? 'tab-manager-item' : 'tab-manager-item active'} onClick={() => setTab('false')}>
                <p>Bàn</p>
            </div>
        </div>
        {
            tab && tab === 'true' ? <RevenueChair /> : <RevenueTable />
        }
    </>

}


const RevenueChair = () => {
    const dispatch = useDispatch()
    const { allBill, loading } = useSelector(state => state.bill)
    const [allBillGroup, setAllBillGroup] = useState(null)
    const [stateFilter, setStateFilter] = useState('today')
    const [startDate, setStartdate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [nameEmployee, setNameEmployee] = useState('')
    const [allAuth, setAllAuth] = useState([])

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

    const getWeeklyBill = async () => {
        const bills = await handleRequestApi.getWeeklyBill()
        if (!bills.success) {
            return
        }
        dispatch(setAllBillSuccess((bills.weeklyBills[0].bills).reverse()))
    }

    const getMonthlyBill = async () => {
        const bills = await handleRequestApi.getMonthlyBill()
        if (!bills.success) {
            return
        }
        dispatch(setAllBillSuccess((bills.monthlyBills[0].bills).reverse()))
    }

    useEffect(() => {
        const getAllAuth = async () => {
            const auths = await handleRequestApi.getAllAuth()
            if (!auths.success) return
            setAllAuth(auths.allAuth)
        }
        getAllAuth()
    }, [])


    useEffect(() => {
        if (stateFilter === 'week') {
            getWeeklyBill()
            return
        }

        if (stateFilter === 'month') {
            getMonthlyBill()
            return
        }

        if (stateFilter === 'today') {
            getBillToday()
            return
        }
    }, [stateFilter])


    const handlechange = e => {
        setStateFilter(e.target.id)
    }

    const handleChangeStartDate = (e) => {
        setStartdate(e.target.value)
    }

    const handleChangeEndDate = (e) => {
        const date = new Date(e.target.value)
        const day = Number.parseInt(e.target.value.split('-')[2]) + 1
        date.setDate(day)
        const newDate = date.toISOString().slice(0, 10)
        setEndDate(newDate)
    }

    const handleFilter = async () => {
        // e.preventDefault()

        // dispatch(setAllBillPending())
        if (nameEmployee === "") {
            if (startDate === null || endDate === null) {
                toast.warning('Yêu cầu nhập đủ ngày tháng để tìm kiếm😊')
                return
            }
            dispatch(setAllBillPending())
            const bills = await handleRequestApi.getBillOption(startDate, endDate)
            if (!bills.success) {
                dispatch(setAllBillFailure('loi'))
                return
            }
            dispatch(setAllBillSuccess(bills.bills))
            setStateFilter('')
        } else {
            if (startDate === null && endDate === null) {
                //loc theo ten
                const b = await handleRequestApi.getBillOptionAndName(nameEmployee)
                console.log(b)
            } else {
                console.log(nameEmployee)
            }
        }
    }

    useEffect(() => {
        const priceArr = allBill.map((bill) => bill.totalPrice)
        let total = 0
        for (let i = 0; i < priceArr.length; i++) {
            total += priceArr[i]
        }
        setTotalRevenue(total)
    }, [allBill])

    let groupedByDateOut = null

    if (allBill != undefined) {
        groupedByDateOut = allBill.reduce((acc, item) => {
            if (!acc[item.dateOut]) {
                acc[item.dateOut] = [];
            }
            acc[item.dateOut].push(item);
            return acc;
        }, {});
    }
    const arrayBill = Object.values(groupedByDateOut)

    const handleTotalItem = (item) => {
        const priceArr = item.map((bill) => bill.totalPrice)
        let total = 0
        for (let i = 0; i < priceArr.length; i++) {
            total += priceArr[i]
        }
        return formatNumberWithDots(total)
    }

    return (

        <>
            {
                <div div className="revenue" >
                    <p>Toàn bộ doanh thu ghế</p>
                    <div className="revenue-filter">
                        <div className="revenue-filter-left">
                            <p>Mặc định</p>
                            <form className="revenue-filter-left-body">
                                <div className="revenue-filter-item">
                                    <input type="radio" name="a" id="today" checked={stateFilter === 'today' ? true : false} onChange={e => handlechange(e)} />
                                    <label htmlFor="">Hôm nay</label>
                                </div>
                                <div className="revenue-filter-item">
                                    <input type="radio" name="a" id="week" checked={stateFilter === 'week' ? true : false} onChange={e => handlechange(e)} />
                                    <label htmlFor="">1 tuần trước</label>
                                </div>
                                <div className="revenue-filter-item">
                                    <input type="radio" name="a" id="month" checked={stateFilter === 'month' ? true : false} onChange={e => handlechange(e)} />
                                    <label htmlFor="">1 tháng trước</label>
                                </div>
                            </form>
                        </div>

                        <div className="revenue-filter-rigth">
                            <p>Tùy chọn</p>
                            <div className="revenue-filter-rigth-body">
                                <div className="revenue-filter-rigth-item">
                                    <label htmlFor="">Từ ngày</label>
                                    <input type="date" name="" id="startDate" onChange={e => handleChangeStartDate(e)} />
                                </div>
                                <div className="revenue-filter-rigth-item">
                                    <label htmlFor="">Đến ngày</label>
                                    <input type="date" name="" id="endDate" onChange={e => handleChangeEndDate(e)} />
                                </div>
                            </div>
                        </div>

                        <div className="revenue-filter-name">
                            <p>Lọc theo tên nhân viên</p>
                            <form action="" className='form-filter-name'>
                                <div className="form-filter-name-item">
                                    <label htmlFor="">Tên nhân viên</label>
                                    <select onChange={e => setNameEmployee(e.target.value)} name="nameEmployee" id="nameEmployee">
                                        <option value="">VD: --Nguyễn Văn A--</option>
                                        {
                                            allAuth.length > 0 ?
                                                allAuth.map((auth, i) => <option key={i} value={auth.username}>{auth.username}</option>)
                                                :
                                                <></>
                                        }
                                    </select>
                                </div>
                            </form>
                        </div>
                        <button onClick={handleFilter} className='btn-filter' type='submit'>Lọc</button>

                    </div>
                    {
                        loading ? 'loading ....' :
                            arrayBill.length > 0 ?
                                <>
                                    {
                                        arrayBill.map((b, i) => {
                                            return <div key={i} className="revenue-body">
                                                <p className='option-tile'>Doanh thu {b[0] && formatDate(b[0].dateOut)}</p>

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
                                                    b && b.map((bill, i) => <RevenueComp revenue={bill} stt={i + 1} key={i} />)
                                                }

                                                <div className="revenue-total-item">
                                                    <p className='revenue-total-title-item'>Tổng hóa đơn:</p>
                                                    <span>{handleTotalItem(b)}</span>
                                                </div>


                                                <div className="revenue-total">
                                                    <p className='revenue-total-title'>Tổng hóa đơn:</p>
                                                    <span>{formatNumberWithDots(totalRevenue)}</span>
                                                </div>
                                            </div>
                                        })
                                    }
                                </> :
                                <div>Không có sản phẩm nào!!</div>
                    }
                </div >
            }
        </>
    )
}


const RevenueTable = () => {
    const dispatch = useDispatch()
    const { allBillTable, loading } = useSelector(state => state.billTable)
    const [stateFilter, setStateFilter] = useState('today')
    const [startDate, setStartdate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [totalRevenue, setTotalRevenue] = useState(0)

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

    const getWeeklyBillTable = async () => {
        const bills = await handleRequestApi.getWeeklyBillTable()
        console.log(bills)

        if (!bills.success) {
            return
        }
        dispatch(setAllBillTableSuccess((bills.weeklyBills).reverse()))
    }

    const getMonthlyBillTable = async () => {
        const bills = await handleRequestApi.getMonthlyBillTable()
        console.log(bills)
        if (!bills.success) {
            return
        }
        dispatch(setAllBillTableSuccess((bills.monthlyBills[0].bills).reverse()))
    }


    useEffect(() => {
        if (stateFilter === 'week') {
            getWeeklyBillTable()
            return
        }

        if (stateFilter === 'month') {
            getMonthlyBillTable()
            return
        }

        if (stateFilter === 'today') {
            getBillTableToday()
            return
        }
    }, [stateFilter])


    const handlechange = e => {
        setStateFilter(e.target.id)
    }

    const handleChangeStartDate = (e) => {
        setStartdate(e.target.value)
    }

    const handleChangeEndDate = (e) => {
        const date = new Date(e.target.value)
        const day = Number.parseInt(e.target.value.split('-')[2]) + 1
        date.setDate(day)
        const newDate = date.toISOString().slice(0, 10)
        setEndDate(newDate)
    }

    const handleFilter = async (e) => {
        e.preventDefault()

        if (startDate === null || endDate === null) {
            toast.warning('Yêu cầu nhập đủ ngày tháng để tìm kiếm😊')
            return
        }
        dispatch(setAllBillTablePending())
        const bills = await handleRequestApi.getBillTableOption(startDate, endDate)
        if (!bills.success) {
            dispatch(setAllBillTableFailure('loi'))
            return
        }
        dispatch(setAllBillTableSuccess(bills.bills))
        setStateFilter('')
    }

    useEffect(() => {
        const priceArr = allBillTable.map((bill) => bill.totalPrice)
        let total = 0
        for (let i = 0; i < priceArr.length; i++) {
            total += priceArr[i]
        }
        setTotalRevenue(total)
    }, [allBillTable])

    let groupedByDateOut = null
    if (allBillTable != undefined) {
        groupedByDateOut = allBillTable.reduce((acc, item) => {
            if (!acc[item.dateOut]) {
                acc[item.dateOut] = [];
            }
            acc[item.dateOut].push(item);
            return acc;
        }, {});
    }

    const arrayBill = Object.values(groupedByDateOut)

    const handleTotalItem = (item) => {
        const priceArr = item.map((bill) => bill.totalPrice)
        let total = 0
        for (let i = 0; i < priceArr.length; i++) {
            total += priceArr[i]
        }
        return formatNumberWithDots(total)
    }

    return (
        <>
            {
                <div className="revenue">
                    <p>Toàn bộ doanh thu bàn</p>
                    <div className="revenue-filter">
                        <div className="revenue-filter-left">
                            <p>Mặc định</p>
                            <form className="revenue-filter-left-body">
                                <div className="revenue-filter-item">
                                    <input type="radio" name="a" id="today" checked={stateFilter === 'today' ? true : false} onChange={e => handlechange(e)} />
                                    <label htmlFor="">Hôm nay</label>
                                </div>
                                <div className="revenue-filter-item">
                                    <input type="radio" name="a" id="week" checked={stateFilter === 'week' ? true : false} onChange={e => handlechange(e)} />
                                    <label htmlFor="">1 tuần trước</label>
                                </div>
                                <div className="revenue-filter-item">
                                    <input type="radio" name="a" id="month" checked={stateFilter === 'month' ? true : false} onChange={e => handlechange(e)} />
                                    <label htmlFor="">1 tháng trước</label>
                                </div>
                            </form>
                        </div>

                        <div className="revenue-filter-rigth">
                            <p>Tùy chọn</p>
                            <form onSubmit={e => handleFilter(e)} className="revenue-filter-rigth-body">
                                <div className="revenue-filter-rigth-item">
                                    <label htmlFor="">Từ ngày</label>
                                    <input type="date" name="" id="startDate" onChange={e => handleChangeStartDate(e)} />
                                </div>
                                <div className="revenue-filter-rigth-item">
                                    <label htmlFor="">Đến ngày</label>
                                    <input type="date" name="" id="endDate" onChange={e => handleChangeEndDate(e)} />
                                </div>
                                <button className='btn-filter' type='submit'>Lọc</button>
                            </form>
                        </div>
                    </div>
                    {
                        loading ? 'loading ....' :
                            arrayBill &&
                            <>
                                {
                                    arrayBill.map((b, i) => {
                                        return <div key={i} className="revenue-body">
                                            <p className='option-tile'>Doanh thu {b[0] && formatDate(b[0].dateOut)}</p>
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
                                                b && b.map((bill, i) => <RevenueComp revenue={bill} stt={i + 1} key={i} />)
                                            }

                                            <div className="revenue-total-item">
                                                <p className='revenue-total-title-item'>Tổng hóa đơn:</p>
                                                <span>{handleTotalItem(b)}</span>
                                            </div>

                                            {
                                                totalRevenue &&
                                                <div className="revenue-total">
                                                    <p className='revenue-total-title'>Tổng hóa đơn:</p>
                                                    <span>{formatNumberWithDots(totalRevenue)}</span>
                                                </div>
                                            }


                                        </div>
                                    })
                                }
                            </>
                    }
                </div>
            }
        </>
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
            {
                revenue.priceChair &&
                <div className="revenueComp-item price">{formatNumberWithDots(revenue.priceChair)}</div>
            }
            {
                revenue.priceTable &&
                <div className="revenueComp-item price">{formatNumberWithDots(revenue.priceTable)}</div>
            }
            {
                revenue.totalPrice &&
                <div className="revenueComp-item totalPrice">{formatNumberWithDots(revenue.totalPrice)}</div>
            }
        </div>
    </>
}
