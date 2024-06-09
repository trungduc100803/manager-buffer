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

export default function TableDetail() {
  const { currentUser } = useSelector(state => state.user)
  const location = useLocation()
  const [tableData, setTableData] = useState({})
  const [adminAccount, setAdminAccount] = useState({})
  const [isDisableBtnExport, setIsDisableBtnExport] = useState(true)

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

    const getTable = async (id) => {
      const table = await handleRequestApi.getTableById(id)
      setTableData(table.table)
    }
    if (idFromUrl) {
      getTable(idFromUrl)
      getAdmin()
    }
  }, [])

  const handleTotalprice = event => {
    event.preventDefault()
    setTotalPriceExportChair(formExport.number * tableData.price)
    setIsDisableBtnExport(false)
  }



  const handleExportChair = async (event) => {
    event.preventDefault()

    if (!formExport.number || !formExport.dateOut) {
      toast.warning('Hãy nhập đủ số lượng và ngày xuất kho')
      return
    }

    if (tableData.numberCurrent - formExport.number < 0) {
      toast.warning('Hiện tại loại ghế này chỉ còn ' + tableData.numberCurrent + ' chiếc')
      return
    }



    const dataExport = {
      content: 'Yêu cầu duyệt để xuất bàn trong kho',
      sender: currentUser._id,
      idProduct: tableData._id,
      ...formExport,
      totalPrice: totalPriceExportChair,
      idAdmin: adminAccount._id
    }

    const dataNotiProduct = {
      content: 'Yêu cầu duyệt để xuất bàn trong kho',
      sender: currentUser._id,
      idProduct: tableData._id,
      totalPrice: totalPriceExportChair,
      slug: 'table',
      ...formExport
    }

    //add notify to database
    const notify = await handleRequestApi.addNotifyExportProduct(dataNotiProduct)

    if (!notify.success) {
      toast.error(notify.message)
      return
    }

    //neu admin on se thong bao toi admin
    socket.emit("send-export-table", dataExport)
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
            <img style={{ width: '100%' }} src={tableData.urlImgTable} />
          </div>
          {/* </Zoom> */}
        </div>

        <div className="chaircontent">
          <p className="namechair">{tableData.name}</p>
          <p className="pricechair">{tableData.price}đ</p>

          <div className="chair-infos">
            <div className="chair-info">
              <p className="chair-info-title">Số lượng hiện tại:</p>
              <span>{tableData.numberCurrent}</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Màu sắc:</p>
              <span>{tableData.color}</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Kích thước:</p>
              <span>{tableData.size}</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Ngày nhập về kho:</p>
              <span>{tableData.dateIn}</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Số lượng lúc nhập:</p>
              <span>{tableData.number}</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Địa chỉ nhập hàng:</p>
              <span>{tableData.addressIn}</span>
            </div>
            <div className="chair-info">
              <p className="chair-info-title">Tình trạng bàn:</p>
              <span>{tableData.status}</span>
            </div>
          </div>

          <div className="chair-tool">
            {
              currentUser.isAdmin ?
                <div className="chair-tool-admin">
                  <button onClick={openModal}>Xuất bàn</button>
                  {/* <button onClick={openModalEdit}>Chỉnh sửa thông tin ghế</button>
                  <button onClick={openModalCacu}>Thống kê doanh thu loại ghế này</button> */}
                </div> :
                <div className="chair-tool-user">
                  <button onClick={openModal}>Xuất bàn</button>
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
              <p>Nhập số lượng bàn muốn xuất kho</p>
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
                      <img src={adminAccount.urlImgProfile} alt="" />
                      <span>{adminAccount.username}</span>
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
