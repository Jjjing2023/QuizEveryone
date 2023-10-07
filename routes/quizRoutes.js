import express from 'express';
import { connect } from '../database/db.js';

const router = express.Router();

router.post('/creatquiz', async (req, res) => {
    
    try {
        const db = await connect();

        const quiz = {
            title: "Sample Quiz",
            description: "A simple quiz example",
            questions: [
                {
                    type: "mcq",
                    questionText: "What's the capital of France?",
                    options: ["London", "Berlin", "Paris", "Rome"],
                    correctAnswer: "Paris"
                },
            ],
            responses: []
        };

        // Insert the quiz object into the 'quizzes' collection
        const result = await db.collection('mcq').insertOne(quiz);

        res.json({ success: true, quizId: result.insertedId });
    } catch (error) {
        console.error("Error inserting quiz:", error);
        res.status(500).json({ success: false, message: "Internal server error lala" });
        console.log("yesyesyes");
    }
});

export default router;