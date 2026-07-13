'use client';
import Link from 'next/link';
import img1 from '../../../../public/assets/img1.jpg';
import Image from 'next/image';
import googleicon from '../../../../public/assets/googleicon.png';
import { useState } from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter400 = Inter({
  subsets: ['latin'],
  weight: '400',
});

const axios = require('axios');

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosApi.post('/register', formData);
      console.log(response);
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      router.push('/home');
    } catch (error) {
      console.log('Error', error);
    }
  };

  console.log('Data', formData);
  return (
    <main
      className={`${inter400.className} h-screen w-screen flex justify-center items-center bg-slate-100`}
    >
      <div className="bg-white  p-4 rounded-3xl flex md:gap-1  lg:gap-2 shadow-2xl">
        <div className="lg:pt-6 md:basis-1/2 basis-full pl-5 pr-3 pt-6 md:px-2  ">
          <div className="ml-4 pl-2 font-extrabold italic text-2xl ">
            RE-SERVE
          </div>
          <h1 className="mt-2 px-6 font-semibold italic ">WELCOME!</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:space-y-3 lg:space-y-4 space-y-4 px-6 pt-4 pb-3  "
          >
            <div className="flex font-sans ">
              <label htmlFor="role" className="text-base font-sans mr-3 ">
                Select your role
              </label>
              <select
                name="role"
                id="role"
                defaultValue={'User'}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="shadow-xl rounded-md px-1 py-1  focus:outline-none"
              >
                <option value="user">User</option>
                <option value="storeowner">Restaurant Owner</option>
              </select>
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your Name"
              className="px-2 py-2 rounded-md text-sm shadow-md focus:outline-none"
            />
            <input
              type="text"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="px-2 py-2 rounded-md shadow-md text-sm focus:outline-none"
            />
            <input
              type="password"
              placeholder=" Create your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="px-2 py-2 rounded-md text-sm shadow-md focus:outline-none"
            />
            <div className="flex justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  name="remember-me"
                  className="mr-1 size-3"
                />
                <label
                  htmlFor="remember-me"
                  className="font-light md:text-xs lg:text-sm text-sm "
                >
                  Remember me
                </label>
              </div>
            </div>
            <div className="flex flex-col space-y-2 px-6  justify-center items-center lg:mb-[1px]">
              <button
                type="submit"
                className="bg-green-500 text-white rounded-lg text-sm px-4 py-2 drop-shadow-md
         hover:bg-green-600 "
              >
                Register
              </button>
              {/* <p className="text-xs">Or</p>
              <button
                type="button"
                className="bg-white text-sm text-black  rounded-lg px-4 py-2 drop-shadow-md hover:bg-gray-100"
              >
                Continue with{' '}
                <Image
                  src={googleicon}
                  alt="google-icon"
                  className="h-6 w-7 inline-block pl-1"
                />
              </button> */}
            </div>
          </form>

          <div>
            <p className="px-6 font-light text-xs pt-3">
              Already have an account ?{' '}
              <span className="font-medium text-xs hover:underline">
                <Link href="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
        <div className="md:block md:basis-1/2 md:h-full hidden md:pt-5 md:pr-3 text-wrap">
          <div className="flex flex-col justify-end text-wrap ">
            <div>
              <Image
                src={img1}
                alt="loginimage"
                className="rounded-lg h-[450px] md:w-[350px] lg:w-[400px] relative object-cover "
              />
            </div>
            <div className="absolute lg:w[100px] text-white md:w-[350px] px-5 pb-5">
              <h1 className="pb-3 font-bold text-3xl">RE-SERVE</h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
