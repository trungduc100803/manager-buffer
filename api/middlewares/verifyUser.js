import JWT from 'jsonwebtoken'

import { handleError } from './handleError.js'

const verifyUser = async (req, res, next) => {
    const token = req.cookies.access_token
    console.log('Cookies:', req.cookies); 
    console.log(token)

    if(!token) return next(handleError(400, "Bạn chưa đăng nhập!!!"))
    JWT.verify(token, process.env.SECRET_JWT, (err, user) => {
        if(err){
        return next(handleError(403, "Bạn không có quyền để thay đổi thông tin."))
        }
        req.user = user
        next()
    })

}


export default verifyUser