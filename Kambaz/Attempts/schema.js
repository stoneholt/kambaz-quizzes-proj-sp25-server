import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        _id: String,
        timestamp: {
            type: Date,
            default: Date.now,
            required: true,
        },
        timestamp: {
            type: Date,
        },
        user_id: {
            type: String,
            ref: "UserModel",
        },
        quiz_id: {
            type: String,
            ref: "QuizModel",
        },
        answers: {
            type: Map,
            of: mongoose.Schema.Types.Mixed, // allows string, boolean, etc.
        },
        score: {
            type: Number,
            min: 0,
        },
    },
    {
        collection: "attempts",
    }
);

export default schema;
