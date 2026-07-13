import { cookiesParse } from '../../../../utils/cookies';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const isAuthenticated = await cookiesParse(request);
  console.log('isAuthenticated', isAuthenticated);

  if (isAuthenticated) {
    return NextResponse.json({ status: true }, { status: 200 });
  } else {
    return NextResponse.json({ status: false }, { status: 200 });
  }
}
