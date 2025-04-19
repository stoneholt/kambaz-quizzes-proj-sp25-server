import model from "./model.js"
import { v4 as uuidv4 } from "uuid";

export async function findQuizzesForCourse(courseId) {
    return await model.find({course: courseId});
}

export function addQuestionToQuiz(quizId, questionId) {
    const { quizzes } = Database;
    const quiz = quizzes.find((q) => q._id === quizId);
    if (!quiz.qids) {
        quiz.qids = [];
    }
    quiz.qids = [...quiz.qids, questionId];
    return quiz;
}

export function removeQuestionFromQuiz(quizId, questionId) {
    const { quizzes } = Database;
    const quiz = quizzes.find((q) => q._id === quizId);
    if (!quiz) return null;
    if (!quiz.qids) return null;

    quiz.qids = quiz.qids.filter((id) => id !== questionId);
    return quiz;
}

export function createQuiz(quiz) {
    return model.create({ ...quiz, _id: uuidv4() });
}

export function deleteQuiz(quizId) {
    return model.deleteOne({_id: quizId});
}

export function updateQuiz(quizId, quizUpdates) {
    model.updateOne({ _id: quizId }, { $set: quizUpdates });
}
