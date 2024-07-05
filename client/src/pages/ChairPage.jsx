import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import '../css/ChairPage.css'
import Card from '../components/Card'
import slug from '../config/slug'
import handleRequestApi from '../api'
import { setAllChair } from '../redux/chairSlice'
import noProduct from '../assets/noproductfound.png'

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
                            <div className='img_nochair'>
                                <img src={noProduct} alt="" />
                            </div>
                    }

                </div>
            </div>
        </>
    )
}

export default ChairPage
