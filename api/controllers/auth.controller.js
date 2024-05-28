import Auth from "../models/authModel.model.js";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { handleError } from "../middlewares/handleError.js";

const authController = {
    signUp: async (req, res, next) => {
        const { username, password, email, repeatpassword } = req.body
        try {
            if (!username || !password || !email, !repeatpassword) {
                return res.status(400).send({
                    success: false,
                    message: "Fields is require"
                })
            }

            if (password !== repeatpassword) {
                return res.status(400).send({
                    success: false,
                    message: "Fields is require"
                })
            }
            // const auth = await Auth.findOne(email)
            // if (auth) {
            //     return res.status(400).send({
            //         success: false,
            //         message: "Email or username exists"
            //     })
            // }

            if (password.length < 6 || password.length > 19) {
                return res.status(400).send({
                    success: false,
                    message: "Password need more than 7 and more less 20 characters"
                })
            }

            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!email.toLowerCase().match(regex)) {
                return res.status(400).send({
                    success: false,
                    message: "Email don't format"
                })
            }

            const hashPassword = bcrypt.hashSync(password, 10);

            const newAuth = new Auth({
                password: hashPassword,
                username,
                email
            })
            await newAuth.save()

            return res.status(200).send({
                success: true,
                message: "Create user successfully",
                auth: newAuth
            })


        } catch (error) {
            next(error)
        }

    },
    signIn: async (req, res, next) => {
        const { email, password } = req.body

        try {
            if (!email || !password) {
                return res.status(400).send({
                    success: false,
                    message: "Fields is require"
                })
            }

            const auth = await Auth.findOne({ email })

            if (!auth) return res.status(404).send({
                success: false,
                message: "Not found user"
            })


            const validPassword = await bcrypt.compare(password, auth.password)

            if (!validPassword) return res.status(400).send({
                success: false,
                message: "Password is incorrect"
            })


            const token = JWT.sign({
                username: auth.username,
                email
            }, process.env.SECRET_JWT)

            const { password: pass, ...rest } = auth._doc

            return res
                .status(200)
                .cookie("access_token", token, { httpOnly: true })
                .send({
                    success: true,
                    message: "Sign in successfully",
                    auth: rest
                })

        } catch (error) {
            next(error)
        }
    },
    singOut: async (req, res, next) => {
        try {
            return res
                .status(200)
                .clearCookie('access_token')
                .send({
                    success: true,
                    message: 'User has been logout'
                })
        } catch (error) {
            next(error)
        }
    }
}


export default authController