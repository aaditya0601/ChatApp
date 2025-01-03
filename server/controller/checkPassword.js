const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

// This is first step of login (ham login two step me karenge , check email and check password)
async function checkPassword(request,response){
    try {
        const { password, userId } = request.body 

        const user = await UserModel.findById(userId)

        const verifyPassword = await bcryptjs.compare(password,user.password)

        if(!verifyPassword){
            return response.status(400).json({
                message : "Please check password",
                error : true
            })
        }

        // Create this payload for the 
        const tokenData = {
            id : user._id,
            email : user.email 
        }
        const token = await jwt.sign(tokenData,process.env.JWT_SECREAT_KEY,{ expiresIn : '1d'})

        const cookieOptions = {
            http : true,
            secure : true
        }

        // "token" ko cookie me insert karke client side pe bhej rahe hai.
        return response.cookie('token',token,cookieOptions).status(200).json({
            message : "Login successfully",
            token : token,   // Yaha par hum directly user ko bhi bhej sakte the but that is not a secure way (data : user) : like 
            success :true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = checkPassword