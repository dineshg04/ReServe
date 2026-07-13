'use server';

import { NextResponse } from 'next/server';
import { dbConnect } from '../../../../../utils/dbConnect';
import Restaurant from '../../../../../models/restaurant';

export async function GET() {
  await dbConnect();
  try {
    const allRestaurants = await Restaurant.find({});
    return NextResponse.json(allRestaurants, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: error }, { status: 500 });
  }
}
