import { NextResponse } from 'next/server';

const NotFoundError = (errMsg) => {
  return NextResponse.json({ error: errMsg }, { status: 404 });
};

export default NotFoundError;
