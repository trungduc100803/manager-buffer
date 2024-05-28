import React, { useEffect, useState } from 'react'
import {useLocation, Link} from 'react-router-dom'
import {HiHome, HiArrowLeft} from 'react-icons/hi'

import slug from '../config/slug'
import ChairDetail from './ChairDetail'
import TableDetail from './TableDetail'
import '../css/DetailProduct.css'

const DetailProduct = () => {

    const location = useLocation()
    const [typeProduct, setTypeProduct] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const typeProductFromUrl = urlParams.get('type')
        if(typeProductFromUrl){
            setTypeProduct(typeProductFromUrl)
        }
    }, [location.search])

    return (
        <div className='detailproduct'>
            <div className="line-link">
                <Link to={'/'} className="line-link-item">
                    <HiHome className='line-link-icon'/>
                    <span>Trang chủ</span>
                </Link>
                <Link to={'#'} className="line-link-item">
                    <HiArrowLeft className='line-link-icon'/>
                    <span>{typeProduct === slug.chair ? "Ghế" : "Bàn"}</span>
                </Link>
            </div>
            {
                typeProduct === slug.chair && <ChairDetail/>
            }
            {
                typeProduct === slug.table && <TableDetail/>
            }
        </div>
    )
}


export default DetailProduct
