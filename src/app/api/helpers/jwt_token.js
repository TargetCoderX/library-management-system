/* for next it is josh not jwt */
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const createToken = async (data) => {
    return new SignJWT({ data })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('2d')
        .sign(secret);
}

export const checkToken = async (token) => {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (err) {
        console.error('Token verification failed:', err); // Debugging log
        return null; // Return null if token verification fails
    }
}
