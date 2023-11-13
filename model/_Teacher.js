import mongoose from "mongoose";
const { Schema, model } = mongoose;

const teacherSchema = new Schema({
    firstName: String,
    lastName: String,
    teacherId: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
    }
});

const Teacher = model('Teacher', teacherSchema);
export default Teacher;