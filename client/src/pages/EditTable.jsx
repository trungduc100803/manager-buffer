import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'


import { app } from '../firebase'
import '../css/AddChair.css'
import handleRequestApi from '../api/index'
import { setAllTable, setFailureAddTable, setPendingAddTable } from '../redux/tableSlice'



export default function EditTable() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.chair)
  const [formData, setFormData] = useState({})
  const [file, setFile] = useState(null)
  const [fileUrl, setFileUrl] = useState([])
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
    const urlParams = new URLSearchParams(location.search)
    const idFromUrl = urlParams.get('id')

    dispatch(setPendingAddTable())
    const tables = await handleRequestApi.updateTable(formData, idFromUrl)
    if (!tables.success) {
      setErrForm(tables.message)
      dispatch(setFailureAddTable(tables.message))
      return
    }
    dispatch(setAllTable(tables.tables))
    toast.success("Cập nhật sản phẩm thành công")
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
        setImageFileUploadError('Cound not upload image ( File must be less than 2MB )')
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

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const idFromUrl = urlParams.get('id')
    const getTable = async (id) => {
      const table = await handleRequestApi.getTableById(id)
      if (!table.success) {
        setErrForm('Không tìm thấy bàn')
        return
      }
      setFormData(table.table)
    }

    if (idFromUrl) {
      getTable(idFromUrl)
    }
  }, [])

  return (
    <>
      <div className='addchair'>
        <p className="addchair-title">Chỉnh sửa thông tin của bàn</p>
        <form action="" onSubmit={e => handleSubmit(e)}>
          <div className="addchair-item">
            <label htmlFor="">Tên bàn</label>
            <input value={formData.name} onChange={e => handleChange(e)} type="text" id='name' />
          </div>

          <div className="addchair-item">
            <label htmlFor="">Giá</label>
            <input value={formData.price} onChange={e => handleChange(e)} type="text" id='price' />
          </div>

          <div className="addchair-item">
            <label htmlFor="">Màu sắc</label>
            <input value={formData.color} onChange={e => handleChange(e)} type="text" id='color' />
          </div>

          <div className="addchair-item">
            <label htmlFor="">Kích thước</label>
            <input value={formData.size} onChange={e => handleChange(e)} type="text" id='size' />
          </div>

          <div className="addchair-item">
            <label htmlFor="">Ngày nhập</label>
            <input value={formData.dateIn} onChange={e => handleChange(e)} type="date" id='dateIn' />
          </div>

          <div className="addchair-item">
            <label htmlFor="">Số lượng lúc nhập</label>
            <input value={formData.number} onChange={e => handleChange(e)} type="number" id='numberAtIn' />
          </div>
          <div className="addchair-item">
            <label htmlFor="">Địa chỉ nhập</label>
            <input onChange={e => handleChange(e)} type="text" id='addressIn' value={formData.addressIn} />
          </div>
          <div className="addchair-item">
            <label htmlFor="">Tình trạng lúc nhập</label>
            <input onChange={e => handleChange(e)} type="text" id='status' value={formData.status} />
          </div>
          <div className="addchair-item">
            <label htmlFor="">Ghi chú</label>
            <input value={formData.note} onChange={e => handleChange(e)} type="text" id='note' />
          </div>
          <div className="addchair-item">
            <label htmlFor="">Hình ảnh ghế</label>
            <input onChange={e => handleChangimg(e)} type="file" id='urlImg' accept='image/*' />
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

          <button className='btn-addchair' type="submit">{loading ? <ReactLoading height={'20px'} width={'20px'} color='white' /> : 'Cập nhật thông tin'}</button>
        </form>
        {
          errForm && <p className='err-addchair'>{errForm}</p>
        }
      </div>
    </>
  )
}
