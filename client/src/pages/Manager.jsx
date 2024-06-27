import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal';
import { toast } from 'react-toastify'
import { HiPlus } from 'react-icons/hi'

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
  const [modalEditNumberChair, setModalEditNumberChair] = useState(false);
  const [modalEditNameChairIsOpen, setModalEditNameChairIsOpen] = useState(false);
  const [modalEditChairErr, setModalEditChairErr] = useState(false);
  const [idChairToDelete, setIdChairToDelete] = useState('')
  const [showOption, setShowOption] = useState(false)
  const [indexShow, setIndexShow] = useState(null)
  const optionRef = useRef([]);
  const [idChair, setIdChair] = useState(null)
  const [chairData, setChairData] = useState(null)
  const [nameChair, setNameChair] = useState(null)
  const [numberAddChair, setNumberAddChair] = useState([])
  const [showAddNumberChair, setShowAddNumberChair] = useState(false)
  const [moreStatus, setMoreStatus] = useState([{ numberChairStatus: 0, statusChair: '' }])
  const [numberChairErr, setNumberChairErr] = useState([])
  const [numberAtIn, setnumberAtIn] = useState(null)

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

  useEffect(() => {
    const getChairById = async (id) => {
      const res = await handleRequestApi.getChairById(id)
      if (!res.success) {
        // toast.error("no find chair")
        return
      }
      setChairData(res.chair)
    }

    getChairById(idChair)
  }, [idChair])

  function openModal(id) {
    setIsOpen(true);
    setIdChairToDelete("")
    setIdChairToDelete(id)
  }

  function closeModal() {
    setIsOpen(false);
    setIdChairToDelete('')
  }

  function openModalEditNameChair() {
    setModalEditNameChairIsOpen(true)
  }

  function closeModalEditNameChair() {
    setModalEditNameChairIsOpen(false)
  }

  function openModalEditNumberChair() {
    setModalEditNumberChair(true)
  }

  function closeModalEditNumberChair() {
    setModalEditNumberChair(false)
  }
  function openModalEditChairErr() {
    setModalEditChairErr(true)
  }

  function closeModalEditChairErr() {
    setModalEditChairErr(false)
    setNumberChairErr([])
  }


  const handleDeleteChair = async () => {
    const chairs = await handleRequestApi.deleteChair(idChairToDelete)
    if (!chairs) {
      toast.warning("Ghế chưa được xóa😢")
      return
    }
    dispatch(setAllChair(chairs.chairs))
    toast.success("Ghế đã được xoa xoá thành công 👌👌")
    closeModal()
  }

  const handleShow = (index, event, id) => {
    event.stopPropagation();
    setIdChair(id)
    setShowOption(true)
    setIndexShow(index)
  }

  const handleClickOutside = (event) => {
    for (let i = 0; i < optionRef.current.length; i++) {
      if (optionRef.current[i] && !optionRef.current[i].contains(event.target)) {
        setShowOption(false); // Hide the options if clicked outside
        setIndexShow(null); // Reset index of shown option
      }
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks on the entire document
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);



  const handleEditNameChair = async () => {
    console.log(nameChair)
    console.log(idChair)
    if (nameChair === null || nameChair === '') {
      toast.warning('Hãy nhập tên mới của ghế để sửa')
      return
    }
    const chairs = await handleRequestApi.editNameChairById(idChair, nameChair)
    if (!chairs.success) {
      return
    }
    dispatch(setAllChair(chairs.chairs))
    closeModalEditNameChair()
    toast.success(chairs.message)
  }

  const handleAddNumberChair = async () => {
    let formData = null
    if (moreStatus.length > 0 && moreStatus[0].numberChairStatus > 0 && moreStatus[0].statusChair !== '') {
      formData = {
        numberAtIn,
        moreStatus
      }
    } else {
      formData = {
        numberAtIn
      }
    }


    const chairs = await handleRequestApi.addNumberChairById(idChair, formData)
    if (!chairs.success) {
      return
    }
    dispatch(setAllChair(chairs.chairs))
    closeModalEditNumberChair()
    toast.success(chairs.message)
  }

  const addnumberChair = () => {
    setNumberAddChair([...numberAddChair, 1])
    setShowAddNumberChair(true)
  }

  const handleCloseChairMore = () => {
    setNumberAddChair([])
    setShowAddNumberChair(false)
  }

  const removeChairMore = () => {
    if (numberAddChair.length === 1) {
      setShowAddNumberChair(false)
      setNumberAddChair([])

      //khi remove 1 truong de nhap cac loai ghe loi thi se xoa trong state morechair
      setMoreStatus(prevArr => {
        const newArr = [...prevArr];
        newArr.pop();
        return newArr;
      }
      )
    } else {
      setNumberAddChair(prevArr => {
        const newArr = [...prevArr];
        newArr.pop();
        return newArr;
      }
      )
      //khi remove 1 truong de nhap cac loai ghe loi thi se xoa trong state morechair
      setMoreStatus(prevArr => {
        const newArr = [...prevArr];
        newArr.pop();
        return newArr;
      }
      )
    }
  }

  const handleChangemoreChair = (e, index) => {
    const { id, value } = e.target;
    const newMoreStatus = [...moreStatus];
    newMoreStatus[index] = {
      ...newMoreStatus[index],
      [id]: value
    };
    setMoreStatus(newMoreStatus)
  }


  const handleChangNumberChair = (event, i, currentNumberChair, currentStatusChair) => {
    const { id, value } = event.target;
    const newChairErr = [...numberChairErr]
    newChairErr[i] = {
      ...newChairErr[i],
      [id]: value,
      currentNumberChair,
      currentStatusChair
    }
    setNumberChairErr(newChairErr)
  }

  const handleEditChairErr = async () => {
    console.log(numberChairErr)
    if (numberChairErr.length <= 0) {
      toast.warning("Bạn cần nhập số lượng ghế muốn loại bỏ")
      return
    }
    for (let i = 0; i < numberChairErr.length; i++) {
      if (Number.parseInt(numberChairErr[i].currentNumberChair) < Number.parseInt(numberChairErr[i].numberwantedit)) {
        toast.warning('Không nhập số lượng sửa nhiều hơn số lượng ghế lỗi')
        return
      }
    }

    const chair = await handleRequestApi.removeNumberChairErr(idChair, numberChairErr)

    console.log(chair)
  }




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
              <div className="chaircomp-content-header-item img">Hình ảnh</div>
              <div className="chaircomp-content-header-item tool">Thao tác</div>
            </div>
            {
              listCurrentChair.map((chair, i) => (
                <div key={i} className="chaircomp-content-body">
                  <div className="chaircomp-content-body-item stt">{i + 1}</div>
                  <Link to={`/detail-product?type=chair&id=${chair._id}&product=${chair.name}`} className="chaircomp-content-body-item name">{chair.name}</Link>
                  <div className="chaircomp-content-body-item quantity">{chair.numberAtIn}</div>
                  <div className="chaircomp-content-body-item quantity-left">{chair.numberCurrent}</div>
                  <div className="chaircomp-content-body-item quantity-sold">{Number.parseInt(chair.numberAtIn) - Number.parseInt(chair.numberCurrent)}</div>
                  <div className="chaircomp-content-body-item color">{chair.color}</div>
                  <div className="chaircomp-content-body-item img">
                    <img src={chair.dateIn && chair.urlImg} alt="" />
                  </div>
                  <div className="chaircomp-content-body-item tool">
                    {/* <Link className='edit-chaircomp' to={`/edit-chair?id=${chair._id}&name=${chair.name}`}>Sửa</Link> */}
                    <span onClick={() => openModal(chair._id)}>Xóa</span>
                    <div className='optionChair' ref={(element) => optionRef.current[i] = element}>
                      <p onClick={(e) => handleShow(i, e, chair._id)}>Chức năng</p>
                      <div className={showOption === true && i === indexShow ? 'optionChair-body active' : 'optionChair-body'}>
                        <p>{chairData && chairData.name}</p>
                        <span className='optionChair-item' onClick={openModalEditNameChair}>Sửa tên ghế</span>
                        <span className='optionChair-item' onClick={openModalEditNumberChair}>Thêm số lượng ghế</span>
                        <span className='optionChair-item' onClick={openModalEditChairErr}>Loại bỏ số lượng ghế đang lỗi</span>
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

      <Modal
        isOpen={modalEditNumberChair}
        onRequestClose={closeModalEditNumberChair}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <>
          <div className="modal-addNumberChair">
            <p>Thêm số lượng ghế</p>
            <div className="addNumberChair">
              <div className="addNumberChair-item">
                <label htmlFor="">Số lượng ghế muốn thêm</label>
                <input type="number" name="" id="numberAtIn" onChange={e => setnumberAtIn(e.target.value)} />
              </div>

              <div className="handleAddNumberChair-add" onClick={addnumberChair}>
                <HiPlus />
                <span >Thêm các ghế lỗi</span>
              </div>

              {
                numberAddChair.length > 0 ? numberAddChair.map((c, i) => (
                  <div className={showAddNumberChair == false ? 'addchair-more' : 'addchair-more active'}>
                    <div className="addchair-more-item">
                      <label htmlFor="">Số lượng</label>
                      <input type="number" onChange={e => handleChangemoreChair(e, i)} name="" id="numberChairStatus" />
                    </div>
                    <div className="addchair-more-item">
                      <label htmlFor="">Tình trạng</label>
                      <input type="text" onChange={e => handleChangemoreChair(e, i)} name="" id="statusChair" />
                    </div>
                  </div>
                )) : <></>
              }

              <button className={showAddNumberChair === true ? 'btn-close-morechair active' : 'btn-close-morechair'} onClick={handleCloseChairMore}>Đóng</button>
              <button className={showAddNumberChair === true ? 'btn-close-morechair active' : 'btn-close-morechair'} onClick={removeChairMore}>Xóa</button>
            </div>


            <div className="btns-modal">
              <button onClick={handleAddNumberChair} className='btn-modal btn-modal-ok'>Thêm</button>
              <button onClick={closeModalEditNumberChair} className='btn-modal btn-modal-cancel'>Đóng</button>
            </div>
          </div>
        </>
      </Modal>

      <Modal
        isOpen={modalEditNameChairIsOpen}
        onRequestClose={closeModalEditNameChair}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <>
          <div className="modal-editnameChair">
            <p>Sửa tên ghế</p>
            <div className="editnameChair">
              <div className="editnameChair-item">
                <label htmlFor="">Tên ghế hiện tại</label>
                <input type="text" name="" value={chairData && chairData.name} className='nameChaircurrent' disabled id="" />
              </div>

              <div className="editnameChair-item">
                <label htmlFor="">Tên mới của ghế</label>
                <input type="text" name="" onChange={e => setNameChair(e.target.value)} className='newnameChair' id="" />
              </div>
            </div>

            <div className="btns-modal">
              <button onClick={handleEditNameChair} className='btn-modal btn-modal-ok'>Sửa </button>
              <button onClick={closeModalEditNameChair} className='btn-modal btn-modal-cancel'>Thoát</button>
            </div>
          </div>
        </>
      </Modal>
      <Modal
        isOpen={modalEditChairErr}
        onRequestClose={closeModalEditChairErr}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <>
          <div className="modal-errchair">
            <p>Danh sách các ghế đang lỗi</p>

            {
              chairData && chairData.moreStatus.map((chair, i) => {
                return <div className="errchair-item">
                  <div className="errchair-left">
                    <label htmlFor="">Số lượng</label>
                    <input type="number" name="" id="numberChairStatus" disabled value={chair.numberChairStatus} />
                  </div>
                  <div className="errchair-left">
                    <label htmlFor="">Tình trạng lỗi</label>
                    <input type="text" name="" id="statusChair" disabled value={chair.statusChair} />
                  </div>
                  <div className="errchair-left">
                    <label htmlFor="">Số lượng muốn loại bỏ</label>
                    <input type="text" name="" id="numberwantedit" onChange={e => handleChangNumberChair(e, i, chair.numberChairStatus, chair.statusChair)} />
                  </div>
                </div>
              })
            }

            <div className="btns-modal">
              <button onClick={handleEditChairErr} className='btn-modal btn-modal-ok'>Sửa </button>
              <button onClick={closeModalEditChairErr} className='btn-modal btn-modal-cancel'>Thoát</button>
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
