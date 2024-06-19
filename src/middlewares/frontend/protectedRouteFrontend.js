import { checkToken } from "@/app/api/helpers/jwt_token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const paths = [
    '/dashboard',
    '/user-management/role-management',
];
export const protectedRoute = async (request) => {
    const { pathname } = request.nextUrl;
    if (paths.includes(pathname)) {
        if (cookies().get('token')) {
            const checkJWT = await checkToken(cookies().get('token').value);
            if (cookies().get('token') && cookies().get('token').value && checkJWT) {
                return NextResponse.next();
            } else {
                return NextResponse.redirect(new URL('/login', request.url))
            }
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    } else {
        return NextResponse.next();
    }
}