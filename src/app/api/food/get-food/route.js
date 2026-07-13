'use server'

import { NextResponse } from 'next/server';
import Product from '../../../../../models/product';
import { dbConnect } from '../../../../../utils/dbConnect';

export async function GET() {
  await dbConnect();
  try {
    const allProducts = await Product.find({});
    return NextResponse.json(allProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: error }, { status: 500 });
  }
}
