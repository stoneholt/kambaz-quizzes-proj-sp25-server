import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        _id: String,
        course: { type: String, ref: "CourseModel" },
        qids: [
            {
                type: String,
                ref: "QuestionsModel",
            },
        ],
        title: String,
        description: String,
        type: {
            type: String,
            enum: [
                "Graded Quiz",
                "Practice Quiz",
                "Graded Survey",
                "Ungraded Survey",
            ],
        },
        points: Number,
        group: {
            type: String,
            enum: ["Quizzes", "Exams", "Assignments", "Project"],
        },
        shuffleAnswers: {
            type: Boolean,
            default: true,
        },
        timeLimit: {
            type: Number,
            default: 20,
        },
        multipleAttempts: {
            type: Boolean,
            default: false,
        },
        numberOfAttempts: {
            type: Number,
            default: 1,
        },
        showCorrectAnswers: Boolean,
        accessCode: String,
        oneQuestionAtATime: {
            type: Boolean,
            default: true,
        },
        webcamRequired: {
            type: Boolean,
            default: false,
        },
        lockAfterAnswering: {
            type: Boolean,
            default: false,
        },
        availableDate: Date,
        untilDate: Date,
        dueDate: Date,
        published: {
            type: Boolean,
            default: false,
        },
    },
    {
        collection: "quizzes",
    }
);

export default schema;
