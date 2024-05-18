
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'clave_secreta';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/auth/singin', request.url));
    }

    try {
        jwt.verify(token, SECRET_KEY);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/auth/singin', request.url));
    }
}

export const config = {
    matcher: ['/formulario/:path*'],
};
