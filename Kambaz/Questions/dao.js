import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findQuestionsForQuiz(quizId) {
    return await model.find({ quizID: quizId });
}

export async function createQuestion(question) {
    return await model.create({ ...question, _id: uuidv4() });
}

export async function deleteQuestion(questionID) {
    return await model.deleteOne({ _id: questionID });
}

export async function updateQuestion(questionID, questionUpdates) {
    return await model.updateOne(
        { _id: questionID },
        { $set: questionUpdates }
    );
}
