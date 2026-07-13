'use client';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import Image from 'next/image';
import Header from './Header';
import Banner from './Banner';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const Cart = ({ cart }) => {
  //To Identify Pathname
  const currentPath = usePathname();

  const [dbCart, setDbCart] = useState({});
  const [currentCart, setCurrentCart] = useState({});
  const [productDetails, setProductDetails] = useState({});
  const resId = useRef('');

  const [isShow, setIsShow] = useState(false);

  //finding finaltotal

  const calculateFinalTotal = () => {
    if (!dbCart || !dbCart.items) return 0; // Handle empty cart or missing data

    const total = dbCart.items.reduce((acc, item) => {
      const matchingProduct = productDetails.find(
        (product) => product._id === item.productId
      );
      if(matchingProduct) return acc + (item.quantity * matchingProduct.price);
      else return acc;
    }, 0);

    return total;
  };

  // total unique items
  const calculateUniqueItems = () => {
    return dbCart.items ? dbCart.items.length : 0;
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

  //Fetch Cart Data from DB Whenever Cart state changes
  useEffect(() => {
    const cartDbFetch = async () => {
      try {
        console.log('Updating.....');
        const { data } = await axiosApi.get('/cart/get-cart');
        resId.current = data.fromrestaurant;
        const productData = await axiosApi.get(
          `/food/get-food-restaurant/${data.fromrestaurant}`
        );
        setDbCart(data);
        setProductDetails(productData.data);
      } catch (error) {
        console.log('Cart Updating Error', error);
      }
    };
    console.log('Cart', cart);
    //Fetch only When Cart has Something
    if (!isEmpty(cart) || cart === undefined) {
      cartDbFetch();
    }
  }, [cart]);

  //Display the Cart Component Only when the Pathname is /cart
  useEffect(() => {
    if (currentPath === '/cart') {
      setIsShow(true);
    }
  }, []);

  //Update the Current Cart
  useEffect(() => {
    const updateDbCart = async () => {
      try {
        const { data } = await axiosApi.post('/cart', currentCart);
      } catch (error) {
        console.log('Error Updating Cart', error);
      }
    };

    //Update Only when the Current Cart is Updated
    if (!isEmpty(currentCart)) {
      updateDbCart();
    }
  }, [currentCart]);

  //Handle Cart Update
  const handleQuantityUpdate = (id, quantity) => {
    console.log(resId.current);
    setCurrentCart({
      productId: id,
      quantity: quantity,
      restaurantId: resId.current,
    });

    //Updating Db cart immediately to reflect the updated Quantity on page
    setDbCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.productId === id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ),
    }));
  };

  //console log 
  console.log(productDetails);


  return (
    <>
    <Header totalUniqueItems={calculateUniqueItems()}/>     
    <Banner />
    <main>
      {isShow &&
        (isEmpty(dbCart) ? (
          <div>Empty Cart</div>
        ) : (
          <div className="py-4 lg:px-64">
            <div className="text-3xl font-semibold text-black pl-9 py-4 rounded-md text-center">
              Cart Products
            </div>
            {console.log(dbCart.items.length)}
            {dbCart.items?.map((e, i) => {
              const matchingProduct = productDetails.find(
                (product) => product._id === e.productId
              );
              if (e.quantity > 0 ) {
                return (
                  <div key={i} className="container mx-auto mt-3   p-2 border-l-4 border-green-700  bg-gray-50 ">
                    <div className="flex flex-col md:flex-row justify-between items-center  space-y-4 md:space-y-0 md:space-x-10">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={matchingProduct.imageurl}
                          height={100}
                          width={100}
                          alt={matchingProduct.name}
                          className='rounded-md'
                        />
                        <div className="text-2xl  " >
                          <div>{matchingProduct.name}</div>

                        </div>
                      </div>
                      <div className="flex items-center space-x-4 ">
                        <div className="flex items-center space-x-2 mr-3 ">
                          <button className="px-2 bg-green-700 text-slate-50 rounded-sm" onClick={() => handleQuantityUpdate(e.productId, -1)}>
                            -
                          </button>
                          <div className="px-2 bg-slate-100"> {e.quantity}</div>
                          <button className="px-2 bg-green-700 text-slate-50 rounded-sm" onClick={() => handleQuantityUpdate(e.productId, 1)}>
                            +
                          </button>
                        </div>
                        <div className="text-2xl p-3 w-20">
                          {/* ₹{e.quantity * matchingProduct.price} */}
                          ₹{matchingProduct.price}
                        </div>
                      </div>
                    </div>
                  </div>
                
                );
              }
              return null; 
            })}

            <div className="flex justify-end p-4 text-3xl md:mr-[105px] lg:mr-auto md:ml-28 sm:mr-16 ">
              <span className="">Total:</span>
              <div className="pl-3 ml-7 font-semibold mb-16">₹{ calculateFinalTotal() }</div>
            </div>
          </div>
        ))}
    </main>
    </>
  );
};



export default Cart;

