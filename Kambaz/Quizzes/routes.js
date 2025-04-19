import * as quizzesDao from "./dao.js";
import * as attemptsDao from "../Attempts/dao.js";
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
        const updated = quizzesDao.updateQuiz(quizId, quizUpdates);
        if (updated) {
            res.sendStatus(204);
        }
    });

    app.get("/api/quizzes/:quizId", async (req, res) => {
        let { quizId } = req.params;
        const questions = await questionsDao.findQuestionsForQuiz(quizId);
        res.json(questions);
    });

    app.post("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const question = {
            ...req.body,
            quizID: quizId,
        };

        const newQuestion = await questionsDao.createQuestion(question);
        if (!newQuestion) {
            return res.status(500);
        }

        res.send(newQuestion);
    });

    app.delete("/api/quizzes/:quizId/:questionId", async (req, res) => {
        const { quizId, questionId } = req.params;

        const deleted = await questionsDao.deleteQuestion(quizId, questionId);

        if (!deleted) {
            return res.status(404);
        }

        res.sendStatus(204);
    });
}
