import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal';
import { toast } from 'react-toastify'

import '../css/Manager.css'
import handleRequestApi from '../api';
import { setAllChair } from '../redux/chairSlice';


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

export default function Manager() {

  const [tab, setTab] = useState(true)

  return (
    <div className='manager'>
      <div className="btns-manager">
        <Link to={'/add-chair'} className='btn-manager add-chair'>Thêm mẫu ghế</Link>
        <Link to={'/add-table'} className='btn-manager add-table'>Thêm mẫu bàn</Link>
      </div>
      <div className="tab-manager">
        <div className={tab ? 'tab-manager-item active' : "tab-manager-item"} onClick={() => setTab(true)}>
          <p>Ghế</p>
        </div>

        <div className={tab ? 'tab-manager-item' : 'tab-manager-item active'} onClick={() => setTab(false)}>
          <p>Bàn</p>
        </div>
      </div>

      <div className="manager-content">
        {
          tab ? <ChairComp /> :
            <TableComp />
        }
      </div>
    </div>
  )
}


const ChairComp = () => {
  const dispatch = useDispatch()
  const { listCurrentChair } = useSelector(state => state.chair)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [idChairToDelete, setIdChairToDelete] = useState('')


  function openModal(id) {
    setIsOpen(true);
    setIdChairToDelete("")
    setIdChairToDelete(id)
  }

  function closeModal() {
    setIsOpen(false);
    setIdChairToDelete('')
  }


  const handleDeleteChair = async () => {
    const chairs = await handleRequestApi.deleteChair(idChairToDelete)
    if (!chairs) {
      toast.warning("Ghế chưa được xóa😢")
      return
    }
    dispatch(setAllChair(chairs.chairs))
    closeModal()
    toast.success("Ghế đã được xoa xoá thành công 👌👌")
  }


  return <>
    <div className="chaircomp">
      {
        listCurrentChair.length > 0 ?
          <div className="chaircomp-content">
            <div className="chaircomp-content-header">
              <div className="chaircomp-content-header-item stt">STT</div>
              <div className="chaircomp-content-header-item name">Tên</div>
              <div className="chaircomp-content-header-item quantity">Số lượng</div>
              <div className="chaircomp-content-header-item color">Màu sắc</div>
              <div className="chaircomp-content-header-item datein">Ngày nhập</div>
              <div className="chaircomp-content-header-item tool">Thao tác</div>
            </div>
            {
              listCurrentChair.map((chair, i) => (
                <div key={i} className="chaircomp-content-body">
                  <div className="chaircomp-content-body-item stt">{i + 1}</div>
                  <Link to={`/detail-product?type=chair&id=${chair._id}&product=${chair.name}`} className="chaircomp-content-body-item name">{chair.name}</Link>
                  <div className="chaircomp-content-body-item quantity">{chair.numberCurrent + '/' + chair.numberAtIn}</div>
                  <div className="chaircomp-content-body-item color">{chair.color}</div>
                  <div className="chaircomp-content-body-item datein">{chair.dateIn}</div>
                  <div className="chaircomp-content-body-item tool">
                    <Link className='edit-chaircomp' to={`/edit-chair?id=${chair._id}&name=${chair.name}`}>Sửa</Link>
                    <span onClick={() => openModal(chair._id)}>Xóa</span>
                  </div>
                </div>
              ))
            }
          </div> :
          <p>Chưa có mẫu ghế nào</p>
      }

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <>
          <div className="modal-signout">
            <p>Bạn chắc chắn muốn xóa ghế này?</p>
            <div className="btns-modal">
              <button onClick={handleDeleteChair} className='btn-modal btn-modal-ok'>Đúng vây</button>
              <button onClick={closeModal} className='btn-modal btn-modal-cancel'>Không</button>
            </div>
          </div>
        </>
      </Modal>
    </div>
  </>
}

const TableComp = () => {
  return <>
    <div className="chaircomp">
      ban comp
    </div>
  </>
}
