import React from 'react'

import Card from '../components/Card'
import '../css/TablePage.css'

const dataTable = {
    name: 'Bàn Hồng Quân khổ 60*80',
    price: '250.000',
    urlImg: 'https://minhancomputer.com/media/lib/15-01-2021/ban-chu-l.jpg'
}

const TablePage = () => {
    return (
        <>
            <div className='tablepage'>
                <p className="tablepage-title">Các mẫu bàn</p>
                <div className="tablepage-cards">
                    <div className="tablepage-card-item">
                        <Card data={dataTable} />
                    </div>
                    <div className="tablepage-card-item">
                        <Card data={dataTable} />
                    </div>
                    <div className="tablepage-card-item">
                        <Card data={dataTable} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TablePage
