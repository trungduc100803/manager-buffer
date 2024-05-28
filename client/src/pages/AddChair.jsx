import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading'
import { toast } from 'react-toastify'


import { app } from '../firebase'
import '../css/AddChair.css'
import handleRequestApi from '../api/index'
import { setFailureAddChair, setPendingAddChair, setSuccessAddChair } from '../redux/chairSlice'

export default function AddChair() {
  const dispatch = useDispatch()
  const { listCurrentChair, loading, err } = useSelector(state => state.chair)
  const [formData, setFormData] = useState({})
  const [file, setFile] = useState(null)
  const [fileUrl, setFileUrl] = useState([])
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)


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
    dispatch(setPendingAddChair())
    const chair = await handleRequestApi.addChair(formData)
    if (!chair.success) {
      dispatch(setFailureAddChair(chair.message))
      return
    }
    dispatch(setSuccessAddChair(chair.chair))
    toast.success("Thêm sản phẩm thành công")
  }


  console.log(listCurrentChair)

  const uploadImage = async () => {
    //su dung storage trong firebase
    //     service firebase.storage {
    //         match / b / { bucket } / o {
    //             match / { allPaths=**} {
    //   allow read;
    //   allow write: if
    //   request.resource.size < 2 * 1024 * 1024 &&
    //                     request.resource.contentType.matches('image/.*')
    // }
    //         }
    //     }
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
            setFormData({ ...formData, urlImg: downloadUrl })
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
    <>
      <div className='addchair'>
        <p className="addchair-title">Điền đủ thông tin để thêm ghế vào kho</p>
        <form action="" onSubmit={e => handleSubmit(e)}>
          <div className="addchair-item">
            <label htmlFor="">Tên ghế</label>
            <input onChange={e => handleChange(e)} type="text" id='name' />
          </div>

          <div className="addchair-item">
            <label htmlFor="">Giá</label>
            <input onChange={e => handleChange(e)} type="text" id='price' />
          </div>

          <div className="addchair-item">
            <label htmlFor="">Màu sắc</label>
            <input onChange={e => handleChange(e)} type="text" id='color' />
          </div>

          <div className="addchair-item">
            <label htmlFor="">Ngày nhập</label>
            <input onChange={e => handleChange(e)} type="date" id='dateIn' />
          </div>

          <div className="addchair-item">
            <label htmlFor="">Số lượng lúc nhập</label>
            <input onChange={e => handleChange(e)} type="number" id='numberAtIn' />
          </div>
          <div className="addchair-item">
            <label htmlFor="">Địa chỉ nhập</label>
            <input onChange={e => handleChange(e)} type="text" id='addressIn' />
          </div>
          <div className="addchair-item">
            <label htmlFor="">Tình trạng lúc nhập</label>
            <input onChange={e => handleChange(e)} type="text" id='status' />
          </div>
          <div className="addchair-item">
            <label htmlFor="">Hình ảnh ghế</label>
            <input onChange={e => handleChangimg(e)} type="file" id='urlImg' accept='image/*' />
          </div>

          <div className="showchair">
            <img src={formData.urlImg} style={{ width: "30px", height: "30px" }} alt="" />
          </div>

          <button type="submit">{loading ? <ReactLoading height={'20px'} width={'20px'} color='white' /> : 'Thêm sản phẩm'}</button>
        </form>
        {
          err && <p>{err}</p>
        }
      </div>
    </>
  )
}