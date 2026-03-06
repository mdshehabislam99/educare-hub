import { connectToDatabase } from "@/lib/mongoConnect";
import { MOCK_COURSES } from "@/constants";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db = await connectToDatabase();
        const coursesCollection = db.collection("courses");

        // Fetch all courses
        let courses = await coursesCollection.find({}).toArray();

        // Seed the database if it's empty
        if (courses.length === 0) {
            console.log("Seeding database with mock courses...");
            await coursesCollection.insertMany(MOCK_COURSES);
            courses = await coursesCollection.find({}).toArray();
        }

        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        console.error("Course fetch error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const courseData = await req.json();
        const db = await connectToDatabase();
        const coursesCollection = db.collection("courses");

        const result = await coursesCollection.insertOne({
            ...courseData,
            createdAt: new Date(),
        });

        return NextResponse.json(
            { message: "Course created successfully", id: result.insertedId },
            { status: 201 }
        );
    } catch (error) {
        console.error("Course creation error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
