import mongoose from "mongoose";
import Class from './model/Class.js';
import Student from './model/Student.js';

main().catch((err) => console.log(err));

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/students');

    // await initializeDb();
    // await addExamScores();

    // await updateExamScore('S001', '41', 87);

    // await addDuplicateExamScore();
    // await addDuplicateTeacher();

    // await getSingleStudentTestResults('S001');
    // await getTeacherTestResults('T001');
    // await getTeacherAverageTestResults('T001');
    // await getClassAverageTestResults();

    // await moveStudents(['S001', 'S002'], 'B', 'A');
}

async function initializeDb() {
    const studentA1 = await Student.create({
        firstName: 'John',
        lastName: 'Doe',
        studentId: 'S001',
    });

    const studentA2 = await Student.create({
        firstName: 'Michael',
        lastName: 'Cain',
        studentId: 'S002',
    });

    const studentA3 = await Student.create({
        firstName: 'Tom',
        lastName: 'Cruise',
        studentId: 'S003',
    });

    const teacherA = {
        firstName: 'Jane',
        lastName: 'Doe',
        teacherId: 'T001',
    };

    const studentsA = [studentA1._id, studentA2._id, studentA3._id];

    const classA = await Class.create({
        name: 'A',
        teacher: teacherA,
        students: studentsA,
    });

    const studentB1 = await Student.create({
        firstName: 'Joe',
        lastName: 'Biden',
        studentId: 'S004',
    });

    const studentB2 = await Student.create({
        firstName: 'Josh',
        lastName: 'Allen',
        studentId: 'S005',
    });

    const studentB3 = await Student.create({
        firstName: 'Donald',
        lastName: 'Trump',
        studentId: 'S006',
    });

    const teacherB = {
        firstName: 'Morgan',
        lastName: 'Freeman',
        teacherId: 'T002',
    };

    const studentsB = [studentB1._id, studentB2._id, studentB3._id];

    const classB = await Class.create({
        name: 'B',
        teacher: teacherB,
        students: studentsB,
    });
}

export const createClass = async (className, teacher) => {
    try {
        const newClass = await Class.create({
            name: className,
            teacher: teacher,
        });

        console.log('Success!');
        return newClass;
    } catch (err) {
        console.log(err);
        return { 'Error': err };
    }
}

export const createStudent = async (className, student) => {
    try {
        const newStudent = await Student.create(student);

        let updatedClass = await Class.updateOne(
                { 
                    name: className, 
                    'students.studentId': { $ne: student.studentId }
                },
                {
                    $addToSet: {
                        students: newStudent,
                    }
                }
            );
        
        updatedClass = await Class.findOne({ name: className }).populate('students');

        console.log('Success!');
        return updatedClass;
    } catch (err) {
        console.log(err);
        return { 'Error': err };
    }
}

