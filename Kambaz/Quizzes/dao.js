import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findQuizzesForCourse(courseId) {
    return await model.find({ course: courseId });
}

export function createQuiz(quiz) {
    return model.create({ ...quiz, _id: uuidv4() });
}

export function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
}

export async function updateQuiz(quizId, quizUpdates) {
    await model.updateOne({ _id: quizId }, { $set: quizUpdates });
}
