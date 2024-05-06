const { string } = require('joi');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    names: {
        type: String,
    },
    age:{
        type: String,
    },
    grade:{
        type:String,
    }
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;