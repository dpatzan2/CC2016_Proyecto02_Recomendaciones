// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('clave_secreta');


export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        console.log("Token no encontrado");
        return NextResponse.redirect(new URL('/auth/singin', request.url));
    }

    console.log("Token recibido:", token);
    console.log("Clave secreta:", SECRET_KEY);

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        console.log("Token verificado correctamente", payload);
        return NextResponse.next();
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return NextResponse.redirect(new URL('/auth/singin', request.url));
    }
}

export const config = {
    matcher: ['/formulario/:path*'],
};
