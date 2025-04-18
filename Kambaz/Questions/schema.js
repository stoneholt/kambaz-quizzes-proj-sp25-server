import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        _id: String,
        quizID: {
            type: String,
            ref: "QuizModel",
        },
        title: String,
        type: {
            type: String,
            enum: ["multiple-choice", "true-false", "fill-in-the-blank"],
            required: true,
        },
        points: Number,
        answers: {
            type: [String],
            default: [],
            required: true,
        },
        correctAnswer: {
            type: String,
            required: true,
        },
        description: String,
    },
    {
        collection: "questions",
    }
);

export default schema;
