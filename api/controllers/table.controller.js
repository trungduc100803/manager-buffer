import Table from '../models/tableModel.model.js'

const tableController = {
    addTable: async (req, res, next) => {
        const { name, number, size, color, dateIn, addressIn, status, urlImgTable, price } = req.body
        try {
            if (!name || !number || !size || !color || !dateIn || !addressIn || !status || !urlImgTable || !price) {
                return res.status(400).send({
                    success: false,
                    message: "Yêu cầu nhập đầy đủ các thông tin"
                })
            }

            const newTable = new Table({
                ...req.body,
                numberCurrent: number
            })

            const table = await newTable.save()

            return res.status(200).send({
                message: "Bàn đã được thêm thành công ❤❤",
                success: true,
                table
            })
        } catch (error) {
            next(error)
        }
    },
    getAllTable: async (req, res, next) => {
        try {
            //verify isadmin
            const allTable = await Table.find()
            if (!allTable) return res.status(400).send({
                success: false,
                message: 'get failure'
            })

            return res.status(200).send({
                success: true,
                message: "Lấy tất cả bàn thành công",
                tables: allTable
            })

        } catch (error) {
            next(error)
        }
    },
    getTableById: async (req, res, next) => {
        const id = req.params.id
        try {
            if (!id) return res.status(400).send({
                success: false,
                message: 'khong tim thay id cua ban'
            })

            const table = await Table.findOne({ _id: id })
            if (!table) return res.status(400).send({
                success: false,
                message: "khong tim thay ban"
            })

            return res.status(200).send({
                success: true,
                message: "tim thanh cong",
                table
            })
        } catch (error) {
            next(error)
        }
    },
    exportTable: async (req, res, next) => {
        const { number, id } = req.body
        try {

            const tableCurrent = await Table.findById(id)

            if (!tableCurrent) return res.status(400).send({
                success: false,
                message: 'table not found'
            })


            const newTable = await Table.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        numberCurrent: tableCurrent.numberCurrent - number
                    }
                },
                { new: true }
            )

            return res.status(200).send({
                success: true,
                message: 'export table successfully',
                idTable: newTable._id,
                numberCurrent: newTable.numberCurrent
            })
        } catch (error) {
            next(error)
        }
    },
    deleteTable: async (req, res, next) => {
        const { idTable } = req.body
        try {
            // verify, isadmin
            if (!idTable) return res.status(400).send({
                success: false,
                message: "ko co id ban"
            })



            await Table.findByIdAndDelete(idTable)
            const tables = await Table.find()

            return res.status(200).send({
                success: true,
                message: "Đã xóa ghế thành công👌😒👌",
                tables
            })
        } catch (error) {
            next(error)
        }
    },
    updateTable: async (req, res, next) => {
        const { addressIn, color, dateIn, name, number, price, status, urlImgTable, size } = req.body
        const { id } = req.params.id
        try {
            // verify isadmin
            if (!addressIn || !color || !dateIn || !name || !number || !price || !status || !urlImgTable || !size) {
                return res.status(400).send({
                    success: false,
                    message: "Yêu cầu nhập đầy đủ thông tin"
                })
            }

            await Table.findOneAndUpdate(
                id,
                {
                    $set: req.body
                },
                { new: true }
            )

            const tables = await Table.find()

            return res.status(200).send({
                success: true,
                message: 'Cập nhật thành công',
                tables
            })


        } catch (error) {
            next(error)
        }
    },
    countTable: async (req, res, next) => {
        try {
            const allTable = await Table.find()
            if (!allTable) return res.status(400).send({
                success: false,
                message: 'get failure'
            })

            let count = 0
            allTable.forEach((table) => {
                count += table.numberCurrent
            })

            return res.status(200).send({
                success: true,
                message: "Lấy tất cả ban thành công",
                count
            })
        } catch (error) {
            next(error)
        }
    }
}


export default tableController