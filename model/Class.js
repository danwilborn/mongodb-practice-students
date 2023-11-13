import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

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

const classSchema = new Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
    },
    teacher: {
        type: teacherSchema,
        required: true,
    },
    students: [{
        type: SchemaTypes.ObjectId,
        ref: 'Student',
    }]
});

const Class = model('Class', classSchema);
export default Class;