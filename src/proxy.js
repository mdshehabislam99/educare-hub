import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req) {
    const url = req.nextUrl.clone();

    // Only protect /dashboard routes
    if (url.pathname.startsWith("/dashboard")) {
        const token = req.cookies.get("token")?.value;

        // If token missing → redirect to login
        if (!token) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }

        try {
            // Verify custom JWT token using jose (Edge Runtime compatible)
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (err) {
            // Invalid token → redirect to login
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    }

    // For all other routes → allow
    return NextResponse.next();
}

// Apply middleware only to /dashboard routes
export const config = {
    matcher: ["/dashboard/:path*"],
};
