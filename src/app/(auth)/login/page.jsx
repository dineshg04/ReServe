'use client';
import Link from 'next/link';
import img1 from '../../../../public/assets/img1.jpg';
import Image from 'next/image';
import googleicon from '../../../../public/assets/googleicon.png';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const inter400 = Inter({
  subsets: ['latin'],
  weight: '400',
});

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const Login = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosApi.post('/login', formData);
      router.push('/home')
      console.log(response);
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <main
      className={`${inter400.className} h-screen w-screen flex justify-center items-center bg-slate-100`}
    >
      <div className=" bg-white p-4 rounded-3xl flex gap-1 shadow-2xl">
        <div className="lg:pt-6 md:basis-1/2 basis-full pl-2 pt-7 md:mx-2 ">
          <div className=" ml-4 pl-2  font-extrabold text-2xl italic ">
            RE-SERVE
          </div>
          <h1 className="mt-3 px-6 font-semibold italic ">WELCOME BACK!</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-6 px-6 pt-4 pb-2"
          >
            <input
              type="text"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="px-2 py-2 rounded-md text-sm shadow-md focus:outline-none"
            />
            <input
              type="password"
              placeholder=" Enter your password"
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
                  className=" lg:text-sm font-light text-xs "
                >
                  Remember me
                </label>
              </div>
              <p className="lg:text-sm font-normal hover:underline text-xs">
                Forgot password
              </p>
            </div>
            <div className="flex flex-col space-y-3 px-6  justify-center items-center mt-5">
              <button
                type="submit"
                className="bg-green-500 text-white rounded-lg px-4 py-2 drop-shadow-md hover:bg-green-600 "
              >
                Sign In
              </button>
            </div>
          </form>

          {/* <p className="text-sm">Or</p>
            <button className="bg-white text-black rounded-lg px-4 py-2 drop-shadow-md text-sm hover:text-base">
              Continue with{' '}
              <Image
                src={googleicon}
                alt="googleicon"
                className=" h-6 w-7 inline-block pl-1"
              />
            </button> */}

          <p className="px-6 font-light text-xs  pt-9">
            Don't have an account ?{' '}
            <span className="font-medium text-xs hover:underline ">
              <Link href="/register">Create one</Link>
            </span>
          </p>
        </div>
        <div className="md:block md:basis-1/2 hidden lg:py-6 md:pt-5 md:pr-3 text-wrap">
          <div className="flex flex-col justify-end text-wrap ">
            <div>
              <Image
                src={img1}
                alt="loginimage"
                className="rounded-lg h-[450px] w-[400px] relative object-cover"
              />
            </div>
            <div className="absolute lg:w-[360px] text-white px-5 pb-5 md:w-[350px] ">
              <h1 className="pb-3 font-bold text-3xl">RE-SERVE</h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
