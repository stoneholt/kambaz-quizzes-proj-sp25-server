import model from "./model.js";
import * as questionsDao from "../Questions/dao.js";
import { v4 as uuidv4 } from "uuid";

export async function createAttempt(attempt) {
    const newAttempt = {
        ...attempt,
        score: await scoreAttempt(attempt),
        _id: uuidv4(),
    };
    return model.create(newAttempt);
}

export async function findLatestAttemptForQuiz(quizId, userId) {
    return await model
        .findOne({
            quiz_id: quizId,
            user_id: userId,
        })
        .sort({ timestamp: -1 });
}

export async function findTotalAttempts(quizId, userId) {
    return await model.countDocuments({ quiz_id: quizId, user_id: userId });
}

async function scoreAttempt(attempt) {
    const questions = await questionsDao.findQuestionsForQuiz(attempt.quiz_id);

    let currentScore = 0;
    let totalPoints = 0;
    for (const question of questions) {
        const userAnswer = String(attempt.answers[question._id]);
        const correctAnswer = question.correctAnswer;

        if (userAnswer === correctAnswer) {
            currentScore += question.points;
        }
        totalPoints += question.points;
    }
    return Math.round((currentScore / totalPoints) * 100);
}
