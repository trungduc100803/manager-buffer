import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiPlus } from 'react-icons/hi'
import { toast } from 'react-toastify'


import banner1 from '../assets/banner1.jpg'
import { app } from '../firebase'
import '../css/AddChair.css'
import handleRequestApi from '../api/index'
import { setFailureAddChair, setPendingAddChair, setSuccessAddChair } from '../redux/chairSlice'

export default function AddChair() {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.chair)
  const [showMoreChair, setShowMoreChair] = useState(false)
  const [numberChairMore, setNumberChaiMore] = useState([])
  const [formData, setFormData] = useState({})
  const [moreStatus, setMoreStatus] = useState([{ numberChairStatus: 0, statusChair: '' }])
  const [fileUrl, setFileUrl] = useState([])
  const [file, setFile] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [errForm, setErrForm] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
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

  const handleChangimg = e => {
    const fileElement = e.target.files[0]
    if (fileElement) {
      setFile(fileElement)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const finalData = {
      ...formData,
      moreStatus: [...moreStatus]
    }

    console.log(finalData)
    dispatch(setPendingAddChair())
    const chair = await handleRequestApi.addChair(finalData)
    if (!chair.success) {
      setErrForm(chair.message)
      dispatch(setFailureAddChair(chair.message))
      return
    }
    dispatch(setSuccessAddChair(chair.chair))
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

  const handleAddMorechair = () => {
    setNumberChaiMore([...numberChairMore, 1])
    setShowMoreChair(true)
  }

  const handleCloseChairMore = () => {
    setNumberChaiMore([])
    setShowMoreChair(false)
  }

  const removeChairMore = () => {
    if (numberChairMore.length === 1) {
      setShowMoreChair(false)
      setNumberChaiMore([])

      //khi remove 1 truong de nhap cac loai ghe loi thi se xoa trong state morechair
      setMoreStatus(prevArr => {
        const newArr = [...prevArr];
        newArr.pop();
        return newArr;
      }
      )
    } else {
      setNumberChaiMore(prevArr => {
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

  return (
    <div className='addchair-container' style={{ backgroundImage: `url(${banner1})` }}>
      <div className="btn-back">
        <Link className='btn-back-link' to={'/?tab=chair'}>
          <HiArrowLeft className='btn-back-link-icon' />
          <span>Quay lại</span>
        </Link>
      </div>
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

          {/* <div className="addchair-item">
            <label htmlFor="">Ngày nhập</label>
            <input onChange={e => handleChange(e)} type="date" id='dateIn' />
          </div> */}

          <div className="addchair-item">
            <label htmlFor="">Số lượng lúc nhập</label>
            <input onChange={e => handleChange(e)} type="number" id='numberAtIn' />
          </div>

          <div className="show-more-statuschair" onClick={handleAddMorechair}>
            <HiPlus className='statuschair-icon' />
            <span>Thêm chi tiết về tình trạng của ghế nếu có ghế lỗi</span>
          </div>

          {
            numberChairMore.length > 0 ? numberChairMore.map((c, i) => (
              <div className={showMoreChair == false ? 'addchair-more' : 'addchair-more active'}>
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

          <div className="morechair_btns">

            <button className={showMoreChair === true ? 'btn-close-morechair active' : 'btn-close-morechair'} onClick={handleCloseChairMore}>Xóa tất</button>
            <button className={showMoreChair === true ? 'btn-close-morechair active' : 'btn-close-morechair'} onClick={removeChairMore}>Xóa 1 hàng</button>
          </div>

          {/* <div className="addchair-item">
            <label htmlFor="">Địa chỉ nhập</label>
            <input onChange={e => handleChange(e)} type="text" id='addressIn' />
          </div> */}
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
            formData.urlImg &&
            <div className="showchair">
              <img src={formData.urlImg} alt="" />
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
