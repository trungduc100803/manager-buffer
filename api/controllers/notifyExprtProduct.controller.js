import Notify from "../models/notifyExportProductModel.model.js"


const notifyExportProductController = {
    addNotifyProduct: async (req, res, next) => {
        const { content, sender, idProduct, number, dateOut, totalPrice } = req.body

        try {
            if (!content || !sender || !idProduct || !number || !dateOut || !totalPrice) {
                return res.status(400).send({
                    success: false,
                    message: "thiếu thông tin"
                })
            }

            const newNotify = new Notify({
                content, sender, idProduct, number, dateOut, totalPrice
            })
            await newNotify.save()

            return res.status(200).send({
                success: true,
                message: "Thêm thông báo thành công"
            })
        } catch (error) {
            next(error)
        }
    },
    getAllNotifyProduct: async (req, res, next) => {
        try {
            //verify isadmin
            const notifyProducts = await Notify.find()
            if (notifyProducts.length > 1) {
                notifyProducts.reverse()
            }
            return res.status(200).send({
                success: true,
                message: "get all notify",
                notifyProducts
            })
        } catch (error) {
            next(error)
        }
    }
}

export default notifyExportProductController
