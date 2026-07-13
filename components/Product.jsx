'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cart from './Cart';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

function Product({ product, resId, setUniqueProducts, dbCart, setDbCart,role }) {
  // const [dbCart, setDbCart] = useState({});
  const [cart, setCart] = useState({});
  const isFirstRender = useRef(true);

  const handleCardAdd = (id, quantity) => {
    console.log('Handle', dbCart);
    if (isEmpty(dbCart)) {
      setDbCart({ items: [{ productId: id, quantity: quantity }] });
    } else {
      const isExisting = dbCart.items.find((item) => item.productId === id);
      setDbCart((prevCart) => ({
        items: isExisting
          ? prevCart.items.map((item) =>
              item.productId === id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                  }
                : item
            )
          : [...prevCart.items, { productId: id, quantity: quantity }],
      }));
    }
    setCart({ productId: id, quantity: quantity, restaurantId: resId });
  };

  //To Check is Object is Empty or not
  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  const calculateUniqueItems = async () => {
    const uniqueProducts = dbCart?.items ? dbCart.items.length : 0;
    setUniqueProducts(uniqueProducts);
  };

  useEffect(() => {
    const cartDbFetch = async () => {
      try {
        const { data } = await axiosApi.get('/cart/get-cart');
        setDbCart(data);
      } catch (error) {
        console.log('Cart Updating Error', error);
      }
    };
    //Fetch only When Cart has Something

    console.log('IsFirst', isFirstRender.current);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      cartDbFetch();
    }
  }, []);

  //Update DB When change is made
  useEffect(() => {
    const updateDbCart = async () => {
      try {
        const { data } = await axiosApi.post('/cart', cart);
      } catch (error) {
        console.log('Error Updating Cart', error);
      }
    };
    if (!isEmpty(cart)) {
      updateDbCart();
    }
  }, [cart]);

  useEffect(() => {
    calculateUniqueItems();
  }, [dbCart]);

  const currentCartQuantity = (currProductId) => {
    let resultQuantity;
    if (!isEmpty(dbCart)) {
      resultQuantity = dbCart.items.find((e) => e.productId === currProductId);
    }
    return resultQuantity
      ? resultQuantity.quantity !== 0
        ? resultQuantity.quantity
        : 'Add'
      : 'Add';
  };

  return (
    <div>
      <li
        className={`${
          role === 'box'
            ? 'flex flex-col-reverse w-[300px] h-[450px]' // Add w-full to ensure it takes full available width
            : 'flex items-center justify-between w-full' // Same here for consistency
        } space-x-4 border-b-2 hover:shadow-xl rounded-lg p-4 shadow-md border-[1px] border-gray-200`}
      >
        <div
          className={`${
            role === 'box' ? 'h-[250px]' : 'flex flex-col'
          } flex flex-col w-full md:w-2/3 gap-3`}
        >
          {' '}
          {/* Adjusted width to full in small screens */}
          <p className="font-semibold text-2xl ">{product.name}</p>
          <div
            className={`${role === 'box' ? 'w-full' : 'flex justify-between'}`}
          >
            {' '}
            {/* Set width full for role === 'box' */}
            <div className="flex gap-2 items-center">
              <span>{product.description}</span>
            </div>
            <div className="space-x-2 whitespace-nowrap">
              {currentCartQuantity(product._id) !== 'Add' && (
                <button
                  className="px-2 bg-green-700 text-slate-50 rounded-sm"
                  onClick={() => handleCardAdd(product._id, -1)}
                >
                  -
                </button>
              )}
              <button
                /* className="mr-12 p-1 px-5 bg-green-700 rounded-full text-white font-semibold" */
                className="px-2 bg-slate-100"
                onClick={() => handleCardAdd(product._id, 1)}
              >
                {`${currentCartQuantity(product._id)}`}
              </button>
              {currentCartQuantity(product._id) !== 'Add' && (
                <button
                  className="px-2 bg-green-700 text-slate-50 rounded-sm"
                  onClick={() => handleCardAdd(product._id, 1)}
                >
                  +
                </button>
              )}
            </div>
          </div>
          <p>₹{product.price}</p>
        </div>
        <div
          className={`${
            role === 'box' ? 'w-full flex justify-center' : 'flex justify-end'
          }`}
        >
          {' '}
          {/* Centered image for 'box' */}
          <Image
            src={product.imageurl}
            width={160}
            height={160}
            alt={product.name}
            className="h-40 w-40 object-cover rounded-xl"
          />
        </div>
      </li>
      {/* <Cart cart={cart} /> */}
    </div>
  );
}

export default Product;
