const { cookies } = require('next/headers');
import { NextResponse } from 'next/server';
import { cookiesParse } from '../../../../utils/cookies';
import BadRequestError from '../../../../errors/badRequestErrror';
const Token = require('../../../../models/token');

export async function GET(request) {
  const isAuthorized = await cookiesParse(request)
  
  if(!isAuthorized){
    return BadRequestError('Not Logged In')
  }
  const tokenDelete = await Token.findOneAndDelete({ user: isAuthorized._id });
  cookies().delete('refreshToken');
  cookies().delete('accessToken');
  return NextResponse.json({ msg: 'SuccessFully Logged Out' }, { status: 200 });
}
