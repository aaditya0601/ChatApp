const UserModel = require("../models/UserModel")

async function checkEmail(request,response){
    try {
        const { email } = request.body

        const checkEmail = await UserModel.findOne({email}).select("-password") // remove password because it is in hassed form (not from database)


        if(!checkEmail){
            return response.status(400).json({
                message : "user not exist",
                error : true
            })
        }

        return response.status(200).json({
            message : "email verify",
            success : true,
            data : checkEmail    // We send the data of user in the response  
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = checkEmail