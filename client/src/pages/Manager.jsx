import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal';
import { toast } from 'react-toastify'

import '../css/Manager.css'
import handleRequestApi from '../api';
import { setAllTable } from '../redux/tableSlice';
import { setAllChair } from '../redux/chairSlice';
import { formatDate } from '../utils/index'


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
  const [showOption, setShowOption] = useState(false)
  const [indexShow, setIndexShow] = useState(null)
  const optionRef = useRef(null);

  useEffect(() => {
    const getAllChair = async () => {
      const chairs = await handleRequestApi.getAllChair()
      if (!chairs.success) {
        return
      }
      dispatch(setAllChair(chairs.chairs))
    }
    getAllChair()
  }, [])

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

  const handleShow = (index) => {
    setShowOption(true)
    setIndexShow(index)
  }

  const handleClickOutside = (event) => {
    if (optionRef.current && !optionRef.current.contains(event.target)) {
      setShowOption(false);
    }
  };

  useEffect(() => {
    if (showOption) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showOption]);


  return <>
    <div className="chaircomp">
      {
        listCurrentChair.length > 0 ?
          <div className="chaircomp-content">
            <div className="chaircomp-content-header">
              <div className="chaircomp-content-header-item stt">STT</div>
              <div className="chaircomp-content-header-item name">Tên</div>
              <div className="chaircomp-content-header-item quantity">Tổng số lượng</div>
              <div className="chaircomp-content-header-item quantity-left">Số lượng còn lại</div>
              <div className="chaircomp-content-header-item quantity-sold">Số lượng ghế đã bán</div>
              <div className="chaircomp-content-header-item color">Màu sắc</div>
              <div className="chaircomp-content-header-item datein">Ngày nhập</div>
              <div className="chaircomp-content-header-item tool">Thao tác</div>
            </div>
            {
              listCurrentChair.map((chair, i) => (
                <div key={i} className="chaircomp-content-body">
                  <div className="chaircomp-content-body-item stt">{i + 1}</div>
                  <Link to={`/detail-product?type=chair&id=${chair._id}&product=${chair.name}`} className="chaircomp-content-body-item name">{chair.name}</Link>
                  <div className="chaircomp-content-body-item quantity">{chair.numberAtIn}</div>
                  <div className="chaircomp-content-body-item quantity-left">{chair.numberCurrent}</div>
                  <div className="chaircomp-content-body-item quantity-sold">{chair.numberCurrent + '/' + chair.numberAtIn}</div>
                  <div className="chaircomp-content-body-item color">{chair.color}</div>
                  <div className="chaircomp-content-body-item datein">{chair.dateIn && formatDate(chair.dateIn)}</div>
                  <div className="chaircomp-content-body-item tool">
                    {/* <Link className='edit-chaircomp' to={`/edit-chair?id=${chair._id}&name=${chair.name}`}>Sửa</Link> */}
                    <span onClick={() => openModal(chair._id)}>Xóa</span>
                    <div className='optionChair' ref={optionRef}>
                      <p onClick={() => handleShow(i)}>Chức năng</p>
                      <div className={showOption === true && i === indexShow ? 'optionChair-body active' : 'optionChair-body'}>
                        <Link className='optionChair-item' to={'/'}>Sửa tên ghế</Link>
                        <Link className='optionChair-item' to={'/'}>Thêm số lượng ghế</Link>
                        <Link className='optionChair-item' to={'/'}>Sửa các ghế đang lỗi</Link>
                        <Link className='optionChair-item' to={'/'}>Sửa nơi nhập ghế về</Link>
                      </div>
                    </div>
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

  const dispatch = useDispatch()
  const { listCurrentTable } = useSelector(state => state.table)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [idTableToDelete, setIdTableToDelete] = useState('')


  function openModal(id) {
    setIsOpen(true);
    setIdTableToDelete("")
    setIdTableToDelete(id)
  }

  function closeModal() {
    setIsOpen(false);
    setIdTableToDelete('')
  }


  const handleDeleteTable = async () => {
    const tables = await handleRequestApi.deleteTable(idTableToDelete)
    if (!tables) {
      toast.warning("Bàn chưa được xóa😢")
      return
    }
    dispatch(setAllTable(tables.tables))
    closeModal()
    toast.success("Bàn đã được xoa xoá thành công 👌👌")
  }
  return <>
    <div className="chaircomp">
      {
        listCurrentTable.length > 0 ?
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
              listCurrentTable.map((table, i) => (
                <div key={i} className="chaircomp-content-body">
                  <div className="chaircomp-content-body-item stt">{i + 1}</div>
                  <Link to={`/detail-product?type=table&id=${table._id}&product=${table.name}`} className="chaircomp-content-body-item name">{table.name}</Link>
                  <div className="chaircomp-content-body-item quantity">{table.numberCurrent + '/' + table.number}</div>
                  <div className="chaircomp-content-body-item color">{table.color}</div>
                  <div className="chaircomp-content-body-item datein">{table.dateIn}</div>
                  <div className="chaircomp-content-body-item tool">
                    <Link className='edit-chaircomp' to={`/edit-table?id=${table._id}&name=${table.name}`}>Sửa</Link>
                    <span onClick={() => openModal(table._id)}>Xóa</span>
                  </div>
                </div>
              ))
            }
          </div> :
          <p>Chưa có mẫu bàn nào</p>
      }

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <>
          <div className="modal-signout">
            <p>Bạn chắc chắn muốn xóa bàn này?</p>
            <div className="btns-modal">
              <button onClick={handleDeleteTable} className='btn-modal btn-modal-ok'>Đúng vây</button>
              <button onClick={closeModal} className='btn-modal btn-modal-cancel'>Không</button>
            </div>
          </div>
        </>
      </Modal>
    </div>
  </>
}
