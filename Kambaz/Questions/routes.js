import * as questionsDao from "./dao.js";

export default function QuestionRoutes(app) {
    app.put("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        const questionUpdates = req.body;
        const updated = await questionsDao.updateQuestion(
            questionId,
            questionUpdates
        );
        if (updated) {
            res.sendStatus(204);
        }
    });
}
