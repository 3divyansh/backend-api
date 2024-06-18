const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../helpers/baseResponse");
const sendEmail = require("../helpers/sendEmail");
const ipInfo = require("ipinfo");



// create a user / register
const createUser = async (req, res, next) => {

    const user = req.body;
    const newUser = new User(user);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        newUser.password = hashedPassword;

        const getIpInfo = () => {
            return new Promise((resolve, reject) => {
                ipInfo((err, cLoc) => {
                    if (err) {
                        reject(err);
                    } else {
                        newUser.ip_info.push(cLoc);
                        resolve();
                    }
                });
            });
        };
        await getIpInfo();
        await newUser.save();
        // sendEmail(newUser.email)
        return res.status(201).json(success("User created successfully", newUser, 201));
    } catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

// delete a user
// findByIdAndDelete();

const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({
            _id: id
        })

        if (!user) {
            return res.status(404).json(error("User not found!", 404));
        }
        await User.findByIdAndDelete(id);
        return res.status(200).json(success("User deleted successfully", 200));
    } catch (err) {
        return res.status(500).json(error(err.message, 500));
    }
}

// edit a user
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const updatedValues = req.body;
    try {
        const user = await User.findOne({
            _id: id,
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        await User.findByIdAndUpdate(id, updatedValues);

        return res.status(200).json({
            message: "User updated",
            result: updatedValues,
        })
    } catch (err) {
        return res.status(500).json(({
            message: err.message,
        }))
    }

}


// list all users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        return res.status(200).json(success("Users fetched!", users, 200));
    } catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

// list an individual user

// login
const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            email: email,
        })
        if (!user) {
            return res.status(404).json({
                message: "User with given email address does not exist!",
            })
        }
        console.log("user ---->", user);
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        console.log('isPassword ->', isPasswordCorrect);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid Password",
            })
        }

        const payload = { user };
        const token = jwt.sign(payload, process.env.SECRET_KEY)
        return res.status(200).json({
            message: "Login Successful !",
            token: token
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    createUser,
    deleteUser,
    getAllUsers,
    updateUser,
    login
}