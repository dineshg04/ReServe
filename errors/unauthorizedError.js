import { NextResponse } from 'next/server';

const UnAuthorizedError = (errMsg) => {
  return NextResponse.json({ error: errMsg }, { status: 401 });
};

export default UnAuthorizedError;
