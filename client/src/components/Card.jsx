import React from 'react'
import { Link } from 'react-router-dom'


import '../css/Card.css'

const Card = ({ data }) => {
    return (
        <>
            <div className='card'>
                <Link to={`/detail-product?product=${data.name}`}>
                    <div className="card-img" style={{ backgroundImage: `url(${data.urlImg})` }}></div>
                    <p>{data.name}</p>
                    <span>{data.price}đ</span>
                </Link>
            </div>
        </>
    )
}

export default Card
