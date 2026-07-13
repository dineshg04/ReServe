// 'use client';
// import { useState } from 'react';
// import { Inter } from 'next/font/google';
// const axios = require('axios');

// const axiosApi = axios.create({
//   baseURL: 'http://localhost:3000/api',
// });

// const inter400 = Inter({
//   subsets: ['latin'],
//   weight: '400',
// });

// export default function Home() {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     location: '',
//     address : '',
//     pickupstarttime: '',
//     pickupendtime: '',
//     phoneno: null,
//     file: {},
//   });

//   console.log(formData);
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return;
//     try {
//       const data = new FormData();

//       data.append('name', formData.name);
//       data.append('description', formData.description);
//       data.append('address', formData.address);
//       data.append('location', formData.location);
//        data.append(
//          'pickuptime',
//          `${formData.pickupstarttime}-${formData.pickupendtime}`
//        );
//       data.append('mobileno', formData.phoneno);
//       data.append('file', formData.file);

//       console.log('Form Data', data);
//       await axiosApi.post('/store/create-store', data);
//       setFormData({
//         name: '',
//         description: '',
//         location: '',
//         address: '',
//         pickupstarttime: '',
//         pickupendtime: '',
//         phoneno: null,
//         file: {},
//       });
//       // handle the error
//       if (!res.ok) throw new Error(await res.text());
//     } catch (e) {
//       // Handle errors here
//       console.error(e);
//     }
//   };

