import { NextResponse } from 'next/server';
import { dbConnect } from '../../../../utils/dbConnect';
import { cookiesParse } from '../../../../utils/cookies';
import UnAuthorizedError from '../../../../errors/unauthorizedError';
import Cart from '../../../../models/cart';

export async function POST(request) {
  const isAuthenticated = await cookiesParse(request);

  if (!isAuthenticated) {
    return UnAuthorizedError('Not Authorized ');
  }
  try {
    await dbConnect();
    let responseCart = {};
    const { productId, quantity, restaurantId } = await request.json();
    const cart = await Cart.findOne({ userId: isAuthenticated._id });
    if (cart) {
      const productIndex = cart.items.findIndex(
        (i) => i.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.items[productIndex].quantity += quantity;
        if (cart.items[productIndex].quantity === 0) {
          cart.items.splice(productIndex, 1);
        }
        cart.total += quantity;
        cart.fromrestaurant = restaurantId;
      } else {
        cart.items.push({ productId, quantity });
        cart.total += quantity;
        cart.fromrestaurant = restaurantId;
      }
      
      if(cart.items.length === 0) {
       await Cart.findOneAndDelete({ _id : cart._id})
      }
      await cart.save();
      responseCart = cart;
      console.log('Cart updated successfully');
    } else {
      const cartContent = {
        userId: isAuthenticated._id,
        items: [{ productId, quantity }],
        total: 1,
        fromrestaurant: restaurantId,
      };
      const newCart = await Cart.create(cartContent);
      responseCart = newCart;
      console.log('New cart created and product added');
    }
    return NextResponse.json(responseCart, { status: 200 });
  } catch (error) {
    console.log('Error API', error);
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
