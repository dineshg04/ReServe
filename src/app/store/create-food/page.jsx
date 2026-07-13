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
//     price: '',
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
//       data.append('price', formData.price);
//       data.append('file', formData.file);
//       await axiosApi.post('/food/create-food', data);

//       setFormData({
//         name: '',
//         description: '',
//         price: '',
//         file: {},
//       });
//     } catch (e) {
//       // Handle errors here
//       console.error(e);
//     }
//   };
//   return (
//     <div className='backgroundgreen h-screen '>
//     <div className='h-14 text-3xl  text-green-700 font-bold p-4'>ReServe</div>
//     <main
//       className={`${inter400.className} w-screen mt-12 flex justify-center items-center   `}
//     >
      
//       <form
//         onSubmit={onSubmit}
//         className="flex flex-col border-[0px]  rounded-sm p-6 bg-white bg-opacity-20  shadow-lg gap-4"
//       >
//         <div className="text-center font-mono text-2xl text-black tracking-wide">
//           Dish Details
//         </div>
//         {/* DishName */}
//         <span className="flex flex-col gap-1">
//           <label htmlFor="name" className="font-custom1 text-lg tracking-wide">
//             Dish Name:{' '}
//           </label>
//           <input
//             type="text"
//             placeholder="Food Name"
//             id="name"
//             className="w-full h-8 border-[1px] rounded-sm px-2 font-sans  text-sm   bg-white bg-opacity-60 placeholder-slate-400 outline-none"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           />
//         </span>

//         {/* Dish Description */}
//         <span className="flex flex-col gap-1">
//           <label htmlFor="desc" className="font-custom1 text-lg tracking-wider">
//             Dish Description:
//           </label>
//           <input
//             type="text"
//             placeholder="Food Description"
//             id="desc"
//             className="w-full h-8 border-[1px] rounded-sm px-2 font-sans text-sm  bg-white bg-opacity-60 placeholder-slate-400 outline-none"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//           />
//         </span>

//         {/* Price */}
//         <span className="flex flex-col gap-1">
//           <label htmlFor="price" className="font-custom1 text-lg tracking-wider">
//             Dish Price:
//           </label>
//           <input
//             type="text"
//             placeholder="Food Price"
//             id="price"
//             className="w-full h-8 border-[0px] rounded-sm px-2 font-sans text-sm  bg-white bg-opacity-60 placeholder-slate-400 outline-none"
//             value={formData.price}
//             onChange={(e) =>
//               setFormData({ ...formData, price: e.target.value })
//             }
//           />
//         </span>

//         {/* File Upload */}
//         <span className="flex flex-col gap-1">
//           <label htmlFor="file" className="font-custom1 text-lg">
//             Dish Image:
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
//           className="border-[0px] p-2 bg-black text-white  text-md  font-sans rounded-sm" /* hover:bg-white hover:text-green-700 hover: border-green-700 */
//         >
//           Submit
//         </button>
//       </form>
//     </main>
//     </div>
//   );
// }



'use client';
import { useState } from 'react';
import Image from 'next/image';
import foodgif from "/public/foodgif.gif";
import { Inter } from 'next/font/google';
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
    price: '',
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
      data.append('price', formData.price);
      data.append('file', formData.file);
      await axiosApi.post('/food/create-food', data);

      setFormData({
        name: '',
        description: '',
        price: '',
        file: {},
      });
    } catch (e) {
      // Handle errors here
      console.error(e);
    }
  };
  return (
    <div className='bg-green-950 overflow-hidden'>
      <div
        className={`${inter400.className} w-screen h-screen flex  items-center  relative left-60`}
      >
        <form
          onSubmit={onSubmit}
          className="flex flex-col border-[1px] rounded-3xl p-6 bg-white shadow-lg gap-4 z-10 drop-shadow-2xl"
        >
          <div className="text-center font-bold text-2xl">
            Dish Details
          </div>
          {/* DishName */}
          <span className="flex flex-col gap-1">
            <label htmlFor="name" className="font-semibold text-lg ">
              Dish name{' '}
            </label>
            <input
              type="text"
              placeholder="Food Name"
              id="name"
              className="w-3/4 h-8 border-[1px] rounded-md px-2 "
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </span>

          {/* Dish Description */}
          <span className="flex flex-col gap-1">
            <label htmlFor="desc" className="font-semibold text-lg ">
              Dish Description
            </label>
            <input
              type="text"
              placeholder="Food Description"
              id="desc"
              className="w-3/4 h-8 border-[1px] rounded-md px-2 "
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </span>

          {/* Price */}
          <span className="flex flex-col gap-1">
            <label htmlFor="price" className="font-semibold text-lg">
              Dish Price
            </label>
            <input
              type="text"
              placeholder="Food Price"
              id="price"
              className="w-3/4 h-8 border-[1px] rounded-md px-2 "
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </span>

          {/* File Upload */}
          <span className="flex flex-col gap-1">
            <label htmlFor="file" className="font-semibold text-lg">
              Dish Image
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) =>
                setFormData({ ...formData, file: e.target.files?.[0] })
              }
            />
          </span>

          <button
            type="submit"
            className="border-[1px] p-2 bg-black text-white  font-semibold rounded-lg hover:bg-green-200 hover:text-green-800 hover:border-2-green-900"
          >
            Submit
          </button>
        </form>
      </div>
      <div className='absolute z-0 h-[82%] w-[60%] top-16 left-96 rounded-3xl' style={{ backgroundColor: 'rgb(253, 215, 132)' }}>
        <div className='absolute top-20 right-24 w-2/4'>
          <div className='text-center text-green-900'>
            <div><p className='text-3xl font-sans font-bold mb-4 pb-4 border-b border-green-900'>ReServe</p></div>
            <p className='font-custom3 text-lg leading-9 mt-5'>Welcome to our food details section! Please provide the necessary details. Your entries will showcase the essence of your cuisine and enhance the experience for our customers.</p>
          </div>
        </div>
        <Image src={foodgif} alt="" className='w-[70%] h-20 absolute bottom-28 right-0' />
      </div>
    </div>
  );
}
