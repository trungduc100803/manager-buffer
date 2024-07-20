import React, { useEffect, useState } from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Zoom } from 'react-slideshow-image';
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Modal from 'react-modal';
import { toast, useToast } from 'react-toastify';

import { socket } from '../socketIO';
import '../css/ChairDetail.css'
import handleRequestApi from '../api';
import { formatNumberWithDots, formatDate, getNumberChairNew } from '../utils/index';


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
  const [adminAccount, setAdminAccount] = useState({})
  const [isDisableBtnExport, setIsDisableBtnExport] = useState(true)


  // const [tab, setTab] = useState('')
  const [formExport, setFormExport] = useState({})
  const [totalPriceExportChair, setTotalPriceExportChair] = useState(0)
  const [modalIsOpen, setIsOpen] = useState(false);

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

    const getAdmin = async () => {
      const admin = await handleRequestApi.getAccountAdmin()
      setAdminAccount(admin.admin)
    }

    const getChair = async (id) => {
      const chair = await handleRequestApi.getChairById(id)
      setChairData(chair.chair)
    }
    if (idFromUrl) {
      getChair(idFromUrl)
      getAdmin()
    }
  }, [])

  const handleTotalprice = event => {
    event.preventDefault()
    setTotalPriceExportChair(formExport.number * chairData.price)
    setIsDisableBtnExport(false)
  }



  const handleExportChair = async (event) => {
    event.preventDefault()
    // setFormExport({ ...formExport, totalPrice: totalPriceExportChair })

    if (!formExport.number || !formExport.dateOut) {
      toast.warning('Hãy nhập đủ số lượng và ngày xuất kho')
      return
    }


    if (chairData.numberCurrent - formExport.number < 0) {

      toast.warning('Hiện tại loại ghế này chỉ còn ' + chairData.numberCurrent + ' chiếc')
      return
    }



    const dataExport = {
      content: 'Yêu cầu duyệt để xuất ghế trong kho',
      sender: currentUser._id,
      idProduct: chairData._id,
      ...formExport,
      totalPrice: totalPriceExportChair,
      idAdmin: adminAccount._id
    }

    const dataNotiProduct = {
      content: 'Yêu cầu duyệt để xuất ghế trong kho',
      sender: currentUser._id,
      idProduct: chairData._id,
      totalPrice: totalPriceExportChair,
      slug: 'chair',
      ...formExport
    }

    //add notify to database
    const notify = await handleRequestApi.addNotifyExportProduct(dataNotiProduct)

    if (!notify.success) {
      toast.error(notify.message)
      return
    }

    //neu admin on se thong bao toi admin
    socket.emit("send-export-chair", dataExport)
    toast.success("Đã gửi yêu cầu xuất kho, hãy chờ Admin duyệt nhé 😊😊")
    setIsDisableBtnExport(true)
    closeModal()
  }


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
          <p className="pricechair">{chairData.price && formatNumberWithDots(chairData.price)}đ</p>

          <div className="chair-infos">
            <div className="chair-info">
              <p className="chair-info-title">Số lượng hiện tại bao gồm cả ghế đẹp và lỗi nếu có:</p>
              <span>{chairData.numberCurrent}</span>
            </div>
            <span>Bao gồm:</span>
            <div className="chair-info-more">
              <div className="chair-info">
                <p className="chair-info-title">Số lượng ghế đẹp:</p>
                <span>{
                  chairData.moreStatus && chairData.moreStatus.length >= 1 ?
                    getNumberChairNew(chairData.moreStatus, chairData.numberCurrent) :
                    chairData.numberCurrent
                }</span>
              </div>
              {
                chairData.moreStatus && chairData.moreStatus[0].numberChairStatus > 0 ?
                  <p>Ghế lỗi</p> :
                  <></>
              }
              {
                chairData.moreStatus && chairData.moreStatus.map((moreChair) => {
                  if (moreChair.numberChairStatus > 0) {
                    return <div className="chair-info-morechair">
                      <div className="chair-info-morechair-num">
                        <p className="chair-info-title">Số lượng: </p>
                        <span>{moreChair.numberChairStatus}</span>
                      </div>
                      <div className="chair-info-morechair-desc">
                        <p className="chair-info-title">Tình trạng lỗi: </p>
                        <span>{moreChair.statusChair}</span>
                      </div>
                    </div>
                  }
                })
              }
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Màu sắc:</p>
              <span>{chairData.color}</span>
            </div>
            {/* <div className="chair-info">
              <p className="chair-info-title">Ngày nhập về kho:</p>
              <span>{chairData.dateIn && formatDate(chairData.dateIn)}</span>
            </div> */}
            <div className="chair-info">
              <p className="chair-info-title">Số lượng lúc nhập:</p>
              <span>{chairData.numberAtIn}</span>
            </div>
            {/* <div className="chair-info">
              <p className="chair-info-title">Địa chỉ nhập hàng:</p>
              <span>{chairData.addressIn}</span>
            </div> */}
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
                {
                  !currentUser.isAdmin &&
                  <div className="exportchair-item">
                    <label htmlFor="">Quản trị viên</label>
                    <div className="admin-content">
                      <img src={adminAccount?.urlImgProfile} alt="" />
                      <span>{adminAccount?.username}</span>
                    </div>
                  </div>
                }
                <div className="btns-modal exportchair-btn">
                  {
                    isDisableBtnExport ?
                      <button type='button' disabled className='btn-modal btn-modal-ok disable'>Gửi yêu cầu xuất kho</button> :
                      <button type='submit' className='btn-modal btn-modal-ok'>Gửi yêu cầu xuất kho</button>
                  }
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
