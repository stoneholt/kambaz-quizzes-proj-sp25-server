import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const deleted = await assignmentsDao.deleteAssignment(assignmentId);
        if (deleted) {
            res.sendStatus(204);
        }
    });

    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const updated = await assignmentsDao.updateAssignment(
            assignmentId,
            assignmentUpdates
        );
        if (updated) {
            res.sendStatus(204);
        }
    });
}
