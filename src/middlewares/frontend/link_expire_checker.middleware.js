import { NextResponse } from "next/server";

const paths = [
    '/externals/generate-password/'
]
export const checkLinkExpire = async (request) => {
    const { pathname } = request.nextUrl;
    const redirectUrl = new URL('/externals/link-expired', request.url);
    let flag = false;
    paths.forEach(element => {
        if (pathname.startsWith(element)) {
            const getParams = pathname.replace(element, "").split("/")
            if (getParams.length !== 3 || getParams[2] < Date.now()) {
                flag = true;
            }
        }
    });
    if (flag == true)
        return NextResponse.redirect(redirectUrl);
    else
        return NextResponse.next();
}
