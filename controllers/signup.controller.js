const { User, validate } = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

const Register = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(401).send({ message: error.details[0].message })
        }
        const user = await User.find({ email: req.body.email });

        if (user)
            return res.status(400).send({ message: "Email trying to be registered not found" });

        const salt = bcrypt.genSalt(process.env.SALT);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashedPassword }).save();
        res.status(200).send({message:"New User created and saved successfully"})

    } catch (error) {
        res.status(500).send({message:"Internal server error"});
    }
}

module.exports = Register;