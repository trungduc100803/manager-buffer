import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import '../css/ChairPage.css'
import Card from '../components/Card'
import slug from '../config/slug'
import handleRequestApi from '../api'
import { setAllChair } from '../redux/chairSlice'

const datachair = {
    id: '83289328',
    name: 'ghes G60',
    price: '500.000',
    urlImg: 'data:image/jpeg;base64,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'
}

const ChairPage = () => {
    const dispatch = useDispatch()
    const { listCurrentChair } = useSelector(state => state.chair)

    useEffect(() => {
        const getAllChair = async () => {
            const chairs = await handleRequestApi.getAllChair()
            if (!chairs.success) {
                return
            }
            dispatch(setAllChair(chairs.chairs))
        }
        getAllChair()
    }, [])
    return (
        <>
            <div className='chairpage'>
                <p className="chairpage-title">Các mẫu ghế</p>
                <div className="chairpage-cards">
                    {
                        listCurrentChair.length > 0 ?
                            listCurrentChair.map((chair, i) => (
                                <div className="chairpage-card-item">
                                    <Card key={i} data={chair} slug={slug.chair} />
                                </div>
                            )) :
                            <p>Chưa có ghế nào được thêm</p>
                    }
                    {/* <div className="chairpage-card-item">
                        <Card data={datachair} slug={slug.chair} />
                    </div>
                    <div className="chairpage-card-item">
                        <Card data={datachair} slug={slug.chair} />
                    </div>
                    <div className="chairpage-card-item">
                        <Card data={datachair} slug={slug.chair} />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default ChairPage
