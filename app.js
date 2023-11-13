import express from 'express';
import { 
    getSingleStudentTestResults,
    getTeacherTestResults,
    getTeacherAverageTestResults,
    getClassAverageTestResults
} from './index.js';

const app = express();

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

app.listen(3000);