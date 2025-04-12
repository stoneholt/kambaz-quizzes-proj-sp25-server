import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function createAttempt(attempt) {
    const newAttempt = { ...attempt, _id: uuidv4() };
    Database.attempts = [...Database.attempts, newAttempt];
    return newAttempt;
}

export function findLatestAttemptForQuiz(quizId, userId) {
    const { attempts } = Database;
    return attempts
        .filter((a) => a.quiz_id === quizId && a.user_id === userId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
}

export function findTotalAttempts(quizId, userId) {
    const { attempts } = Database;
    return attempts.filter((a) => a.quiz_id === quizId && a.user_id === userId)
        .length;
}
