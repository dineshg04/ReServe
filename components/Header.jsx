'use client';
import { ShoppingCart, Menu } from 'feather-icons-react';
import Link from 'next/link';
import { Search } from 'react-feather';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

function Header({ totalUniqueItems }) {
  const [isVisible, setIsVisible] = useState(true);
  const [restaurant, setRestaurant] = useState('');
  const [restaurantData, setRestaurantData] = useState([]);
  const hotelListRef = useRef(null);

  const handleLogOut = async () => {
    try {
      await axiosApi.get('/logout');
    } catch (error) {
      throw new Error('Error Logging Out', error);
    }
  };

  function handleSearching(e) {
    if (hotelListRef.current) {
      hotelListRef.current.style.display =
        e.target.value === '' ? 'none' : 'inline-block';
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const { data } = await axiosApi.get('/store/get-store');
        setRestaurantData(data);
      } catch (error) {
        throw new Error('Error Fetching Data ', error);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const isUserExists = async () => {
      const { data } = await axiosApi.get('/currentUser');
      setIsVisible(data.status);
    };

    isUserExists();
  }, []);

  return (
    <nav className="flex items-center justify-between bg-white h-14 px-5 shadow-md sm:px-4 lg:px-8">
      <h1 className="text-green-600 font-bold text-xl sm:text-2xl">Re-Serve</h1>

      <div className="flex w-full sm:flex-1 lg:ml-12 relative">
        <Search
          color="darkgray"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 lg:h-5 lg:w-5 md:h-5 md:w-5 sm:h-4 sm:w-4"
          size={3}
        />
        <input
          type="text"
          placeholder="Search Re-Serve"
          className="w-3/4 pl-10 pr-4 py-2 text-sm bg-slate-100 text-black rounded-lg focus:outline-none"
          onChange={(e) => {
            setRestaurant(e.target.value);
            handleSearching(e);
          }}
        />
        <div
          ref={hotelListRef}
          className="absolute mt-2 w-full top-10 bg-white rounded-lg shadow-lg z-40 hidden max-h-72 overflow-y-scroll"
        >
          {restaurantData
            .filter((hotel) =>
              hotel.name.toLowerCase().includes(restaurant.toLowerCase())
            )
            .map((item) => (
              <Link
                href={`/home/${item._id}`}
                className="flex items-center gap-4 p-2 border-b hover:bg-slate-100 rounded-lg"
                key={item._id}
              >
                <Image
                  src={item.imageurl}
                  alt={item.name}
                  width={150}
                  height={100}
                  className="rounded-lg"
                />
                <span className="text-gray-700">{item.name}</span>
              </Link>
            ))}
        </div>
        <input
          type="text"
          placeholder="Location"
          className="ml-2 py-2 px-3 text-sm bg-slate-100 text-gray-400 rounded-lg focus:outline-none grow"
        />
      </div>

      <div className="flex items-center sm:ml-auto">
        <Link
          href="/cart"
          className="relative flex items-center gap-1 text-green-600 ml-2"
        >
          <ShoppingCart size={20} />
          {totalUniqueItems > 0 && (
            <div className="absolute -top-2 -right-2 bg-green-700 text-white text-sm rounded-full px-2">
              {totalUniqueItems}
            </div>
          )}
        </Link>

        <div className="hidden sm:flex items-center ml-4">
          {!isVisible ? (
            <>
              <Link href="/login">
                <button className="text-green-600 border-2 border-green-700 rounded-lg px-4 py-1.5 hover:bg-green-600 hover:text-white min-w-24">
                  Login
                </button>
              </Link>
              <Link href="/register" className="ml-2">
                <button className="bg-green-600 text-white rounded-lg px-4 py-1.5 min-w-24 hover:bg-white hover:text-green-600 hover:border-green-600 hover:border-2 transition-colors duration-150">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogOut}
              className="bg-green-600 text-white rounded-lg px-4 py-1.5 min-w-24"
            >
              Log Out
            </button>
          )}
        </div>

        <div className="sm:hidden ml-4">
          <Menu size={20} color="green" />
        </div>
      </div>
    </nav>
  );
}

export default Header;
