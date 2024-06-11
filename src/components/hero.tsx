'use client';
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';

const CarouselComponent = () => {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  useEffect(() => {
    setloading(true);
    const getdata = async () => {
      const res = await axios.post(
        'http://localhost:3000/enter/api3',
        JSON.stringify({ email: 'hassan' })
      );
      const selectedarray = res?.data.Posts.splice(0, 4);
      setdata(selectedarray);
      setloading(false);
    };
    getdata();
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index: any) => {
    setCurrentSlide(index);
  };

  return (
    <div className=''>
      {loading ? (
        <div className='flex justify-center items-center'>
           <TailSpin height='300' width='300' radius='2' />
        </div>
       
      ) : (
        <div className='px-6 '>
          <Carousel
            showArrows={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            infiniteLoop={true}
            onChange={handleSlideChange}
            transitionTime={500}
            className='flex'
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type='button'
                  onClick={onClickHandler}
                  title={label}
                  className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 transition duration-300 hover:bg-gray-200'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-gray-800'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type='button'
                  onClick={onClickHandler}
                  title={label}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 transition duration-300 hover:bg-gray-200'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-gray-800'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </button>
              )
            }
          >
            {data.map((slide, index) => (
              <Link
                href={`/blogs/${slide.email}/${slide?._id}`}
                key={index}
                className='flex transition-transform duration-500 ease-in-out '
              >
                <div className='w-1/2 h-[35rem] flex items-center justify-center bg-white relative'>
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className='h-full object-cover rounded-tl-xl rounded-bl-xl'
                  />
                  <div className='w-full h-full bg-black absolute opacity-50 rounded-tl-xl rounded-bl-xl'></div>
                </div>
                <div className='w-1/2 h-[35rem] flex items-center justify-center bg-black text-white rounded-tr-xl rounded-br-xl'>
                  <div className='w-full px-4 '>
                    <h2 className='text-5xl font-title break-words'>
                      {slide.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default CarouselComponent;
