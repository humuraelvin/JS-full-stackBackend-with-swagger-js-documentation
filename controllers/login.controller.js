const { User } = require('../models/user.model.js')
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const Login = async (req, res) => {
    try {

        const { error } = validate(req.body);
        if (error)
            return res.status(401).send({ message: error.details[0].message })

        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res.status(400).send({ message: "Invalid username or password" });

        const validPassword = bcrypt.compare(
            req.body.password, user.password
        )

        if (!validPassword)
            return res.status(400).send({ message: "Invalid username or password" });

        const token = user.generateAuthToken();
        return res.status(200).json({ message: "Logged in successfully", token:token });

    } catch (error) {
        return res.status(500).send({ message: "Internal server error" })
    }
}

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}

module.exports = Login;