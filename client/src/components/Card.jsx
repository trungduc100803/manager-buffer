import React from 'react'
import { Link } from 'react-router-dom'


import '../css/Card.css'

const Card = ({ data, slug }) => {
    return (
        <>
            <div className='card'>
                <Link to={`/detail-product?type=${slug}&id=${data._id}&product=${data.name}`}>
                    <div className="card-img" style={{ backgroundImage: `url(${slug === 'chair' ? data.urlImg[0] : data.urlImgTable})` }}></div>
                    <p>{data.name}</p>
                    <span>{data.price}đ</span>
                    <p className='number'>Còn {data.numberCurrent} chiếc/chỗ</p>
                </Link>
            </div>
        </>
    )
}

export default Card
