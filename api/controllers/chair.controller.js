import Chair from "../models/chairModel.model.js";

const chairController = {
    addChair: async (req, res, next) => {
        const {
            name, price, urlImg,
            color, dateIn, numberAtIn,
            addressIn, status
        } = req.body

        try {
            if (!name || !price || !urlImg || !color || !dateIn || !numberAtIn || !addressIn || !status) {
                return res.status(400).send({
                    message: "Bạn hãy nhập đủ các thông tin",
                    success: false
                })
            }

            const chair = new Chair({
                name, price, urlImg, color, dateIn, numberAtIn, addressIn, status, numberCurrent: numberAtIn
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
    }
}


export default chairController