import Chair from "../models/chairModel.model.js";

const chairController = {
    addChair: async (req, res, next) => {
        const {
            name, price, urlImg,
            color, dateIn, numberAtIn,
            addressIn, status, moreStatus
        } = req.body

        try {
            if (!name || !price || !urlImg || !color || !dateIn || !numberAtIn || !addressIn || !status || !moreStatus) {
                return res.status(400).send({
                    message: "Bạn hãy nhập đủ các thông tin",
                    success: false
                })
            }

            const chair = new Chair({
                name, price, urlImg, color, dateIn, numberAtIn, addressIn, status, numberCurrent: numberAtIn, moreStatus
            })
            await chair.save()

            return res.status(200).send({
                success: true,
                chair,
                message: "Ghế đã được thêm vào kho"
            })

        } catch (error) {
            next(error)
        }


    },
    getAllChair: async (req, res, next) => {
        // verify, isAdmin
        try {
            const allChair = await Chair.find()
            if (!allChair) return res.status(400).send({
                success: false,
                message: 'get failure'
            })

            return res.status(200).send({
                success: true,
                message: "Lấy tất cả ghế thành công",
                chairs: allChair
            })
        } catch (error) {
            next(error)
        }
    },
    deleteChair: async (req, res, next) => {
        const { idChair } = req.body
        try {
            // verify, isadmin
            if (!idChair) return res.status(400).send({
                success: false,
                message: "ko co id ghe"
            })



            await Chair.findByIdAndDelete(idChair)
            const chairs = await Chair.find()

            return res.status(200).send({
                success: true,
                message: "Đã xóa ghế thành công👌😒👌",
                chairs
            })
        } catch (error) {
            next(error)
        }
    },
    getChairById: async (req, res, next) => {
        const id = req.params.id
        try {
            if (!id) return res.status(400).send({
                success: false,
                message: 'khong tim thay id cua ghe'
            })

            const chair = await Chair.findOne({ _id: id })
            if (!chair) return res.status(400).send({
                success: false,
                message: "khong tim thay ghe"
            })

            return res.status(200).send({
                success: true,
                message: "tim thanh cong",
                chair
            })
        } catch (error) {
            next(error)
        }
    },
    updateChair: async (req, res, next) => {
        const { addressIn, color, dateIn, name, numberAtIn, price, status, urlImg } = req.body
        const { id } = req.params.id
        try {
            // verify isadmin
            if (!addressIn || !color || !dateIn || !name || !numberAtIn || !price || !status || !urlImg) {
                return res.status(400).send({
                    success: false,
                    message: "Yêu cầu nhập đầy đủ thông tin"
                })
            }

            await Chair.findOneAndUpdate(
                id,
                {
                    $set: {
                        addressIn: addressIn,
                        color: color,
                        dateIn: dateIn,
                        name: name,
                        numberAtIn: numberAtIn,
                        price: price,
                        status: status,
                        urlImg: urlImg
                    }
                },
                { new: true }
            )

            const chairs = await Chair.find()

            return res.status(200).send({
                success: true,
                message: 'Cập nhật thành công',
                chairs
            })


        } catch (error) {
            next(error)
        }
    },
    exportChair: async (req, res, next) => {
        const { number, id } = req.body
        try {

            const chairCurrent = await Chair.findById(id)

            if (!chairCurrent) return res.status(400).send({
                success: false,
                message: 'chair not found'
            })


            const newChair = await Chair.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        numberCurrent: chairCurrent.numberCurrent - number
                    }
                },
                { new: true }
            )

            return res.status(200).send({
                success: true,
                message: 'export chair successfully',
                idChair: newChair._id,
                numberCurrent: newChair.numberCurrent
            })
        } catch (error) {
            next(error)
        }
    },
    countChair: async (req, res, next) => {
        try {
            const allChair = await Chair.find()
            if (!allChair) return res.status(400).send({
                success: false,
                message: 'get failure'
            })

            let count = 0
            allChair.forEach((chair) => {
                count += chair.numberCurrent
            })

            return res.status(200).send({
                success: true,
                message: "Lấy tất cả ghế thành công",
                count
            })
        } catch (error) {
            next(error)
        }
    }
}


export default chairController