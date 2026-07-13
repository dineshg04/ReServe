import { NextResponse } from 'next/server';
import BadRequestError from '../../../../errors/badRequestErrror';
import NotFoundError from '../../../../errors/notFoundError';
import UnAuthorizedError from '../../../../errors/unauthorizedError';
import User from '../../../../models/user';
import Token from '../../../../models/token';
import { dbConnect } from '../../../../utils/dbConnect';
const crypto = require('crypto');
import { sendCookies } from '../../../../utils/cookies';

export async function POST(request) {
  const { email, password } = await request.json();
  await dbConnect();
  if (!email || !password) {
    return BadRequestError('Must Provide both email and password');
  }
  const user = await User.findOne({ email: email }).select(
    '_id name email password'
  );

  if (!user) {
    return NotFoundError('User Not Found');
  }
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return UnAuthorizedError('Credients in Invalid');
  }

  const cryptoRefToken = crypto.randomBytes(40).toString('hex');

  //Creating Unique refresh token to user
  const refToken = await Token.create({
    refreshToken: cryptoRefToken,
    user: user._id,
  });

  //Destructure RefreshHash and UserId
  const refreshTokenUser = {
    refreshToken: refToken.refreshToken,
    user: refToken.user,
  };

  sendCookies(user, refreshTokenUser);
  return NextResponse.json({ user }, { status: 200 });
}
