import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function proxy(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // 1. If not logged in and trying to access protected routes
    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // 2. Role-based Redirection for base /dashboard
    if (token && pathname === "/dashboard") {
        if (token.role === "instructor") {
            return NextResponse.redirect(new URL("/dashboard/instructor", req.url));
        }
        return NextResponse.redirect(new URL("/dashboard/student", req.url));
    }

    // 3. Protect Instructor Routes
    if (pathname.startsWith("/dashboard/instructor") && token?.role !== "instructor") {
        return NextResponse.redirect(new URL("/dashboard/student", req.url));
    }

    // 4. Protect Student Routes (Optional but good)
    if (pathname.startsWith("/dashboard/student") && token?.role !== "student") {
        if (token?.role === "instructor") {
            return NextResponse.redirect(new URL("/dashboard/instructor", req.url));
        }
    }

    return NextResponse.next();
}

// Apply middleware only to /dashboard routes
export const config = {
    matcher: ["/dashboard/:path*"],
};
