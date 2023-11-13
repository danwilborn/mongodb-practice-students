import mongoose from "mongoose";
const { Schema, model } = mongoose;

const examSchema = new Schema({
    examId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    course: {
        type: String,
        enum: ['Math', 'English', 'History', 'Science'],
        required: true,
    },
    type: {
        type: String,
        enum: ['midterm', 'final'],
        required: true,
        lowercase: true,
    },
    date: {
        type: Date,
        required: true,
    },
    score: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
    },
});

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    studentId: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
    },
    exams: [examSchema]
});

const Student = model('Student', studentSchema);
export default Student;