async function addExamScores() {
    let student1 = await Student.updateOne(
        { 
            'studentId': 'S001', 
        },
        { 
            $addToSet: {
                exams: {
                    examId: '40',
                    course: 'Math',
                    type: 'midterm',
                    date: '2023-11-07',
                    score: 100,
                }
        }},
        { 
            runValidators: true,
            upsert: true,
        }
    );

    let student2 = await Student.updateOne(
        { 
            studentId: 'S002', 
        },
        { 
            $addToSet: {
                exams: {
                    examId: '40',
                    course: 'Math',
                    type: 'midterm',
                    date: '2023-11-07',
                    score: 89,
                }
        }},
        { 
            runValidators: true,
            upsert: true,
        }
    );

    let student3 = await Student.updateOne(
        { 
            studentId: 'S003', 
        },
        { 
            $addToSet: {
                exams: {
                    examId: '40',
                    course: 'Math',
                    type: 'midterm',
                    date: '2023-11-07',
                    score: 47,
                }
        }},
        { 
            runValidators: true,
            upsert: true,
        }
    );

    let student4 = await Student.updateOne(
        { 
            studentId: 'S003', 
        },
        { 
            $addToSet: {
                exams: {
                    examId: '41',
                    course: 'English',
                    type: 'midterm',
                    date: '2023-11-09',
                    score: 72,
                }
        }},
        { 
            runValidators: true,
            upsert: true,
        }
    );

    let student5 = await Student.updateOne(
        { 
            studentId: 'S001', 
        },
        { 
            $addToSet: {
                exams: {
                    examId: '41',
                    course: 'English',
                    type: 'midterm',
                    date: '2023-11-09',
                    score: 92,
                }
        }},
        { 
            runValidators: true,
            upsert: true,
        }
    );

    let student6 = await Student.updateOne(
        { 
            studentId: 'S002', 
        },
        { 
            $addToSet: {
                exams: {
                    examId: '41',
                    course: 'English',
                    type: 'midterm',
                    date: '2023-11-09',
                    score: 82,
                }
        }},
        { 
            runValidators: true,
            upsert: true,
        }
    );

    let student7 = await Student.updateOne(
        { 
            studentId: 'S004', 
        },
        { 
            $addToSet: {
                exams: {
                    examId: '41',
                    course: 'English',
                    type: 'midterm',
                    date: '2023-11-09',
                    score: 75,
                }
        }},
        { 
            runValidators: true,
            upsert: true,
        }
    );

    let student8 = await Student.updateOne(
        { 
            studentId: 'S005', 
        },
        { 
            $addToSet: {
                exams: {
                    examId: '41',
                    course: 'English',
                    type: 'final',
                    date: '2023-11-09',
                    score: 65,
                }
        }},
        { 
            runValidators: true,
            upsert: true,
        }
    );

    let student9 = await Student.updateOne(
        { 
            studentId: 'S006', 
        },
        { 
            $addToSet: {
                exams: {
                    examId: '41',
                    course: 'English',
                    type: 'final',
                    date: '2023-11-09',
                    score: 91,
                }
        }},
        { 
            runValidators: true,
            upsert: true,
        }
    );

    let student10 = await Student.updateOne(
        { 
            studentId: 'S006', 
        },
        { 
            $addToSet: {
                exams: {
                    examId: '42',
                    course: 'English',
                    type: 'final',
                    date: '2023-11-12',
                    score: 59,
                }
        }},
        { 
            runValidators: true,
            upsert: true,
        }
    );
}

export const addExamScore = async (studentId, exam) => {
    try {
        let student = await Student.updateOne(
            { 
                'studentId': studentId, 
                'exams.examId': { $ne: exam.examId }
            },
            { 
                $addToSet: {
                    exams: {
                        examId: exam.examId,
                        course: exam.course,
                        type: exam.type,
                        date: exam.date,
                        score: exam.score,
                    }
            }},
            { 
                runValidators: true,
                upsert: true,
            }
        ).exec();
        console.log('Success!');

        student = await Student.findOne({ 'studentId': studentId }).exec();
        return { 'updatedStudent': student };
    } catch (err) {
        console.log(err);
        return { 'Error': err };
    }
}

export const updateExamScore = async (studentId, examId, newScore) => {
    try {
        let student = await Student.updateOne(
                { 
                    studentId: studentId,
                    "exams.examId": examId,
                },
                {
                    $set: {
                        "exams.$.score": newScore,
                    }
                },
                { 
                    runValidators: true,
                }
            ).exec();
        
        console.log('Success!');

        student = await Student.findOne({ 'studentId': studentId }).exec();
        return { 'updatedStudent': student };
    } catch (err) {
        console.log(err);
        return { 'Error': err };
    }
}

async function addDuplicateTeacher() {
    const teacherA = {
        firstName: 'Jane',
        lastName: 'Doe',
        teacherId: 'T001',
    };

    const studentC1 = await Student.create({
        firstName: 'John',
        lastName: 'Doe',
        studentId: 'S123',
    });

    const studentC2 = await Student.create({
        firstName: 'Michael',
        lastName: 'Cain',
        studentId: 'S124',
    });

    const studentC3 = await Student.create({
        firstName: 'Tom',
        lastName: 'Cruise',
        studentId: 'S125',
    });

    const studentsC = [studentC1, studentC2, studentC3];

    const classC = await Class.create({
        name: 'C',
        teacher: teacherA,
        students: studentsC,
    });
}

async function addDuplicateExamScore() {
    const newExam = {
        examId: '40',
        course: 'Math',
        type: 'midterm',
        date: '2023-11-07',
        score: 100,
    };

    let student1 = await Student.updateOne(
        { 
            'studentId': 'S001', 
            'exams.examId': {$ne: newExam.examId}
        },
        { 
            $addToSet: {
                exams: newExam,
            }
        },
        { 
            runValidators: true,
            upsert: true,
        }
    );

    student1 = await Student
        .findOne({ studentId: 'S001' })
        .exec();

    console.log(student1);
}

