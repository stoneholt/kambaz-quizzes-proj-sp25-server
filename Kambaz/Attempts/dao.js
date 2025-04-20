import model from "./model.js";
import * as questionsDao from "../Questions/dao.js";
import { v4 as uuidv4 } from "uuid";

export async function createAttempt(attempt) {
    const scoredAttempt = await scoreAttempt(attempt);

    return model.create(scoredAttempt);
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
        const userAnswer = String(attempt.answers[question._id]).toLowerCase();
        let isCorrect = false;

        if (question.type === "fill-in-the-blank") {
            isCorrect = question.answers.some(
                (ans) => String(ans).toLowerCase() === userAnswer
            );
        } else {
            const correctAnswer = String(question.correctAnswer).toLowerCase();
            isCorrect = userAnswer === correctAnswer;
        }

        if (isCorrect) {
            currentScore += question.points;
        }

        attempt.answers[question._id] = [
            String(attempt.answers[question._id]),
            isCorrect,
        ];
        totalPoints += question.points;
    }

    const percentage =
        totalPoints > 0 ? Math.round((currentScore / totalPoints) * 100) : 0;

    return { ...attempt, score: percentage, _id: uuidv4() };
}
