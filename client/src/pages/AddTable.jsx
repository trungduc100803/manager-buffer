import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import { toast } from 'react-toastify'


import table from '../assets/table.jpg'
import { app } from '../firebase'
import '../css/AddChair.css'
import handleRequestApi from '../api/index'
import { setPendingAddTable, setFailureAddTable, setSuccessAddTable } from '../redux/tableSlice'

export default function AddTable() {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.chair)
  const [formData, setFormData] = useState({})
  const [fileUrl, setFileUrl] = useState([])
  const [file, setFile] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [errForm, setErrForm] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleChangimg = e => {
    const fileElement = e.target.files[0]
    if (fileElement) {
      setFile(fileElement)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(setPendingAddTable())
    const table = await handleRequestApi.addTable(formData)
    if (!table.success) {
      setErrForm(table.message)
      dispatch(setFailureAddTable(table.message))
      return
    }
    dispatch(setSuccessAddTable(table.table))
    toast.success("Thêm sản phẩm thành công")
  }



  const uploadImage = async () => {
    setImageFileUploading(true)
    setImageFileUploadError(null)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //cai tien trinh upload img
        setImageFileUploadProgress(progress)
      },
      error => {
        setImageFileUploadError('Không thể tải lên ảnh quá 2MB')
        setImageFileUploadProgress(null)
        setFile(null)
        setFileUrl(null)
        setImageFileUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(downloadUrl => {
            setFileUrl(downloadUrl)
            setFormData({ ...formData, urlImgTable: downloadUrl })
            setImageFileUploading(false)
          })
      }
    )
  }

  useEffect(() => {
    if (file) {
      uploadImage()
    }
  }, [file])

  return (
    <div className='addchair-container' style={{ backgroundImage: `url(${table})` }}>
      <div className="btn-back">
        <Link className='btn-back-link' to={'/?tab=table'}>
          <HiArrowLeft className='btn-back-link-icon' />
          <span>Quay lại</span>
        </Link>
      </div>
      <div className='addchair'>
        <p className="addchair-title">Điền đủ thông tin để thêm bàn vào kho</p>
        <form action="" onSubmit={e => handleSubmit(e)}>
          <div className="addchair-item">
            <label htmlFor="">Tên bàn</label>
            <input onChange={e => handleChange(e)} type="text" id='name' />
          </div>

          <div className="addchair-item">
            <label htmlFor="">Giá</label>
            <input onChange={e => handleChange(e)} type="text" id='price' />
          </div>

          <div className="addchair-item">
            <label htmlFor="">Ngày nhập</label>
            <input onChange={e => handleChange(e)} type="date" id='dateIn' />
          </div>

          <div className="addchair-item">
            <label htmlFor="">Số lượng lúc nhập</label>
            <input onChange={e => handleChange(e)} type="number" id='number' />
          </div>
          {/* <div className="addchair-item">
            <label htmlFor="">Địa chỉ nhập</label>
            <input onChange={e => handleChange(e)} type="text" id='addressIn' />
          </div> */}
          <div className="addchair-item">
            <label htmlFor="">Tình trạng lúc nhập</label>
            <input onChange={e => handleChange(e)} type="text" id='status' />
          </div>
          <div className="addchair-item">
            <label htmlFor="">Kích thước</label>
            <input onChange={e => handleChange(e)} type="text" id='size' />
          </div>
          <div className="addchair-item">
            <label htmlFor="">Ghi chú(không bắt buộc)</label>
            <input onChange={e => handleChange(e)} type="text" id='note' />
          </div>
          <div className="addchair-item">
            <label htmlFor="">Hình ảnh bàn</label>
            <input onChange={e => handleChangimg(e)} type="file" id='urlImgTable' accept='image/*' />
          </div>

          {
            imageFileUploading &&
            <div>
              <p>{"Loading..." + imageFileUploadProgress.toFixed() + "%"}</p>
              <ReactLoading height={'40px'} width={'20px'} color='black' />
            </div>
          }
          {
            formData.urlImgTable &&
            <div className="showchair">
              <img src={formData.urlImgTable} alt="" />
            </div>
          }
          {
            imageFileUploadError && <p className='err-img'>{imageFileUploadError}</p>
          }

          <button className='btn-addchair' type="submit">{loading ? <ReactLoading height={'20px'} width={'20px'} color='white' /> : 'Thêm sản phẩm'}</button>
        </form>
        {
          errForm && <p className='err-addchair'>{errForm}</p>
        }
      </div>
    </div>
  )
}
