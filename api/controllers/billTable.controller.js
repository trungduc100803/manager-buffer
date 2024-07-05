import BillTable from "../models/billTable.model.js";


const billTableController = {
    addBillTable: async (req, res, next) => {
        const { sender, idTable, number, dateOut, totalPrice, nameTable, priceTable, urlImgTable, size } = req.body

        try {

            // verify isadmin

            if (!sender || !idTable || !number || !dateOut || !totalPrice || !nameTable || !priceTable || !urlImgTable || !size) {
                return res.status(400).send({
                    success: false,
                    message: "Yêu cầu nhập đủ thông tin"
                })
            }

            const newBill = new BillTable({
                sender, idTable, number, dateOut, totalPrice, nameTable, priceTable, urlImgTable, size
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
    },
    getWeeklyBill: async (req, res, next) => {
        try {
            // const weeklyBills = await BillTable.aggregate([
            //     {
            //         $group: {
            //             _id: { $week: "$date" }, // Nhóm theo tuần dựa trên ngày tạo (date)
            //             bills: { $push: "$$ROOT" }, // Đưa các hóa đơn vào mảng bills
            //             totalBills: { $sum: 1 }, // Đếm số lượng hóa đơn trong tuần
            //             totalPrice: { $sum: "$totalPrice" } // Tính tổng giá trị hóa đơn trong tuần
            //         }
            //     },
            //     {
            //         $project: {
            //             _id: 0,
            //             week: "$_id", // Alias cho _id
            //             bills: 1 // Bao gồm mảng các hóa đơn
            //         }
            //     }
            // ]);

            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            const weeklyBills = await BillTable.find({
                date: { $gte: oneWeekAgo }
            });

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
            const monthlyBills = await BillTable.aggregate([
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



export default billTableController