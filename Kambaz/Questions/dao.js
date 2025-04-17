import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findQuestionsForQuiz(quizId) {
    const { questions } = Database;
    return questions.filter((question) => question.quizID === quizId);
}

export function createQuestion(question) {
    const newQuestion = { ...question, _id: uuidv4() };
    Database.questions = [...Database.questions, newQuestion];
    return newQuestion;
}

export function deleteQuestion(questionID) {
    const { questions } = Database;
    const initialLength = questions.length;
    Database.questions = questions.filter(
        (question) => question._id !== questionID
    );
    return Database.questions.length < initialLength;
}

export function updateQuestion(questionID, questionUpdates) {
    const { questions } = Database;
    const question = questions.find((question) => question._id === questionID);
    if (!question) return null;
    Object.assign(question, questionUpdates);
    return question;
}
