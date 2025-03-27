import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.post("/api/enrollments/:courseId/:userId", async (req, res) => {
        const { courseId, userId } = req.params;
        const status = await enrollmentsDao.enrollUserInCourse(
            userId,
            courseId
        );
        res.send(status);
    });

    app.delete("/api/enrollments/:courseId/:userId", async (req, res) => {
        const { courseId, userId } = req.params;
        const status = await enrollmentsDao.unenrollUserFromCourse(
            userId,
            courseId
        );
        res.send(status);
    });

    const findEnrollmentsForUser = (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const enrollments = enrollmentsDao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    };
    app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
}
