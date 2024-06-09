import BillTable from "../models/billTable.model.js";


const billTableController = {
    addBillTable: async (req, res, next) => {
        const { sender, idTable, number, dateOut, totalPrice, nameTable, priceTable, urlImgTable, colorTable, size } = req.body

        try {

            // verify isadmin

            if (!sender || !idTable || !number || !dateOut || !totalPrice || !nameTable || !priceTable || !urlImgTable || !colorTable || !size) {
                return res.status(400).send({
                    success: false,
                    message: "Yêu cầu nhập đủ thông tin"
                })
            }

            const newBill = new BillTable({
                sender, idTable, number, dateOut, totalPrice, nameTable, priceTable, urlImgTable, colorTable, size
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
    getAllBillTableToday: async (req, res, next) => {
        try {
            // verify isadmin
            const today = req.query.today

            const bills = await BillTable.find({
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
    getBillTableOpion: async (req, res, next) => {
        try {
            const startDate = req.query.startDate
            const endDate = req.query.endDate

            const bills = await BillTable.find({
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



export default billTableController