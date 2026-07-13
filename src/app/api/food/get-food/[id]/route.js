'use server';
import { NextResponse } from 'next/server';
import Product from '../../../../../../models/product'
import { dbConnect } from '../../../../../../utils/dbConnect';

export async function GET(request, { params }) {
  await dbConnect();
  console.log(params.id);

  const singleProduct = await Product.findOne({ _id: params.id });
  return NextResponse.json(singleProduct, { status: 200 });
}
