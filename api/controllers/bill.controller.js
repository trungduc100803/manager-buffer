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
    },
    getAllBillToday: async (req, res, next) => {
        try {
            // verify isadmin
            const today = req.query.today

            const bills = await Bill.find({
                date: {
                    $gte: new Date(today),
                }
            })

            if (bills.length > 1) {
                bills.reverse()
            }

            return res.status(200).send({
                success: true,
                message: "OK",
                bills
            })
        } catch (error) {
            next(error)
        }
    },
    getBillOption: async (req, res, next) => {

        try {
            const startDate = req.query.startDate
            const endDate = req.query.endDate

            const bills = await Bill.find({
                date: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            })
            if (bills.length > 1) {
                bills.reverse()
            }

            return res.send({
                bills,
                success: true,
                message: 'ok'
            })

        } catch (error) {
            next(error)
        }
    }
}

export default billController