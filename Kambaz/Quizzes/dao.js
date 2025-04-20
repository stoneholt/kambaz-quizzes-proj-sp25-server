import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findQuizzesForCourse(courseId) {
    return await model.find({ course: courseId });
}

export async function createQuiz(quiz) {
    const newQuizID = uuidv4();

    const questions = await questionsModel.find({ quizID: quiz._id });

    quiz.qids = [];
    let totalPoints = 0;

    for (const question of questions) {
        question.quizID = newQuizID;
        await question.save();
        quiz.qids.push(question._id);
        totalPoints += question.points || 0;
    }
    quiz.points = totalPoints;

    return model.create({ ...quiz, _id: newQuizID });
}

export function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
}

export async function updateQuiz(quizId, quizUpdates) {
    const questions = await questionsModel.find({ quizID: quizId });

    let totalPoints = 0;

    for (const question of questions) {
        totalPoints += question.points || 0;
    }
    quizUpdates.points = totalPoints;

    await model.updateOne({ _id: quizId }, { $set: quizUpdates });
}
