import React from 'react'
import { Link } from 'react-router-dom'


import '../css/Card.css'

const Card = ({ data, slug }) => {
    return (
        <>
            <div className='card'>
                <Link to={`/detail-product?type=${slug}&id=${data.id}&product=${data.name}`}>
                    <div className="card-img" style={{ backgroundImage: `url(${data.urlImg})` }}></div>
                    <p>{data.name}</p>
                    <span>{data.price}đ</span>
                </Link>
            </div>
        </>
    )
}

export default Card
