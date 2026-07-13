'use server';
import { NextResponse } from 'next/server';
import { cookiesParse } from '../../../../../utils/cookies';
import UnAuthorizedError from '../../../../../errors/unauthorizedError';
import { dbConnect } from '../../../../../utils/dbConnect';
import BadRequestError from '../../../../../errors/badRequestErrror';
import { writeFile } from 'fs';
const path = require('path');
import Product from '../../../../../models/product';
import Restaurant from '../../../../../models/restaurant';

export async function POST(request) {
  //Check Whether is logged in Or not
  const isAuthenticated = await cookiesParse(request);

  if (!isAuthenticated || isAuthenticated.role === 'user') {
    return UnAuthorizedError('Not Authorized');
  }

  //Connect To Database
  try {
    await dbConnect();

    const restaurant = await Restaurant.findOne({ user: isAuthenticated._id });
    //Paring the data from client
    const data = await request.formData();

    const file = data.get('file');
    if (!file) {
      return BadRequestError('Must Include File');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const dbProduct = {
      name: await data.get('name'),
      description: await data.get('description'),
      price: await data.get('price'),
      imageurl: `/${file.name}`,
      restaurant: restaurant._id,
    };

    const product = await Product.create(dbProduct);

    //Move the incoming File(Image) into the Public Folder
    const imgPath = path.join(
      __dirname,
      '../../../../../../public/' + `${file.name}`
    );
    await writeFile(imgPath, buffer, (err) => console.log(err));

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.log('ErrorNode', error);

    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
