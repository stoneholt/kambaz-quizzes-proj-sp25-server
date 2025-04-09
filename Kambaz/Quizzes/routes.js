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

    app.post("/api/quizzes/:quizId/questions", (req, res) => {
        const { quizId } = req.params;
        const question = {
            ...req.body,
            quizID: quizId,
        };
        const newQuestion = questionsDao.createQuestion(question);
        res.send(newQuestion);
    });
}
