'use client';
import Link from 'next/link';
import axios from 'axios';
import { Circles, TailSpin } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
const Third = () => {
  const [loading, setloading] = useState(false);
  const [data2, setdata] = useState([]);
  useEffect(() => {
    setloading(true);
    const getdata = async () => {
      const res = await axios.post(
        'https://next-js-drab-chi.vercel.app/enter/api3',
        JSON.stringify({ email: 'hassan' })
      );
      const selectedarray = res?.data.Posts.splice(0, 4);
      setdata(selectedarray);
      setloading(false);
    };
    getdata();
  }, []);
  return (
    <div>
      {loading ? (
        <div className='flex justify-center items-center'>
          <TailSpin />
        </div>
        
      ) : (
        <div className='px-6 flex flex-col '>
          <div>
            <h1 className='w-24 font-title text-[3vw] relative  after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full m-4  after:duration-300 after:origin-right after:transition after:scale-x-0  hover:after:origin-left hover:after:scale-x-100'>
              Latest
            </h1>
          </div>
          <div className='flex justify-between flex-wrap '>
            {data2.map((item, index) => {
              return (
                <Link
                  href={`/blogs/${item.email}/${item?._id}`}
                  key={index}
                  className='w-72 h-96  flex flex-col gap-4 transition-all hover:scale-90'
                >
                  <div className='w-full h-[65%] overflow-hidden'>
                    <img
                      src={item.img}
                      alt=''
                      className='object-cover rounded-sm w-full h-full'
                    />
                  </div>
                  <div className='w-full h-[35%] flex flex-col gap-4'>
                    <h1 className='text-sm font-sans'>item.date</h1>
                    <h1 className='break-words  font-title text-xl'>
                      {item.title}
                    </h1>
                  </div>
                </Link>
              );
            })}
          </div>
          <hr />
        </div>
      )}
    </div>
  );
};
export default Third;
