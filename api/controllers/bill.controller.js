import Bill from "../models/billModel.model.js";


const billController = {
    addBill: async (req, res, next) => {
        const { sender, idChair, number, dateOut, totalPrice, nameChair, priceChair, urlImgChair, colorChair } = req.body

        try {

            // verify isadmin

            if (!sender || !idChair || !number || !dateOut || !totalPrice || !nameChair || !priceChair || !urlImgChair || !colorChair) {
                return res.status(400).send({
                    success: false,
                    message: "Yêu cầu nhập đủ thông tin"
                })
            }

            const newBill = new Bill({
                sender, idChair, number, dateOut, totalPrice, nameChair, priceChair, urlImgChair, colorChair
            })
            await newBill.save()

            return res.status(200).send({
                success: true,
                message: "Thêm hóa đơn thành công",
                bill: newBill
            })
        } catch (error) {
            next(error)
        }
    }
}

export default billController