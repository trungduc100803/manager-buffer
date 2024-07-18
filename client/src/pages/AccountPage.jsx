import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HiLocationMarker, HiPhone } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { toast } from 'react-toastify'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'



import '../css/AccountPage.css'
import handleRequestApi from '../api';
import { app } from '../firebase'
import { setAuthFailure, setAuthPending, setAuthSuccess } from '../redux/authSlice';


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

const AccountPage = () => {

    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalEditPassIsOpen, setModalEditPassIsOpen] = useState(false);
    const [modalEdit, setModalEdit] = useState(false)
    const [modalEditPass, setModalEditPass] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordEdit, setPasswordEdit] = useState('')
    const [loading, setLoading] = useState(false)
    const [dataAuth, setDataAuth] = useState(null)
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [dataNewPassword, setDataNewPassword] = useState(null)

    const [file, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState([])
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0)
    const [imageFileUploading, setImageFileUploading] = useState(false)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)



    const handleVisiblePassword = () => {
        setVisiblePassword(!visiblePassword)
    }

    const handleChangeimg = e => {
        const fileElement = e.target.files[0]
        if (fileElement) {
            setFile(fileElement)
        }
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
                        setDataAuth({ ...dataAuth, urlImgProfile: downloadUrl })
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

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModalEditPass() {
        setModalEditPassIsOpen(true);
    }

    function closeModalEditPass() {
        setModalEditPassIsOpen(false);
    }
    function openModalEdit() {
        setModalEdit(true);
    }

    function closeModalEdit() {
        setModalEdit(false);
    }

    function openModalEditPassNew() {
        setModalEditPass(true);
    }

    function closeModalEditPassNew() {
        setModalEditPass(false);
    }

    const handleCloseModalVerify = event => {
        event.preventDefault()
        closeModal()
    }

    const handleCloseModalVerifyEditPass = event => {
        event.preventDefault()
        closeModalEditPass()
    }

    const handleVerifyPassword = async event => {
        event.preventDefault()
        const data = {
            password: password,
            id: currentUser._id
        }
        //fetch to verify password: if true else closeModal and openModalEdit
        setLoading(true)
        const auth = await handleRequestApi.verifyPassword(data)

        if (!auth.success) {
            setLoading(false)
            toast.error(auth.message)
            return
        }


        closeModal()
        openModalEdit()
        const a = await handleRequestApi.getAuthById(currentUser._id)
        if (!a.success) {
            toast.error(a.message)
            return
        }
        setDataAuth(a.auth)
    }

    const handleVerifyPasswordEdit = async event => {
        event.preventDefault()
        const data = {
            password: passwordEdit,
            id: currentUser._id
        }
        //fetch to verify password: if true else closeModal and openModalEdit
        setLoading(true)
        const auth = await handleRequestApi.verifyPassword(data)

        if (!auth.success) {
            setLoading(false)
            toast.error(auth.message)
            return
        }
        closeModalEditPass()
        openModalEditPassNew()
    }

    const handleChange = event => {
        setDataAuth({ ...dataAuth, [event.target.id]: event.target.value })
    }

    const handleChangeAuth = async (e) => {
        e.preventDefault()
        dispatch(setAuthPending())
        const auth = await handleRequestApi.updateAuth(dataAuth)
        if (!auth.success) {
            dispatch(setAuthFailure(auth.message))
            return
        }

        dispatch(setAuthSuccess(auth.auth))
        toast.success(auth.message)
        closeModalEdit()
    }

    const handleCloseModalEdit = (e) => {
        e.preventDefault()
        closeModalEdit()
    }

    const handleChangePassword = async event => {
        event.preventDefault()
        if (dataNewPassword !== null) {
            if (dataNewPassword.newpass === '' || dataNewPassword.repeatnewpass === '') {
                toast.warning('Hẫy điền đầy đủ thông tin')
                return
            }

            if (dataNewPassword.newpass != dataNewPassword.repeatnewpass) {
                toast.warning('Mật khẩu không khớp nhau😢😢')
                return
            }
        }

        const auth = await handleRequestApi.changPassword(dataNewPassword.newpass, currentUser._id)
        if (!auth.success) {
            toast.warning(auth.message)
            return
        }

        dispatch(setAuthSuccess(auth.auth))
        closeModalEditPassNew()
        toast(auth.message)
    }

    const handleChangeDataPassword = event => {
        setDataNewPassword({ ...dataNewPassword, [event.target.id]: event.target.value })
    }



    return (
        <div className='accountpage'>
            <p className='accountpage-title'>Thông tin tài khoản</p>

            <>
                <div className="accountpage-body">
                    <div className="accountpage-avatar">
                        <div style={{ backgroundImage: `url(${currentUser.urlImgProfile})` }}></div>
                    </div>
                    <div className="accountpage-content">
                        <div className="account-name">
                            <p>{currentUser.username}</p>
                            <span>{currentUser.isAdmin ? "Admin" : "Member"}</span>
                        </div>

                        <div className="account-address">
                            <p>Địa chỉ</p>
                            <span>
                                <HiLocationMarker className='account-icon' />
                                Hà Nội
                            </span>
                        </div>

                        <div className="account-address">
                            <p>Số điện thoại</p>
                            <span>
                                <HiPhone className='account-icon' />
                                +84265662010
                            </span>
                        </div>

                        <div className="account-edit">
                            <span onClick={() => openModal()} >Sửa</span>
                            <span onClick={() => openModalEditPass()} >Đổi mật khẩu</span>
                        </div>
                    </div>
                </div>
            </>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <>
                    <form className="verify-user">
                        <p>Mời bạn nhập lại mật khẩu đăng nhập để thay đổi thông tin</p>
                        <div className="verify-user-item">
                            <label htmlFor="">Mật khẩu</label>
                            <input onChange={event => setPassword(event.target.value)} type="password" name="" id="password" />
                        </div>

                        <div className="verify-user-btns">
                            <button onClick={e => handleVerifyPassword(e)} className="verify-user-btn ok">
                                {
                                    loading ? 'loading...' : 'Kiểm tra'
                                }
                            </button>
                            <button onClick={e => handleCloseModalVerify(e)} className="verify-user-btn cancel">Hủy</button>
                        </div>
                    </form>
                </>
            </Modal>

            <Modal
                isOpen={modalEditPassIsOpen}
                onRequestClose={closeModalEditPass}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <>
                    <form className="verify-user">
                        <p>Mời bạn nhập lại mật khẩu đăng nhập hiện tại</p>
                        <div className="verify-user-item">
                            <label htmlFor="">Mật khẩu</label>
                            <input onChange={event => setPasswordEdit(event.target.value)} type="password" name="" id="password" />
                        </div>

                        <div className="verify-user-btns">
                            <button onClick={e => handleVerifyPasswordEdit(e)} className="verify-user-btn ok">
                                {
                                    loading ? 'loading...' : 'Kiểm tra'
                                }
                            </button>
                            <button onClick={e => handleCloseModalVerifyEditPass(e)} className="verify-user-btn cancel">Hủy</button>
                        </div>
                    </form>
                </>
            </Modal>

            <Modal
                isOpen={modalEdit}
                onRequestClose={closeModalEdit}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <>
                    <form className="modal_edit">
                        <p>Chỉnh sửa thông tin cá nhân</p>
                        <div className="modal_edit--item">
                            <label htmlFor="">Tên</label>
                            <input value={dataAuth && dataAuth.username} onChange={e => handleChange(e)} type="text" name="" id="username" />
                        </div>

                        <div className="modal_edit--item">
                            <label htmlFor="">Email</label>
                            <input value={dataAuth && dataAuth.email} onChange={e => handleChange(e)} type="email" name="" id="email" />
                        </div>

                        {/* <div className="modal_edit--item">
                            <label htmlFor="">Mật khẩu</label>
                            <input value={dataAuth && dataAuth.password} onChange={e => handleChange(e)} type={visiblePassword ? 'text' : "password"} name="" id="password" />
                        </div>

                        <div className="show-password">
                            <input onClick={handleVisiblePassword} type="checkbox" name="" id="" />
                            <span>Hiện mật khẩu</span>
                        </div> */}

                        <div className="modal_edit--item avatar">
                            <label htmlFor="">Ảnh đại diện</label>
                            <div className="avatar_img">
                                <img src={dataAuth && dataAuth.urlImgProfile} alt="" accept='image/*' />
                            </div>

                            {
                                imageFileUploading && <p className='progress'>Loading {imageFileUploadProgress.toFixed()}%</p>
                            }
                            <input type="file" name="" id="urlImgProfile" onChange={e => handleChangeimg(e)} />
                        </div>

                        <div className="modal_edit--btns">
                            <button onClick={e => handleChangeAuth(e)} className='modal_edit--btn ok'>Thay đổi</button>
                            <button onClick={e => handleCloseModalEdit(e)} className='modal_edit--btn cancel'>Hủy</button>
                        </div>

                        {
                            imageFileUploadError && <p className='message-error'>{imageFileUploadError}</p>
                        }
                    </form>
                </>
            </Modal>

            <Modal
                isOpen={modalEditPass}
                onRequestClose={closeModalEditPassNew}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form action="" className="modal_edit_pass">
                    <p className="modal_edit_title">Thay đổi mật khẩu</p>
                    <div className="modal_edit_pass_input">
                        <label htmlFor="">Nhập mật khẩu muốn thay đổi</label>
                        <input type="password" name="" id="newpass" onChange={e => handleChangeDataPassword(e)} />
                    </div>
                    <div className="modal_edit_pass_input">
                        <label htmlFor="">Nhập lại mật khẩu mật khẩu</label>
                        <input type="password" name="" id="repeatnewpass" onChange={e => handleChangeDataPassword(e)} />
                    </div>

                    <div className="modal_edit_pass_btns">
                        <button className='modal_edit--btn ok' onClick={e => handleChangePassword(e)}>Thay đổi</button>
                        <button className='modal_edit--btn cancel'>Hủy</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AccountPage
