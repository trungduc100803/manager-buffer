import React from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Zoom } from 'react-slideshow-image';

import '../css/ChairDetail.css'

const fadeImages = [
  {
    url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'First Slide'
  },
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    caption: 'Second Slide'
  },
  {
    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Third Slide'
  },
];


export default function ChairDetail() {
  return (
    <>
      <div className='chairdetail'>
        <p>Thông tin</p>
        <div className="slider">
          <Zoom scale={0.4} autoplay={true} duration={2500} indicators={true } transitionDuration={1000}>
            {fadeImages.map((fadeImage, index) => (
              <div key={index}>
                <img style={{ width: '100%' }} src={fadeImage.url} />
              </div>
            ))}
          </Zoom>
        </div>

        <div className="chaircontent">
          <p className="namechair">ghe g60</p>
          <p className="pricechair">450000đ</p>

          <div className="chair-infos">
            <div className="chair-info">
              <p className="chair-info-title">Số lượng hiện tại:</p>
              <span>156</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Màu sắc:</p>
              <span>đỏ</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Ngày nhập về kho:</p>
              <span>13/3/2024</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Số lượng lúc nhập:</p>
              <span>1167</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Địa chỉ nhập hàng:</p>
              <span>Dại học Mỏ</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Tình trạng ghế:</p>
              <span>Rách mông, lưng bẩn</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
