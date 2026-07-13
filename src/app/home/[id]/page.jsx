'use client';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import star_review from '../../../../public/star_review.png';

// pages/_app.js
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup /* useMap */,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import Product from '../../../../components/Product';
import Image from 'next/image';
import Header from '../../../../components/Header';
import ReviewSection from '../../../../components/ReviewSection';

// import PropTypes from "prop-types";

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default function SingleDish() {
  const params = useParams();
  const [dbCart, setDbCart] = useState({});
  const [restaurantDetails, setRestauratDetails] = useState({});
  const [dishDetails, setDishDetails] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [uniqueProducts, setUniqueProducts] = useState(0);

  const isFirstRender = useRef(true);
  useEffect(() => {
    const fetchDishDetails = async (id) => {
      try {
        const { data } = await axiosApi.get(`/store/get-store/${id}`);
        const productData = await axiosApi.get(
          `/food/get-food-restaurant/${id}`
        );
        const location = data.location.split(',');
        console.log('Restaurant', data);
        console.log('Product', productData.data);
        setRestauratDetails({
          ...data,
          latitude: Number(location[0]),
          longitude: Number(location[1]),
        });
        setDishDetails(productData.data);
        setIsLoading(false);
      } catch (error) {
        throw new Error('Error Fetching Data ', error);
      }
    };
    if (isFirstRender.current) {
      fetchDishDetails(params.id);
      isFirstRender.current = false;
    }
  }, []);

  return (
    <main>
      {isloading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div>
          <Header totalUniqueItems={uniqueProducts} />
          <div className="m-8 mx-20">
            <div className="flex space-x-16">
              <div className="mb-0 max-w-3xl">
                <div className="relative rounded-3xl overflow-hidden">
                  <Image
                    src={restaurantDetails.imageurl}
                    width={500}
                    height={208}
                    alt={restaurantDetails.name}
                    className="h-52 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 text-white flex justify-between items-end m-1 mx-5">
                    <div className="flex space-x-3">
                      <h2 className="text-3xl font-medium ">
                        {restaurantDetails.name}
                      </h2>
                      <p className="text-sm flex items-end pb-1">
                        {restaurantDetails.pickuptime}
                      </p>
                    </div>
                    <div className="flex my-1  space-x-1">
                      <Image
                        src={star_review}
                        alt=""
                        className="h-7 w-7 my-auto"
                      />
                      <p className="flex items-end gap-1">
                        <span className="text-2xl">
                          {restaurantDetails.rating}
                        </span>
                        /5
                      </p>
                    </div>
                  </div>
                  {/* <button className="absolute top-3 left-3">
                    <Image
                      src={selectedRestaurant.favourites ? fav_true : fav_false}
                      alt=""
                      className="h-6 w-6"
                    />
                  </button> */}
                </div>
                <p className="text-wrap mt-4 px-2 font-sans text-[15px]">
                  {restaurantDetails.description}
                </p>
              </div>
              <div className="bg-yellow-100 w-5/12 h-80 flex flex-col justify-between rounded-2xl overflow-hidden">
                <div className="h-4/5">
                  <MapContainer
                    center={[
                      restaurantDetails.latitude,
                      restaurantDetails.longitude,
                    ]}
                    zoom={14}
                    scrollWheelZoom={true}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[
                        restaurantDetails.latitude,
                        restaurantDetails.longitude,
                      ]}
                    >
                      <Popup>{restaurantDetails.name}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <div className="p-4 text-wrap border-t-2 border-gray-700 font-sans italic">
                  <p>
                    <span className="font-semibold font-sans">Phone: </span>+91{' '}
                    {restaurantDetails.mobileno}
                  </p>
                  <p>
                    <span className="font-semibold font-sans">Address: </span>
                    {restaurantDetails.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-16 px-2">
              <p className="font-semibold  text-2xl  text-center mb-10">
                Food Menu
              </p>
              <p className="font-semibold  text-2xl  text-center mb-8">
                Explore Our Surprise Meal Box!
              </p>
              <ul className="flex w-full justify-center items-center gap-4 my-4 ">
                {dishDetails.map((product) =>
                  product.role === 'box' ? (
                    <div key={product._id}>
                      <Product
                        product={product}
                        resId={params.id}
                        setUniqueProducts={setUniqueProducts}
                        dbCart={dbCart}
                        setDbCart={setDbCart}
                        role="box"
                      />
                    </div>
                  ) : null
                )}
              </ul>

              <ul className="grid grid-cols-2 gap-8">
                {dishDetails.map(
                  (product) =>
                    product.role !== 'box' && (
                      <div key={product._id}>
                        <Product
                          product={product}
                          resId={params.id}
                          setUniqueProducts={setUniqueProducts}
                          dbCart={dbCart}
                          setDbCart={setDbCart}
                        />
                      </div>
                    )
                )}
              </ul>
            </div>
          </div>
          <ReviewSection />
        </div>
      )}
    </main>
  );
}
