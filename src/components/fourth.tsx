'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ThreeDots } from 'react-loader-spinner';

const Fourth = () => {
  const [loading, setloading] = useState(false);
  const [filter, setfilter] = useState([]);
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setloading(true);
    const getdata = async () => {
      const res = await axios.post(
        'http://localhost:3000/enter/api3',
        JSON.stringify({ email: 'hassan' })
      );
      setdata(res.data.Posts);
      setfilter(res.data.Posts);
      setloading(false);
    };
    getdata();
  }, []);

  const handlefilter = (e) => {
    switch (e.target.id) {
      case 'nature':
        setfilter(
          data.filter((item) => {
            return item.category == 'natural';
          })
        );
        break;
      case 'technology':
        setfilter(
          data.filter((item) => {
            return item.category == 'technology';
          })
        );
        break;
      case 'wildlife':
        setfilter(
          data.filter((item) => {
            return item.category == 'wild life';
          })
        );
        break;
      case 'general':
        setfilter(
          data.filter((item) => {
            return item.category == 'general';
          })
        );
        break;
      default:
        setfilter(data);
        break;
    }
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filter.slice(indexOfFirstItem, indexOfLastItem);

  const pageCount = Math.ceil(filter.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {loading ? (
        <div className='flex justify-center items-center'>
          <ThreeDots
            color='#00BFFF'
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className='w-full px-6 mt-5 py-4'>
          <h1 className='w-24 font-title text-[3vw] relative  after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full   after:duration-300 after:origin-right after:transition after:scale-x-0  hover:after:origin-left hover:after:scale-x-100'>
            Topics
          </h1>
          <div id='buttons' className='flex justify-center gap-10'>
            <button
              id='noid'
              onClick={(e) => handlefilter(e)}
              className='font-title text-[2vw] relative  after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full   after:duration-300 after:origin-right after:transition after:scale-x-0  hover:after:origin-left hover:after:scale-x-100'
            >
              All
            </button>
            <button
              id='technology'
              onClick={(e) => handlefilter(e)}
              className='font-title text-[2vw] relative  after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full   after:duration-300 after:origin-right after:transition after:scale-x-0  hover:after:origin-left hover:after:scale-x-100'
            >
              Technology
            </button>
            <button
              id='nature'
              onClick={(e) => handlefilter(e)}
              className='font-title text-[2vw] relative  after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full  after:scale-x-1 after:duration-300 after:origin-right after:transition after:scale-x-0  hover:after:origin-left hover:after:scale-x-100'
            >
              Nature
            </button>
            <button
              id='wildlife'
              onClick={(e) => handlefilter(e)}
              className='font-title text-[2vw] relative  after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full  after:scale-x-1 after:duration-300 after:origin-right after:transition after:scale-x-0  hover:after:origin-left hover:after:scale-x-100'
            >
              Wild Life
            </button>
            <button
              id='general'
              onClick={(e) => handlefilter(e)}
              className='font-title text-[2vw] relative  after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full  after:scale-x-1 after:duration-300 after:origin-right after:transition after:scale-x-0  hover:after:origin-left hover:after:scale-x-100 '
            >
              Popular
            </button>
          </div>
          <div className='flex justify-between flex-wrap mt-10'>
            {currentItems.map((item, index) => {
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
                    <h1 className='text-sm font-sans'>Jun 12, 2023 2 min</h1>
                    <h1 className='break-words  font-title text-xl'>
                      {item.title}
                    </h1>
                  </div>
                </Link>
              );
            })}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(pageCount)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pageCount}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Fourth;

