'use client';

import star_review from '../public/assets/star_review.png';
import fav_false from '../public/assets/fav_false.png';
import fav_true from '../public/assets/fav_true.png';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

function AllStores() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Fetching all Food Data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const { data } = await axiosApi.get('/store/get-store');
        setRestaurantData(data);
        setIsLoading(false);
      } catch (error) {
        throw new Error('Error Fetching Data ', error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="m-2 sm:m-6 md:m-8 lg:m-12 xl:m-12 ">
      <h2 className="text-2xl font-custom2 mb-4 mx-4">All Stores</h2>
      {isLoading ? (
        // Loading Animation
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="bg-white rounded-2xl p-4 my-4 relative border border-transparent shadow-md">
              <div className="w-full h-40 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="pt-2">
                <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                  <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {restaurantData.map((info) => (
            <Link
              href={`/home/${info._id}`}
              key={info._id}
              className="bg-white hover:bg-green-50 hover:border-green-500 hover:border-2 rounded-2xl p-4 my-4 relative transition duration-300 ease-in-out border border-transparent"
            >
              <Image
                src={info.imageurl}
                width={160}
                height={160}
                className="w-full h-40 object-cover rounded-2xl"
                alt={`Food at ${info.name}`}
              />
              <button className="absolute top-4 left-4 rounded-full p-1 shadow-md">
                <Image
                  src={info.favourites ? fav_true : fav_false}
                  alt="Favorite Icon"
                  className="h-6 w-6"
                />
              </button>
              <div className="pt-2">
                <p className="text-lg font-custom2 font-medium truncate">
                  {info.name}
                </p>
                <p className="text-sm pt-1 text-gray-600">
                  Pickup: {info.pickuptime}
                </p>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-md mr-2">{info.review}</p>
                  <Image src={star_review} alt="Star" className="h-5 w-5" />
                </div>
                <p className="text-sm text-gray-600">{info.distance} km away</p>
              </div>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllStores;
