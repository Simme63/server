const User = require("../models/userSchema")
const bcrypt = require("bcrypt")

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id })
        console.log(req.params.id);

        if (!user || user.length === 0) {
            res.status(404).json("User not found")
        } else {
            res.status(200).json(users)
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body
    const encryptedPassword = await bcrypt.hash(password, 12)
    try {
        const user = new User({
            name: name,
            email: email,
            password: encryptedPassword
        })
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }

}

const deleteUser = async (req, res) => {
    try {
        const userToDelete = await User.findByIdAndDelete({ _id: req.params.id })

        if (!userToDelete) {
            res.status(404).json("User not found")
        }
        res.status(200).json({ message: "User deleted:", userToDelete })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        if (!user) {
            res.status(404).json("User not found")
        }

        user.name = req.body.name || user.name
        user.password = req.body.password || user.password
        user.email = req.body.email || user.email

        const updatedUser = await user.save()
        if (!updatedUser) {
            res.status(400).json("User not updated")
        }
        res.status(200).json({ message: "User updated successfully", updateUser })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser
}