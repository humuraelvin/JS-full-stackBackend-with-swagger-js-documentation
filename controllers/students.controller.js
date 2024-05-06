const Student = require('../models/student.model.js');

const createStudent = async (req, res) => {
    try {
        const { names, age, grade } = req.body;

        const newStudent = new Student({
            names, age, grade
        })

        await newStudent.save();
        res.status(200).json({ success: true, message: "Student create and saved sucessfully", data: newStudent });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: "Student with provided id does not exist" });
        }

        return res.status(200).json(student)

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getStudents = async (req, res) => {
    try {
        const allStudents = await Student.find();

        if (!allStudents) {
            return res.status(404).json({ success: false, message: "No any student found in the database" })
        }

        res.status(200).json({ success: true, data: allStudents });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}

const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        const { names, age, grade } = req.body;
        if (!names || !age || !grade) {
            return res.status(422).json("Some fields are empty");
        }

        const newInfo = await Notes.findByIdAndUpdate(studentId, { names, age, grade }, { new: true });

        return res.status(200).json({ message: "Student updated successfully", newInfo });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        const deletedStudent = await studentId.findByIdAndDelete();
        if (!deletedStudent) {
            return res.status(404).json({ message: "" })
        }

        return res.status(200).json({ success: true, message: "Student Deleted Sucessfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ sucess: false, message: "Internal server error" });
    }
}

module.exports = { createStudent, getStudent, getStudents, updateStudent, deleteStudent}