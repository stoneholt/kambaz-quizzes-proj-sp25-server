import * as quizzesDao from "./dao.js";
import * as questionsDao from "../Questions/dao.js";

export default function QuizRoutes(app) {
    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const deleted = await quizzesDao.deleteQuiz(quizId);
        if (deleted) {
            res.sendStatus(204);
        }
    });

    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const updated = await quizzesDao.updateQuiz(quizId, quizUpdates);
        if (updated) {
            res.sendStatus(204);
        }
    });

    app.get("/api/quizzes/:quizId", async (req, res) => {
        let { quizId } = req.params;
        const questions = questionsDao.findQuestionsForQuiz(quizId);
        res.json(questions);
    });

    app.post("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const question = {
            ...req.body,
            quizID: quizId,
        };

        const newQuestion = questionsDao.createQuestion(question);
        if (!newQuestion) {
            return res.status(500);
        }

        const updatedQuiz = await quizzesDao.addQuestionToQuiz(
            quizId,
            newQuestion._id
        );
        if (!updatedQuiz) {
            return res.status(404);
        }

        res.send(newQuestion);
    });

    app.delete("/api/quizzes/:quizId/:questionId", async (req, res) => {
        const { quizId, questionId } = req.params;

        const deleted = await questionsDao.deleteQuestion(questionId);

        if (!deleted) {
            return res.status(404);
        }

        const updatedQuiz = quizzesDao.removeQuestionFromQuiz(
            quizId,
            questionId
        );

        if (!updatedQuiz) {
            return res.status(404);
        }

        res.sendStatus(204);
    });
}
