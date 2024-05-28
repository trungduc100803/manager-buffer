import Chair from "../models/chairModel.model.js";

const chairController = {
    addChair: async (req, res, next) => {
        const {
            name, price, urlImg,
            color, dateIn, numberAtIn,
            addressIn, status
        } = req.body

        try {
            if(!name || !price || !urlImg || !color || !dateIn || !numberAtIn || !addressIn || !status){
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
                message:"Ghế đã được thêm vào kho"
            })

        } catch (error) {
            next(error)
        }

        
    }
}


export default chairController