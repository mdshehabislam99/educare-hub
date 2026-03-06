import { connectToDatabase } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const db = await connectToDatabase();
        const coursesCollection = db.collection("courses");

        let course;
        // Try both ObjectId and string ID (for mock data compatibility)
        try {
            course = await coursesCollection.findOne({ _id: new ObjectId(id) });
        } catch (e) {
            // If it's not a valid ObjectId, search by string ID
            course = await coursesCollection.findOne({ id: id });
        }

        if (!course) {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        console.error("Course fetch error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
