import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
}

export function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = Database;
    const initialLength = enrollments.length;
    Database.enrollments = enrollments.filter(
        (enrollment) =>
            !(enrollment.user === userId && enrollment.course === courseId)
    );
    return Database.enrollments.length < initialLength;
}

export function findEnrollmentsForUser(userId) {
    const { enrollments } = Database;
    const userEnrollments = enrollments.filter(
        (enrollment) => enrollment.user === userId
    );
    return userEnrollments;
}
