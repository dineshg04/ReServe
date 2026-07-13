'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Cart from '../../../components/Cart';
import Header from '../../../components/Header';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default function CartPage() {
  const currentPath = usePathname();

  console.log('PathName', currentPath);
  const [currentCart, setCurrentCart] = useState({});
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const cartDbFetch = async () => {
      try {
        const { data } = await axiosApi.get('/cart/get-cart');
        console.log('Fetch', data[0]);
        setCurrentCart(data[0]);
      } catch (error) {
        console.log('Cart Updating Error', error);
      }
    };
    cartDbFetch();
  }, [cart]);

  useEffect(() => {
    if (currentPath === '/cart') {
      setIsShow(true);
    }
  }, []);

  console.log('Cur', currentCart);
return(
  <>
    <Cart/>
  </>
)
};

