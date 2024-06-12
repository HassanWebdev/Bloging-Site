'use client'
import Image from 'next/image';
import img from './photo-1500530855697-b586d89ba3ee.jpg';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

function Signup() {
  const [eye, seteye] = useState(false);
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [passlength, setpasslength] = useState(false);
  const router = useRouter();

  const createAccount = async (e:any) => {
    e.preventDefault();
    if (password.length < 8 ) {
      setpasslength(true);
      return;
    }
    setpasslength(false);
    setloading(true);
    try {
      const res = await axios.post('https://next-js-drab-chi.vercel.app/Login/api', JSON.stringify({email,password}));
      setloading(false);
      toast.success(`${res?.data.message}` )
      router.push('/')
      router.refresh()
    } catch (error) {
      setloading(false);
      toast.error("Invalid Email or Password ")
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
      <Image src={img} alt="My image" />
      <div className="h-[60vh] absolute rounded-xl border-2 border-black border-opacity-[.4] px-4 flex flex-col backdrop-blur-sm">
        <div className="flex justify-center w-full h-20 items-end">
          <h1 className="text-5xl font-title text-white">Log-In</h1>
        </div>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="input" className="font-title text-xl text-white">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter Email..."
              id="input"
              onChange={(e) => setemail(e.target.value)}
              className="w-72 h-9 rounded-lg px-3 outline-none focus:ring-4"
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="font-title text-xl text-white">
              Password
            </label>
            <input
              type={eye ? 'text' : 'password'}
              placeholder="Enter Password..."
              id="password"
              className="w-72 h-9 rounded-lg px-3 outline-none focus:ring-4 relative"
              onChange={(e) => setpassword(e.target.value)}
            />
            {passlength ? (
              <p className="text-red-300 text-sm">
                Password must be at least 8 characters
              </p>
            ) : null}
            <button
              className="absolute left-60 top-9 bg-zinc-200 px-2 rounded-xl font-title text-lg"
              onClick={(e) => {
                e.preventDefault();
                seteye(!eye);
              }}
            >
              {eye ? 'hide' : 'show'}
            </button>
          </div>
          <br />
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              disabled={loading}
              className="bg-white text-black transition hover:bg-black hover:text-white"
              onClick={(e)=>createAccount(e)}
            >
              {loading ? <TailSpin height="30" width="50" radius="4" /> : null}
              Log-In
            </Button>
            <Button className="text-white" variant={"link"}>
              <Link href="/Signup" className="">
                Sign-Up?
              </Link>
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Signup;
