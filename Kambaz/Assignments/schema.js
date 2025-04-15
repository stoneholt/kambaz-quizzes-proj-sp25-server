import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        course: { type: String, ref: "CourseModel" },
        availableDate: Date,
        dueDate: Date,
        untilDate: Date,
        points: Number,
        group: String,
        submissionType: String,
        gradeType: String,
        description: String,
        assignTo: String,
    },
    { collection: "assignments" }
);
export default schema;
