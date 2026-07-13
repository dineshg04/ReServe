import { NextResponse } from 'next/server';
import UnAuthorizedError from '../../../../../errors/unauthorizedError';
import { cookiesParse } from '../../../../../utils/cookies';
import { dbConnect } from '../../../../../utils/dbConnect';
import Cart from '../../../../../models/cart';

export async function GET(request) {
  const isAuthenticated = await cookiesParse(request);

  if (!isAuthenticated) {
    return UnAuthorizedError('Not Authenticated');
  }

  try {
    await dbConnect();
    const allCart = await Cart.findOne({ userId: isAuthenticated._id });
    return NextResponse.json(allCart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
