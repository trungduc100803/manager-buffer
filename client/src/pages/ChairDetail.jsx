import React, { useEffect, useState } from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Zoom } from 'react-slideshow-image';
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Modal from 'react-modal';


import '../css/ChairDetail.css'
import handleRequestApi from '../api';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    outLine: 'none',
    minWidth: '400px'
  },
};

export default function ChairDetail() {
  const { currentUser } = useSelector(state => state.user)
  const location = useLocation()
  const [chairData, setChairData] = useState({})
  // const [tab, setTab] = useState('')
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formExport, setFormExport] = useState({})
  const [totalPriceExportChair, setTotalPriceExportChair] = useState(0)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChangeExportChair = event => {
    setFormExport({ ...formExport, [event.target.id]: event.target.value })
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const idFromUrl = urlParams.get('id')

    const getChair = async (id) => {
      const chair = await handleRequestApi.getChairById(id)
      setChairData(chair.chair)
    }
    if (idFromUrl) {
      getChair(idFromUrl)
    }
  }, [])

  const handleTotalprice = event => {
    event.preventDefault()
    setTotalPriceExportChair(formExport.number * chairData.price)
  }


  const handleExportChair = async (event) => {
    event.preventDefault()
    setFormExport({ ...formExport, totalPrice: totalPriceExportChair })
  }

  console.log(formExport)
  return (
    <>
      <div className='chairdetail'>
        <p className='chairdetail-title'>Thông tin</p>
        <div className="slider">
          {/* <Zoom scale={0.4} autoplay={true} duration={2500} indicators={true} transitionDuration={1000}> */}
          <div>
            <img style={{ width: '100%' }} src={chairData.urlImg} />
          </div>
          {/* </Zoom> */}
        </div>

        <div className="chaircontent">
          <p className="namechair">{chairData.name}</p>
          <p className="pricechair">{chairData.price}đ</p>

          <div className="chair-infos">
            <div className="chair-info">
              <p className="chair-info-title">Số lượng hiện tại:</p>
              <span>{chairData.numberCurrent}</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Màu sắc:</p>
              <span>{chairData.color}</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Ngày nhập về kho:</p>
              <span>{chairData.dateIn}</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Số lượng lúc nhập:</p>
              <span>{chairData.numberAtIn}</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Địa chỉ nhập hàng:</p>
              <span>{chairData.addressIn}</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Tình trạng ghế:</p>
              <span>{chairData.status}</span>
            </div>
          </div>

          <div className="chair-tool">
            {
              currentUser.isAdmin ?
                <div className="chair-tool-admin">
                  <button onClick={openModal}>Xuất ghế</button>
                  {/* <button onClick={openModalEdit}>Chỉnh sửa thông tin ghế</button>
                  <button onClick={openModalCacu}>Thống kê doanh thu loại ghế này</button> */}
                </div> :
                <div className="chair-tool-user">
                  <button onClick={openModal}>Xuất ghế</button>
                </div>
            }
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <>
            <div className="modal-signout exportchair-model">
              <p>Nhập số lượng ghế muốn xuất kho</p>
              <form onSubmit={e => handleExportChair(e)} action="" className='exportchair-form'>
                <div className="exportchair-item">
                  <label htmlFor="">Số lượng</label>
                  <input onChange={e => handleChangeExportChair(e)} type="number" name="" id="number" />
                </div>
                <div className="exportchair-item">
                  <label htmlFor="">Ngày xuất</label>
                  <input onChange={e => handleChangeExportChair(e)} type="date" name="" id="dateOut" />
                </div>
                <button onClick={e => handleTotalprice(e)} className='btn-modal btn-modal-caculator'>Tính tổng giá trị</button>
                <div className="exportchair-item">
                  <label htmlFor="">Tổng giá trị</label>
                  <input value={totalPriceExportChair + 'đ'} className='exportchair-total' type="text" name="" id="totalPrice" disabled />
                </div>
                <div className="btns-modal exportchair-btn">
                  <button type='submit' className='btn-modal btn-modal-ok'>Gửi yêu cầu xuất kho</button>
                  <button onClick={closeModal} className='btn-modal btn-modal-cancel'>Hủy</button>
                </div>
              </form>
            </div>
          </>
        </Modal>
      </div>
    </>
  )
}
