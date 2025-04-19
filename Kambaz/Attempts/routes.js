import * as attemptsDao from "./dao.js";

export default function AttemptsRoutes(app) {
    app.post("/api/attempts/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const currentUser = req.session["currentUser"];
        const attempt = {
            ...req.body,
            quiz_id: quizId,
            user_id: currentUser._id,
        };

        const newAttempt = await attemptsDao.createAttempt(attempt);
        if (!newAttempt) {
            return res.status(500);
        }

        res.send(newAttempt);
    });

    app.get("/api/attempts/:quizId/latest", async (req, res) => {
        const { quizId } = req.params;
        const currentUser = req.session["currentUser"];

        const latestAttempt = await attemptsDao.findLatestAttemptForQuiz(
            quizId,
            currentUser._id
        );
        if (!latestAttempt) {
            return res.status(404);
        }
        res.json(latestAttempt);
    });

    app.get("/api/attempts/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const currentUser = req.session["currentUser"];

        const numAttempts = await attemptsDao.findTotalAttempts(
            quizId,
            currentUser._id
        );
        if (!numAttempts) {
            return res.status(404);
        }
        res.json(numAttempts);
    });
}
