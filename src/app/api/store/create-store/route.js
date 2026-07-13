import { NextResponse } from 'next/server';
import Restaurant from '../../../../../models/restaurant';
import { dbConnect } from '../../../../../utils/dbConnect';
const path = require('path');
import { writeFile } from 'fs';
import { cookiesParse } from '../../../../../utils/cookies';
import UnAuthorizedError from '../../../../../errors/unauthorizedError';
import BadRequestError from '../../../../../errors/badRequestErrror';

export async function POST(request) {
  const isAuthenticated = await cookiesParse(request);
  console.log('IsAuthorized', isAuthenticated);

  if (!isAuthenticated || isAuthenticated.role === 'user') {
    return UnAuthorizedError('Not Authorized');
  }

  try {
    await dbConnect();

    const isAlreadyCreated = await Restaurant.findOne({
      user: isAuthenticated._id,
    });

    if (isAlreadyCreated) {
      return BadRequestError('Restaurant Already Created');
    }

    //Paring the data from client
    const data = await request.formData();
    const file = data.get('file');
    if (!file) {
      return BadRequestError('Must Include File');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('Current', __dirname);

    //Move the incoming File(Image) into the Public Folder
    const imgPath = path.join(
      __dirname,
      '../../../../../../public/' + `${file.name}`
    );
    await writeFile(imgPath, buffer, (err) => console.log(err));

    const dbRestaurant = {
      name: await data.get('name'),
      description: await data.get('description'),
      location: await data.get('location'),
      address: await data.get('address'),
      pickuptime: await data.get('pickuptime'),
      mobileno: await data.get('mobileno'),
      imageurl: `/${file.name}`,
      user: isAuthenticated._id,
    };

    const product = await Restaurant.create(dbRestaurant);

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.log('ErrorNode', error);

    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
