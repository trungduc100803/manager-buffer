import React from 'react'

import '../css/CardHomeDash.css'

const CardHomeDash = ({ title, number }) => {
    return (
        <>
            <div className='card-home-dash'>
                <p className="card-home-dash-title">{title}</p>
                <span className="card-home-dash-number">{number}</span>
            </div>
        </>
    )
}

export default CardHomeDash
