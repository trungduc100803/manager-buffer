import React from 'react'
import '../css/HomePage.css'
import CardHomeDash from '../components/CardHomeDash'


const HomePage = () => {
    return (
        <div className='home-page'>
            <p>Tổng quan</p>
            <div className="home-dash">
                <div className="home-dash-item">
                    <CardHomeDash title={'Tổng số ghế'} number={547} />
                </div>
                <div className="home-dash-item">
                    <CardHomeDash title={'Tổng số ghế'} number={547} />
                </div>
                <div className="home-dash-item">
                    <CardHomeDash title={'Tổng số ghế'} number={547} />
                </div>
            </div>
        </div>
    )
}

export default HomePage
