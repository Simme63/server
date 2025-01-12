const User = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const registerUser = async (req, res, next) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) {
            res.status(400).json("Use a different email address")
            return;
        }
        const encryptedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
            name, email, password: encryptedPassword
        })
        const user = newUser.save()
        res.status(201).json({ message: "user created succesfully", user })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ message: "User not found, try again" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            res.status(400).json("Invalid credentials")
        }
        const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
        res.status(200).json({ message: "Login successful", token, user })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })

    }
}

module.exports = {
    login,
    registerUser
}