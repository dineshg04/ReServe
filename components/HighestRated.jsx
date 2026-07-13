"use client"

// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// import a_biryani from "../public/assets/a_biryani.jpg";
// import b_friedChicken from "../public/assets/b_friedChicken.jpg";
// import c_pizza from "../public/assets/c_pizza.jpg";
// import d_iceCream from "../public/assets/d_iceCream.jpg";
// import e_dosa from "../public/assets/e_dosa.jpg";
// import f_donuts from "../public/assets/f_donuts.jpg";
// import g_noodles from "../public/assets/g_noodles.jpg";
// import h_rolls from "../public/assets/h_rolls.jpg";

// import star_review from "../public/assets/star_review.png";
// // import fav_false from "../public/assets/fav_false.png";
// // import fav_true from "../public/assets/fav_true.png";
// import banner_home from "../public/assets/banner_home.png";

import Image from 'next/image';

import a_biryani from "../public/assets/a_biryani.jpg";
import b_friedChicken from "../public/assets/b_friedChicken.jpg";
import c_pizza from "../public/assets/c_pizza.jpg";
import d_iceCream from "../public/assets/d_iceCream.jpg";
import e_dosa from "../public/assets/e_dosa.jpg";
import f_donuts from "../public/assets/f_donuts.jpg";
import g_noodles from "../public/assets/g_noodles.jpg";
import h_rolls from "../public/assets/h_rolls.jpg";

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import star_review from "../public/assets/star_review.png";
// import fav_false from "../public/assets/fav_false.png";
// import fav_true from "../public/assets/fav_true.png";
import banner_home from "../public/assets/banner_home.png";


const restaurantData = [
    {
        id: 1,
        image: a_biryani,
        name: "A Hotel",
        distance: 7.2,
        pickupTime: "9:45 - 11:30",
        review: 4.2,
        favourites: false,
    },
    {
        id: 2,
        image: b_friedChicken,
        name: "B Hotel",
        distance: 4.9,
        pickupTime: "10:00 - 2:00",
        review: 4.7,
        favourites: false,
    },
    {
        id: 3,
        image: c_pizza,
        name: "C Hotel",
        distance: 5.6,
        pickupTime: "9:30 - 11:30",
        review: 3.8,
        favourites: false,
    },
    {
        id: 4,
        image: d_iceCream,
        name: "D Hotel",
        distance: 9.2,
        pickupTime: "9:30 - 12:00",
        review: 2.1,
        favourites: false,
    },
    {
        id: 5,
        image: e_dosa,
        name: "E Hotel",
        distance: 3.3,
        pickupTime: "9:45 - 1:30",
        review: 3.3,
        favourites: false,
    },
    {
        id: 6,
        image: f_donuts,
        name: "F Hotel",
        distance: 6.1,
        pickupTime: "10:15 - 11:45",
        review: 4.5,
        favourites: false,
    },
    {
        id: 7,
        image: g_noodles,
        name: "G Hotel",
        distance: 2.9,
        pickupTime: "9:45 - 12:00",
        review: 3.2,
        favourites: false,
    },
    {
        id: 8,
        image: h_rolls,
        name: "H Hotel",
        distance: 7.6,
        pickupTime: "10:30 - 2:30",
        review: 4.4,
        favourites: false,
    },
];

function HighestRated() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1250,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 1249,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 440,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const sortedRestaurants = restaurantData.sort((a, b) => b.review - a.review);
    const topRestaurants = sortedRestaurants.slice(0, 10);

    return (
        <div className="mb-16 mx-6 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 sm:mt-40 md:mt-16  lg:-mt-6">
            <h2 className="text-2xl font-custom2 mb-4">Highest Rated</h2>
            <div className='md:flex md:space-x-16'>
                <div className="w-full md:w-2/5 bg-yellow-200 rounded-3xl p-4 text-white mb-04 md:mb-0 min-h-40 relative">
                    <div className='text-black'>
                        <p className='text-3xl font-mono'>Save Food, Save Money.</p>
                        <p className='text-xl mt-2'>It&apos;s Late, You Hungry ?</p>
                        <p className='text-sm'> We&apos;ve got you covered!</p>
                        {/* {window?.innerWidth > 425 && ( */}
                            <Image src={banner_home} alt="" className='absolute sm:bottom-0 md:-bottom-1 lg:-bottom-3 xl:-bottom-5 left-0' />
                        {/* )} */}
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <Slider {...settings}>
                        {topRestaurants.map((info) => (
                            <div key={info.id} className="bg-white p-2 pb-0 hover:shadow-xl">
                                <Image src={info.image} alt="" className="object-cover h-40 w-full rounded-2xl" />
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-lg font-custom2 font-medium">{info.name}</p>
                                    <div className="flex items-center">
                                        <Image src={star_review} alt="star" className="h-5 w-5 my-auto" />
                                        <p className="ml-1">{info.review}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default HighestRated;