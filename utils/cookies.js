const { cookies } = require('next/headers');
const { createJWT, verifyJWT } = require('./jwt');
const { dbConnect } = require('./dbConnect');
const Token = require('../models/token');
const User = require('../models/user');
const { default: UnAuthorizedError } = require('../errors/unauthorizedError');

const sendCookies = (accessTokenUser, refreshTokenUser) => {
  const accessToken = createJWT(accessTokenUser);
  const refreshToken = createJWT(refreshTokenUser);
  cookies().set('accessToken', accessToken, {
    expires: new Date(Date.now() + 1000 * 20),
  });

  cookies().set('refreshToken', refreshToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
};

const cookiesParse = async (request) => {
  const accessToken = request.cookies.get('accessToken')?.value;
  console.log('access', accessToken);
  const refreshToken = request.cookies.get('refreshToken')?.value;
  console.log('Ref', refreshToken);

  try {
    await dbConnect();
    if (accessToken) {
      const { payload } = verifyJWT(accessToken);
      console.log('Normal', payload);
      return payload;
    }

    const decodedRefToken = verifyJWT(refreshToken);
    const existingToken = await Token.findOne({
      user: decodedRefToken.payload.user,
    }).select('refreshToken isValid user');
    if (!existingToken || !existingToken?.isValid) {
      throw UnAuthorizedError('Unauthorized Access');
    }

    const tokenUser = await User.findOne({ _id: existingToken.user }).select(
      '_id name email role'
    );
    console.log('TokenUser', tokenUser);
    sendCookies(tokenUser, existingToken);
    return tokenUser;
  } catch (error) {
    return false;
  }
};

module.exports = { sendCookies, cookiesParse };
