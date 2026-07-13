import { NextResponse } from 'next/server';

export async function middleware(request) {
  // const isAuthenticated = await cookiesParse(request)
  console.log(request.nextUrl.pathname);
  if (request.cookies.get('refreshToken')?.value) {
    if (request.nextUrl.pathname.startsWith('/register'))
      return NextResponse.redirect(new URL('/home', request.url));
  }

  if (request.cookies.get('refreshToken')?.value) {
    if (request.nextUrl.pathname.startsWith('/login'))
      return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/register', '/login'],
};
