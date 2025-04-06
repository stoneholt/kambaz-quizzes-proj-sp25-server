import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findQuizzesForCourse(courseId) {
    const { quizzes } = Database;
    return quizzes.filter((quiz) => quiz.course === courseId);
}

export function createQuiz(quiz) {
    const newQuiz = { ...quiz, _id: uuidv4() };
    Database.quizzes = [...Database.quizzes, newQuiz];
    return newQuestion;
}

export function deleteQuiz(quizId) {
    const { quizzes } = Database;
    const initialLength = quizzes.length;
    Database.quizzes = quizzes.filter((quiz) => quiz._id !== quizId);
    return Database.quizzes.length < initialLength;
}

export function updateQuiz(quizId, quizUpdates) {
    const { quizzes } = Database;
    const quiz = quizzes.find((quiz) => quiz._id === quizId);
    if (!quiz) return null;
    Object.assign(quiz, quizUpdates);
    return quiz;
}
