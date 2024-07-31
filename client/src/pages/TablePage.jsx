import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Card from '../components/Card'
import '../css/TablePage.css'
import slug from '../config/slug'
import handleRequestApi from '../api'
import { setAllTable } from '../redux/tableSlice'
import noProduct from '../assets/noproductfound.png'


const dataTable = {
    name: 'Bàn Hồng Quân khổ 60*80',
    price: '250.000',
    urlImg: 'https://minhancomputer.com/media/lib/15-01-2021/ban-chu-l.jpg',
    id: '2171899823'
}

const TablePage = () => {
    const dispatch = useDispatch()
    const { listCurrentTable } = useSelector(state => state.table)


    useEffect(() => {
        const getTables = async () => {
            const tables = await handleRequestApi.getAllTable()
            if (!tables.success) {
                toast.error("Gặp lỗi! Vui lòng load lại trang web")
                return
            }
            dispatch(setAllTable(tables.tables))
        }

        getTables()
    }, [])


    return (
        <>
            <div className='tablepage'>
                <p className="tablepage-title">Các mẫu bàn</p>
                <div className="tablepage-cards">
                    {
                        listCurrentTable.length > 0 ?
                            listCurrentTable.map((table, i) => (
                                <div className="tablepage-card-item">
                                    <Card key={table._id} data={table} slug={slug.table} />
                                </div>
                            )) :
                            <div className='img_nochair'>
                                <img src={noProduct} alt="" />
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default TablePage
