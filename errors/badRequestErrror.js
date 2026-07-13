import { NextResponse } from 'next/server';

const BadRequestError = (errMsg) => {
  return NextResponse.json({ error: errMsg }, { status: 400 });
};

export default BadRequestError;
