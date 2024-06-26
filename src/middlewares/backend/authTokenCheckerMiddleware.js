'use server'
import { checkToken } from "@/app/api/helpers/jwt_token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const paths = [
    '/api/routes/user-management-api/role-management',
    '/api/routes/user-management-api/users',
    '/api/routes/book-management-api/book-management',
    '/api/routes/book-management-api/book-timeline',
]
export const authTokenChecker = async (request) => {
    const { pathname } = request.nextUrl;
    const getToken = request.headers.get('Authorization')
    if (paths.includes(pathname)) {
        const isTokenCorrect = await checkToken(getToken);
        if (isTokenCorrect === null) {
            return new NextResponse(JSON.stringify({
                "msg": 'Un-Authorized',
                "status": 0,
            }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                })

        }
        return NextResponse.next();
    }
    return NextResponse.next();
}