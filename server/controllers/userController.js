const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

module.exports.register = async (req, res) => {
    const { username, email, password } = req.body
    const validationErrors = validationResult(req);
    try {
        if (!validationErrors.errors.length) {
            var existingUser = await User.findOne({ email }).exec()
            if (existingUser)
                return res.status(409).json({ message: "user already exists" });
            const hashedPasword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                email,
                password: hashedPasword,
            })
            delete user.password
            return res.status(200).json({
                user: user,
                message: 'User created successfully'
            })
        }
        else {
            res.status(400).send({
                message: `${validationErrors.errors[0].msg}`,
            });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            message: `Internal server error`,
        });
    }
}
module.exports.login = async (req, res) => {
    const { email, password } = req.body
    const validationErrors = validationResult(req);
    try {
        if (!validationErrors.errors.length) {
            var existingUser = await User.findOne({ email }).exec()
            if (!existingUser)
                return res.status(400).json({ message: "email not found" });
            const isPasswordValid = await bcrypt.compareSync(password, existingUser.password);
            if (isPasswordValid === false)
                return res.status(400).json({ message: "wrong email or password" });
            delete existingUser.password
            return res.status(200).json({ user: existingUser, message: 'login successfull' })
        }
        else {
            res.status(400).send({
                message: `${validationErrors.errors[0].msg}`,
            });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            message: `Internal server error`,
        });
    }
}
module.exports.setAvatar = async (req, res) => {
    try {
        const userId = req.query.id

        const avatarImage = req.body.image
        await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage: avatarImage

        }).exec((err, response) => {
            console.log(err)
            if (err)
                return res.status(400).json({
                    message: 'invalid id'
                })
            return res.status(200).json({
                message: 'picture updated successfully',
                isSet: response.isAvatarImageSet,
                image: response.avatarImage
            })
        })

    } catch (err) {
        console.log('error....', err)
        res.status(500).json({ message: 'internal server error' })
    }
}
module.exports.allUser = async (req, res) => {
    try {
        const userId = req.query.id
        await User.find({_id:{ $ne: userId }}).select([
            "email",
            "username",
            "avatarImage",
            "isAvatarImageSet",
            "_id"
        ]).exec((err, response) => {
            if (err)
                return res.status(400).json({
                    message: 'invalid id'
                })
            return res.status(200).json({
                message: 'Users fetched successfully',
                users: response
            })
        })
    } catch (err) {
        console.log('error....', err)
        res.status(500).json({ message: 'internal server error' })
    }
}