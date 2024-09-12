import Bill from "../models/billModel.model.js";
import Auth from '../models/authModel.model.js';


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
    },
    getBillOptionAndName: async (req, res, next) => {

        try {
            const nameEmployee = req.query.nameEmployee

            const bills = await Bill.find()


            let billsName = []
            for (let i = 0; i < bills.length; i++) {
                const getSender = async () => {
                    const sender = await Auth.find(bills[i].sender)
                    if (sender.username === nameEmployee) {
                        billsName.push(bills[i])
                    }
                }
                getSender()
            }
            if (billsName.length > 1) {
                billsName.reverse()
            }

            return res.send({
                billsName,
                success: true,
                message: 'ok'
            })

        } catch (error) {
            next(error)
        }
    },
    getWeeklyBill: async (req, res, next) => {
        try {
            const weeklyBills = await Bill.aggregate([
                {
                    $group: {
                        _id: { $week: "$date" }, // Nhóm theo tuần dựa trên ngày tạo (date)
                        bills: { $push: "$$ROOT" }, // Đưa các hóa đơn vào mảng bills
                        totalBills: { $sum: 1 }, // Đếm số lượng hóa đơn trong tuần
                        totalPrice: { $sum: "$totalPrice" } // Tính tổng giá trị hóa đơn trong tuần
                    }
                },
                {
                    $project: {
                        _id: 0,
                        week: "$_id", // Alias cho _id
                        bills: 1 // Bao gồm mảng các hóa đơn
                    }
                }
            ]);

            return res.status(200).send({
                success: true,
                message: 'ok',
                weeklyBills
            })
        } catch (error) {
            next(error)
        }
    },
    getMonthlyBill: async (req, res, next) => {
        try {
            const monthlyBills = await Bill.aggregate([
                {
                    $group: {
                        _id: { $month: "$date" }, // Nhóm theo tuần dựa trên ngày tạo (date)
                        bills: { $push: "$$ROOT" }, // Đưa các hóa đơn vào mảng bills
                        totalBills: { $sum: 1 }, // Đếm số lượng hóa đơn trong tuần
                        totalPrice: { $sum: "$totalPrice" } // Tính tổng giá trị hóa đơn trong tuần
                    }
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id", // Alias cho _id
                        bills: 1 // Bao gồm mảng các hóa đơn
                    }
                }
            ]);

            return res.status(200).send({
                success: true,
                message: 'ok',
                monthlyBills
            })
        } catch (error) {
            next(error)
        }
    }
}

export default billController