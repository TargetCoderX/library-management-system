import { checkToken } from "@/app/api/helpers/jwt_token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const paths = [
    '/admin/login',
    '/login',
];
export const loginChecker = async (request) => {
    const { pathname } = request.nextUrl;
    if (paths.includes(pathname)) {
        if (cookies().get('token')) {
            const checkJWT = await checkToken(cookies().get('token').value);
            if (cookies().get('token') && cookies().get('token').value && checkJWT) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            } else {
                return NextResponse.next();
            }
        } else {
            return NextResponse.next();
        }
    } else {
        return NextResponse.next();
    }
}