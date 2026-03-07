import { connectToDatabase } from "@/lib/mongoConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = await connectToDatabase();
        const cartCollection = db.collection("cart");
        const coursesCollection = db.collection("courses");
        const userId = session.user.id || session.user.email;

        const cartItems = await cartCollection.find({ userId }).toArray();

        if (cartItems.length === 0) {
            return NextResponse.json(
                {
                    count: 0,
                    items: [],
                },
                { status: 200 }
            );
        }

        const courseIds = cartItems.map((item) => item.courseId);
        const courses = await coursesCollection.find({
            $or: [
                {
                    _id: {
                        $in: courseIds.map((id) => {
                            try {
                                return new ObjectId(id);
                            } catch (e) {
                                return id;
                            }
                        }),
                    },
                },
                { id: { $in: courseIds } },
            ],
        }).toArray();

        const mergedItems = cartItems.map((item) => {
            const course = courses.find(
                (c) => c._id?.toString() === item.courseId || c.id === item.courseId
            );
            return {
                ...item,
                course,
            };
        }).filter((item) => item.course?.title);

        return NextResponse.json(
            {
                count: mergedItems.length,
                items: mergedItems,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Cart fetch error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { courseId } = await req.json();

        if (!courseId) {
            return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
        }

        const db = await connectToDatabase();
        const coursesCollection = db.collection("courses");
        const cartCollection = db.collection("cart");
        const userId = session.user.id || session.user.email;

        let course = null;
        try {
            course = await coursesCollection.findOne({ _id: new ObjectId(courseId) });
        } catch (e) {
            course = await coursesCollection.findOne({ id: courseId });
        }

        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        const normalizedCourseId = course._id?.toString() || course.id || courseId;

        const alreadyEnrolled = await db.collection("enrollments").findOne({
            userId,
            courseId: normalizedCourseId,
        });

        if (alreadyEnrolled) {
            return NextResponse.json({ error: "You are already enrolled in this course" }, { status: 400 });
        }

        const existingCartItem = await cartCollection.findOne({
            userId,
            courseId: normalizedCourseId,
        });

        if (existingCartItem) {
            return NextResponse.json({ message: "Course already in cart" }, { status: 200 });
        }

        await cartCollection.insertOne({
            userId,
            courseId: normalizedCourseId,
            addedAt: new Date(),
        });

        return NextResponse.json({ message: "Added to cart" }, { status: 201 });
    } catch (error) {
        console.error("Cart add error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { courseId } = await req.json();

        if (!courseId) {
            return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
        }

        const db = await connectToDatabase();
        const cartCollection = db.collection("cart");
        const userId = session.user.id || session.user.email;

        const result = await cartCollection.deleteOne({
            userId,
            courseId,
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Removed from cart" }, { status: 200 });
    } catch (error) {
        console.error("Cart remove error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
