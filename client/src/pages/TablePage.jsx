import React from 'react'

import Card from '../components/Card'
import '../css/TablePage.css'
import slug from '../config/slug'

const dataTable = {
    name: 'Bàn Hồng Quân khổ 60*80',
    price: '250.000',
    urlImg: 'https://minhancomputer.com/media/lib/15-01-2021/ban-chu-l.jpg',
    id: '2171899823'
}

const TablePage = () => {
    return (
        <>
            <div className='tablepage'>
                <p className="tablepage-title">Các mẫu bàn</p>
                <div className="tablepage-cards">
                    <div className="tablepage-card-item">
                        <Card data={dataTable} slug={slug.table} />
                    </div>
                    <div className="tablepage-card-item">
                        <Card data={dataTable} slug={slug.table} />
                    </div>
                    <div className="tablepage-card-item">
                        <Card data={dataTable} slug={slug.table} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TablePage
