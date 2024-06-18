const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { success, error } = require("../helpers/baseResponse")


const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Kindly login first"
        })
    }
}

const checkAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const key = jwt.verify(token, process.env.SECRET_KEY);
        const user = User.findOne({
            email: key?.user?.email,
        })

        if (key?.user.role === "admin") {
            next()
        } else {
            return res.status(403).json(error("You're not allowed to access this route", 403))
        }

    } catch (err) {
        res.status(401).json(error("Unauthorized", 401))
    }
}


module.exports = {
    checkAuth,
    checkAdmin
}