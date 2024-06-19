import { NextResponse } from "next/server";
import { loginChecker } from "./middlewares/frontend/loginchecker_middleware";
import { protectedRoute } from "./middlewares/frontend/protectedRouteFrontend";
import { authTokenChecker } from "./middlewares/backend/authTokenCheckerMiddleware";

export async function middleware(request) {
    const middlewares = [
        loginChecker,
        protectedRoute,
        authTokenChecker,
    ];

    for (const mw of middlewares) {
        const response = await mw(request);
        if (!(response instanceof NextResponse) || response.status !== 200) {
            return response;
        }
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/:path*',
}