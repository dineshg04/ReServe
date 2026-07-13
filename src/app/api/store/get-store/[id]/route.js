'use server';
import { NextResponse } from 'next/server';
import { dbConnect } from '../../../../../../utils/dbConnect';
import Restaurant from '../../../../../../models/restaurant';

export async function GET(request, { params }) {
  console.log(params.id);
  try {
    await dbConnect();
    const singleRestaurant = await Restaurant.findOne({ _id: params.id });
    return NextResponse.json(singleRestaurant, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