//   const getLocation = (e) => {
//     e.preventDefault();
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setFormData({
//           ...formData,
//           location: `${position.coords.latitude},${position.coords.longitude}`,
//         });
//       });
//     }
//   };

//   return (
//     <main
//       className={`${inter400.className} w-screen h-screen flex justify-center items-center bg-green-700 `}
//     >
//       <form
//         onSubmit={onSubmit}
//         className="flex flex-col border-[1px] rounded-lg p-6 bg-white shadow-lg gap-4"
//       >
//         <div className="text-center font-bold text-2xl text-green-900">
//           Restaurant Details
//         </div>
//         {/* DishName */}
//         <span className="flex flex-col gap-1">
//           <label htmlFor="name" className="font-semibold text-lg">
//             Restaurant Name{' '}
//           </label>
//           <input
//             type="text"
//             placeholder="Restaurant Name"
//             id="name"
//             className="w-3/4 h-8 border-[1px] rounded-md px-2 "
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           />
//         </span>
//         {/* Description */}
//         <span className="flex flex-col gap-1">
//           <label htmlFor="desc" className="font-semibold text-lg">
//             Restaurant Description
//           </label>
//           <input
//             type="text"
//             placeholder="Restaurant Address"
//             id="desc"
//             className="w-3/4 h-8 border-[1px] rounded-md px-2 "
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//           />
//         </span>

//         {/* Address */}
//         <span className="flex flex-col gap-1">
//           <label htmlFor="address" className="font-semibold text-lg">
//             Restaurant Address
//           </label>
//           <input
//             type="text"
//             placeholder="Restaurant Address"
//             id="address"
//             className="w-3/4 h-8 border-[1px] rounded-md px-2 "
//             value={formData.address}
//             onChange={(e) =>
//               setFormData({ ...formData, address: e.target.value })
//             }
//           />
//         </span>

//         {/* Restaurant Location Details*/}
//         <span className="flex flex-col gap-1">
//           <label htmlFor="address" className="font-semibold text-lg">
//             Location
//           </label>
//           <button className="border-2" onClick={getLocation}>
//             Get Current Location
//           </button>
//         </span>

//         {/* PickUp Time Between TakeAway */}
//         <span className="flex flex-col gap-1">
//           <label htmlFor="time" className="font-semibold text-lg">
//             PickUp Between
//           </label>
//           <span className="flex ">
//             <input
//               type="time"
//               placeholder="PickUp Time"
//               id="time"
//               className="w-2/4 h-8 border-[1px] rounded-md px-2 "
//               value={formData.pickupstarttime}
//               onChange={(e) =>
//                 setFormData({ ...formData, pickupstarttime: e.target.value })
//               }
//             />
//             <input
//               type="time"
//               placeholder="PickUp Time"
//               id="time"
//               className="w-2/4 h-8 border-[1px] rounded-md px-2 "
//               value={formData.pickupendtime}
//               onChange={(e) =>
//                 setFormData({ ...formData, pickupendtime: e.target.value })
//               }
//             />
//           </span>
//         </span>

//         {/*Phone Number */}
//         <span className="flex flex-col gap-1">
//           <label htmlFor="phoneno" className="font-semibold text-lg">
//             Restaurant Phone Number
//           </label>
//           <input
//             type="text"
//             placeholder="Food Price"
//             id="phoneno"
//             className="w-3/4 h-8 border-[1px] rounded-md px-2 "
//             value={formData.phoneno}
//             onChange={(e) =>
//               setFormData({ ...formData, phoneno: e.target.value })
//             }
//           />
//         </span>

//         {/* File Upload */}
//         <span className="flex flex-col gap-1">
//           <label htmlFor="file" className="font-semibold text-lg">
//             Restaurant Image
//           </label>
//           <input
//             type="file"
//             name="file"
//             id="file"
//             onChange={(e) =>
//               setFormData({ ...formData, file: e.target.files?.[0] })
//             }
//           />
//         </span>

//         <button
//           type="submit"
//           className="border-[1px] p-2 bg-black text-white  font-semibold rounded-lg hover:bg-green-200 hover:text-green-800"
//         >
//           Submit
//         </button>
//       </form>
//     </main>
//   );
// }



'use client';
import { useState } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
// import Restaurant_pic from "../../../../public/Restaurant_pic.png";
// import leftBanner1 from "../../../../public/leftBanner1.jpeg";
import leftBanner from "../../../../public/leftBanner.jpg";
// import bgStore from "../../../../public/bgStore.jpg";
// import bgPic from "../../../../public/bgPic.gif";
// import bgPic1 from "../../../../public/bgPic1.jpg";
// import bgPic2 from "../../../../public/bgPic2.jpg";

const axios = require('axios');

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const inter400 = Inter({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    address: '',
    pickupstarttime: '',
    pickupendtime: '',
    phoneno: null,
    file: {},
  });

  console.log(formData);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();

      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('address', formData.address);
      data.append('location', formData.location);
      data.append(
        'pickuptime',
        `${formData.pickupstarttime}-${formData.pickupendtime}`
      );
      data.append('mobileno', formData.phoneno);
      data.append('file', formData.file);

      console.log('Form Data', data);
      await axiosApi.post('/store/create-store', data);
      setFormData({
        name: '',
        description: '',
        location: '',
        address: '',
        pickupstarttime: '',
        pickupendtime: '',
        phoneno: null,
        file: {},
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      // Handle errors here
      console.error(e);
    }
  };

  const getLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          location: `${position.coords.latitude},${position.coords.longitude}`,
        });
      });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage(2);
  };

  const prevPage = () => {
    setCurrentPage(1);
  };





  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Background Image */}
      {/* <Image
        src={bgPic}
        alt=""
        layout="fill"
        objectFit="cover"
        quality={100} // Adjust quality as needed
      /> */}

      {/* Content Container */}
      <h1 className="absolute top-5 left-8  text-green-700 font-bold text-3xl">
        Re-Serve
      </h1>
      <div className="flex justify-center items-center h-screen overflow-hidden relative">
        <div className="flex md:w-1/2 rounded-3xl overflow-hidden drop-shadow-2xl">
          <div className='w-2/3'>
            <Image src={leftBanner} alt="" className='object-cover h-[440px] object-right-bottom' />
          </div>
          <form
            onSubmit={onSubmit}
            className="flex flex-col w-full border-[1px] p-6 pb-2 bg-white shadow-lg gap-4"
          >
            <div className="text-center font-bold text-2xl">
              Enter Store Details
            </div>

            {/* Page 1 */}
            {currentPage === 1 && (
              <>
                <span className="flex flex-col gap-1">
                  <label htmlFor="name" className="font-semibold text-lg">
                    Restaurant Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Restaurant Name"
                    id="name"
                    className="w-full h-8 border-[1px] rounded-md px-2"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </span>

                <span className="flex flex-col gap-1">
                  <label htmlFor="desc" className="font-semibold text-lg">
                    Restaurant Description:
                  </label>
                  <input
                    type="text"
                    placeholder="Restaurant Description"
                    id="desc"
                    className="w-full h-8 border-[1px] rounded-md px-2"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </span>

                <span className="flex flex-col gap-1">
                  <label htmlFor="address" className="font-semibold text-lg">
                    Restaurant Address:
                  </label>
                  <input
                    type="text"
                    placeholder="Restaurant Address"
                    id="address"
                    className="w-full h-8 border-[1px] rounded-md px-2"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </span>

                <span className="flex flex-col gap-1">
                  <label htmlFor="location" className="font-semibold text-lg">
                    Location:
                  </label>
                  <button className="border-2" onClick={getLocation}>
                    Get Current Location
                  </button>
                </span>

                <div className='flex justify-end'>
                  <button
                    type="button"
                    onClick={nextPage}
                    className="w-1/2 border-[1px] rounded-xl p-2 font-semibold bg-lime-400 text-gray-700"
                  >
                    Next
                  </button>
                </div>

              </>
            )}

            {/* Page 2 */}
            {currentPage === 2 && (
              <>
                <span className="flex flex-col gap-1">
                  <label htmlFor="time" className="font-semibold text-lg">
                    PickUp Between:
                  </label>
                  <span className="flex flex-col gap-2 items-center">
                    <input
                      type="time"
                      id="time"
                      className="w-2/4 h-8 border-[1px] rounded-md px-2 block"
                      value={formData.pickupstarttime}
                      onChange={(e) => setFormData({ ...formData, pickupstarttime: e.target.value })}
                    />
                    <input
                      type="time"
                      id="time"
                      className="w-2/4 h-8 border-[1px] rounded-md px-2"
                      value={formData.pickupendtime}
                      onChange={(e) => setFormData({ ...formData, pickupendtime: e.target.value })}
                    />
                  </span>
                </span>

                <span className="flex flex-col gap-1">
                  <label htmlFor="phoneno" className="font-semibold text-lg">
                    Restaurant Phone Number:
                  </label>
                  <input
                    type="text"
                    placeholder="Restaurant Phone Number"
                    id="phoneno"
                    className="w-full h-8 border-[1px] rounded-md px-2"
                    value={formData.phoneno}
                    onChange={(e) => setFormData({ ...formData, phoneno: e.target.value })}
                  />
                </span>

                <span className="flex flex-col gap-1 mb-10">
                  <label htmlFor="file" className="font-semibold text-lg">
                    Restaurant Image:
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] })}
                  />
                </span>

                <div className='flex space-x-2 '>
                  <button
                    type="button"
                    onClick={prevPage}
                    className="w-1/2 rounded-xl border-[1px] p-2 bg-gray-300 text-gray-700 font-semibold"
                  >
                    Previous
                  </button>

                  <button
                    type="submit"
                    className="w-1/2 rounded-xl border-[1px] p-2 font-semibold bg-lime-400 text-green-900 "
                  >
                    Submit
                  </button>
                </div>


              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};