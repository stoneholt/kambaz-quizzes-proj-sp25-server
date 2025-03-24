import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.post("/api/courses/:courseId/:userId/enroll", async (req, res) => {
        const { courseId, userId } = req.params;
        const status = await enrollmentsDao.enrollUserInCourse(
            userId,
            courseId
        );
        res.send(status);
    });

    app.post("/api/courses/:courseId/:userId/unenroll", async (req, res) => {
        const { courseId, userId } = req.params;
        const status = await enrollmentsDao.unenrollUserInCourse(
            userId,
            courseId
        );
        res.send(status);
    });
}
