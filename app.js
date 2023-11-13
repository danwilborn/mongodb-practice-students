import express from 'express';
import {
    getAllStudents, 
    getSingleStudentTestResults,
    getTeacherTestResults,
    getTeacherAverageTestResults,
    getClassAverageTestResults,
    addExamScore,
    updateExamScore,
    moveStudents
} from './index.js';

const app = express();
app.use(express.json());

app.get('/scores/student', async (req, res) => {
    try {
        const { method, url, headers } = req;

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        const body = await getSingleStudentTestResults(req.query.id);

        let responseBody = {
            headers,
            method,
            url,
            body: body,
        };

        res.send(JSON.stringify(responseBody));
    } catch (err) {
        res.status(500);
        console.error(err);
    }
});

app.get('/scores/teacher', async (req, res) => {
    try {
        const { method, url, headers } = req;

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        const body = await getTeacherTestResults(req.query.id);

        let responseBody = {
            headers,
            method,
            url,
            body: body,
        };

        res.send(JSON.stringify(responseBody));
    } catch (err) {
        res.status(500);
        console.error(err);
    }
});

app.get('/scores/average/teacher', async (req, res) => {
    try {
        const { method, url, headers } = req;

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        const body = await getTeacherAverageTestResults(req.query.id);

        let responseBody = {
            headers,
            method,
            url,
            body: body,
        };

        res.send(JSON.stringify(responseBody));
    } catch (err) {
        res.status(500);
        console.error(err);
    }
});

app.get('/scores/average/classes', async (req, res) => {
    try {
        const { method, url, headers } = req;

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        const body = await getClassAverageTestResults();

        let responseBody = {
            headers,
            method,
            url,
            body: body,
        };

        res.send(JSON.stringify(responseBody));
    } catch (err) {
        res.status(500);
        console.error(err);
    }
});

app.post('/scores/student/add', async (req, res) => {
    try {
        const { method, url, headers } = req;

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        const studentId = req.body?.studentId;
        const exam = req.body?.exam;

        let body = {};
        if (!exam || !studentId) {
            res.statusCode = 400;
            body = {'Error': 'missing required field'};
        } else {
            body = await addExamScore(studentId, exam);
        }

        let responseBody = {
            headers,
            method,
            url,
            body: body,
        };

        res.send(JSON.stringify(responseBody));
    } catch (err) {
        res.status(500);
        console.error(err);
    }
});

app.get('/students', async (req, res) => {
    try {
        const { method, url, headers } = req;

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        const body = await getAllStudents();

        let responseBody = {
            headers,
            method,
            url,
            body: body,
        };

        res.send(JSON.stringify(responseBody));
    } catch (err) {
        res.status(500);
        console.error(err);
    }
});

app.post('/scores/student/update', async (req, res) => {
    try {
        const { method, url, headers } = req;

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        const studentId = req.body?.studentId;
        const examId = req.body?.examId;
        const newScore = req.body?.newScore;

        let body = {};
        if (!examId || !studentId || newScore == null) {
            res.statusCode = 400;
            body = {'Error': 'missing required field'};
        } else {
            body = await updateExamScore(studentId, examId, newScore);
        }

        let responseBody = {
            headers,
            method,
            url,
            body: body,
        };

        res.send(JSON.stringify(responseBody));
    } catch (err) {
        res.status(500);
        console.error(err);
    }
});

app.post('/students/move', async (req, res) => {
    try {
        const { method, url, headers } = req;

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        const studentIds = req.body?.studentIds;
        const oldClass = req.body?.oldClass;
        const newClass = req.body?.newClass;

        let body = {};
        if (!studentIds || studentIds.length === 0 || !oldClass || !newClass) {
            res.statusCode = 400;
            body = {'Error': 'missing required field'};
        } else {
            body = await moveStudents(studentIds, oldClass, newClass);
        }

        let responseBody = {
            headers,
            method,
            url,
            body: body,
        };

        res.send(JSON.stringify(responseBody));
    } catch (err) {
        res.status(500);
        console.error(err);
    }
});

app.listen(3000);