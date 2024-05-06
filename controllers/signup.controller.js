const { User, validate } = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

const Register = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(401).send({ message: error.details[0].message })
        }
        const user = await User.find({ email: req.body.email });

        // if (user)
        //     return res.status(400).send({ message: "Email trying to be registered already exists" });

        const salt = await bcrypt.genSalt(10); // Await the result of genSalt
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await new User({ ...req.body, password: hashedPassword }).save();
        res.status(200).send({ message: "New User created and saved successfully", newUser })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error", error });
    }
}

module.exports = Register;