export const getAllStudents = async () => {
    try {
        const results = await Student.find().exec();
        console.log('Success!');
        return { 'students': results };
    } catch (err) {
        console.log(err);
        return { 'Error': err };
    }
}

export const getSingleStudentTestResults = async (studentId) => {
    const results = await Student
        .findOne({
            studentId: studentId,
        })
        .exec();

    return results;
}

export const getTeacherTestResults = async (teacherId) => {
    const results = await Class
        .findOne({ 'teacher.teacherId': teacherId })
        .populate({ path: 'students' })
        .exec();

    let output = {};
    results.students.forEach((s) => {
        const key = s.firstName + " " + s.lastName;
        output[key] = s.exams;
    });

    return output;
}

export const getTeacherAverageTestResults = async (teacherId) => {
    const results = await Class
        .findOne({ 'teacher.teacherId': teacherId })
        .populate({ path: 'students' })
        .exec();

    let examScores = {};
    let averageExamScores = {};
    results.students.forEach((student) => {
        examScores[student.studentId] = {};
        student.exams.forEach((exam) => {
            if (examScores[student.studentId][exam.course]) {
                examScores[student.studentId][exam.course] = [...examScores[student.studentId][exam.course], exam.score];
            } else {
                examScores[student.studentId][exam.course] = [exam.score];
            }
        });
    });

    Object.keys(examScores).forEach((student) => {
        averageExamScores[student] = {}
        Object.keys(examScores[student]).forEach((course) => {
            averageExamScores[student][course] = examScores[student][course].reduce((a, b) => a + b) / examScores[student][course].length;
        });
    });

    return averageExamScores;
}

// export const getTeacherAverageTestResults2 = async (teacherId) => {
//     const results = await Class
//         .findOne({ 'teacher.teacherId': teacherId })
//         .populate({ path: 'students' })
//         .aggregate([
//             {
//                 "$unwind": "$exams"
//             },
//             {
//                 "$group": {
//                     "course": "$course",
//                     "average": {
//                         "$avg": "$exams.score"
//                     }
//                 }
//             }
//         ])
//         .exec();

//     console.log(results);
// }

export const getClassAverageTestResults = async () => {
    let examScores = {};
    const results = await Class
        .find()
        .populate('students')
        .cursor()
        .eachAsync((c) => {
            examScores[c.name] = {}
            c.students.forEach((student) => {
                student.exams.forEach((exam) => {
                    if (examScores[c.name][exam.course]) {
                        examScores[c.name][exam.course] = [...examScores[c.name][exam.course], exam.score]
                    } else {
                        examScores[c.name][exam.course] = [exam.score]
                    }
                });
            });
        });
    
    let averageExamScores = {};
    Object.keys(examScores).forEach((c) => {
        averageExamScores[c] = {};
        Object.keys(examScores[c]).forEach((course) => {
            averageExamScores[c][course] = examScores[c][course].reduce((a, b) => a + b) / examScores[c][course].length;
        });
    });

    return averageExamScores;
}

export const moveStudents = async (studentIds, oldClass, newClass) => {
    try {
        const movedStudents = await Class.findOne(
            { name: oldClass }
        ).populate({
            path: 'students',
            match: {
                studentId: {
                    $in: studentIds
                }
            }
        }).exec();

        let newClassUpdate = await Class.updateOne(
            { name: newClass }, 
            { 
                $addToSet: {
                    students: movedStudents.students,
                }
            },
            {            
                runValidators: true,
                upsert: true,
            }).exec();
        
        let oldClassUpdate = await Class.updateOne(
            { name: oldClass }, 
            { 
                $pull: {
                    students: {
                        $in: movedStudents.students,
                    },
                }
            },
            {            
                runValidators: true,
                upsert: true,
            }).exec();
        
        newClassUpdate = await Class.findOne({ name: newClass }).populate('students').exec();
        oldClassUpdate = await Class.findOne({ name: oldClass }).populate('students').exec();

        console.log('new: ', newClassUpdate);
        console.log('old: ', oldClassUpdate);
    } catch (err) {
        console.log(err);
        return { 'Error': err };
    }
}