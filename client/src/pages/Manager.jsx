import React from 'react'
import { Link } from 'react-router-dom'

import '../css/Manager.css'


export default function Manager() {
  return (
    <div className='manager'>
        <div className="btns-manager">
            <Link to={'/add-chair'} className='btn-manager add-chair'>Thêm mẫu ghế</Link>
            <Link to={'/add-table'} className='btn-manager add-table'>Thêm mẫu bàn</Link>
        </div>
    </div>
  )
}
