import model from "./model.js";
import questionsModel from "../Questions/model.js";
import { v4 as uuidv4 } from "uuid";

export async function findQuizzesForCourse(courseId) {
    return await model.find({ course: courseId });
}

export async function createQuiz(quiz) {
    const newQuizID = uuidv4();

    const questions = await questionsModel.find({ quizID: quiz._id });

    console.log(quiz);
    quiz.qids = [];
    for (const question of questions) {
        question.quizID = newQuizID;
        await question.save();
        quiz.qids.push(question._id);
    }
    console.log(quiz);

    return model.create({ ...quiz, _id: newQuizID });
}

export async function deleteQuiz(quizId) {
    await questionsModel.deleteMany({ quizID: quizId });
    return model.deleteOne({ _id: quizId });
}

export async function updateQuiz(quizId, quizUpdates) {
    await model.updateOne({ _id: quizId }, { $set: quizUpdates });
}
