import model from "./model.js";
import quizModel from "../Quizzes/model.js";
import { v4 as uuidv4 } from "uuid";

export async function findQuestionsForQuiz(quizId) {
    return await model.find({ quizID: quizId });
}

export async function createQuestion(question) {
    const questionID = uuidv4();
    const newQuestion = await model.create({ ...question, _id: questionID });

    if (newQuestion) {
        await quizModel.updateOne(
            { _id: question.quizID },
            { $addToSet: { qids: questionID } }
        );
    }

    return newQuestion;
}

export async function deleteQuestion(quizID, questionID) {
    const result = await model.deleteOne({ _id: questionID });

    if (result.deletedCount > 0) {
        await quizModel.updateOne(
            { _id: quizID },
            { $pull: { qids: questionID } }
        );
        return true;
    }

    return false;
}

export async function updateQuestion(questionID, questionUpdates) {
    return await model.updateOne(
        { _id: questionID },
        { $set: questionUpdates }
    );
}
