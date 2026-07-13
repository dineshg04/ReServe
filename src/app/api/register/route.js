import { NextResponse } from 'next/server';
import { dbConnect } from '../../../../utils/dbConnect';
import BadRequestError from '../../../../errors/badRequestErrror';
import { createJWT } from '../../../../utils/jwt';
import { sendCookies } from '../../../../utils/cookies';
const User = require('../../../../models/user');
const Token = require('../../../../models/token');
const crypto = require('crypto');

export async function POST(request) {
  const data = await request.json();

  await dbConnect();
  const isEmail = await User.findOne({ email: data.email });
  if (isEmail) {
    return BadRequestError('Email Already Exists');
  }

  const user = await User.create(data);

  //Destructing userId,name and Email
  const accessTokenUser = {
    userId: user._id,
    name: user.name,
    email: user.email,
  };

  //Creating RefreshToken Hash Value
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

  sendCookies(accessTokenUser, refreshTokenUser);

  return NextResponse.json({ accessTokenUser }, { status: 200 });
}
