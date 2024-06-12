'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myblog2 = ({ user }) => {
  const [blogs, setblogs] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    const getuser = async () => {
      await axios
        .post('https://next-js-drab-chi.vercel.app/enter/api2', JSON.stringify({ email: user.email }))
        .then((res) => setblogs(res.data.Posts));
    };
    getuser();
  }, [blogs]);

  const handledelete = async (email, id) => {
    setLoadingStates((prevState) => ({ ...prevState, [id]: true }));

    try {
      await axios.post('https://next-js-drab-chi.vercel.app/enter/api4', JSON.stringify({ email: email, id: id }));
      toast.success('Post Deleted');
      const res = await axios.post('https://next-js-drab-chi.vercel.app/enter/api2', JSON.stringify({ email: user.email }));
      setblogs(res.data.Posts);
    } finally {
      setLoadingStates((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  return (
    <div className=" flex flex-col gap-10  mt-10">
      <ToastContainer />
      <h1 className="font-title text-5xl pl-10">My Blogs</h1>
      <div className="flex flex-wrap justify-evenly">
        {blogs?.map((item, index) => {
          return (
            <div key={index}>
              <Link
                href={`/blogs/${item.email}/${item?._id}`}
                key={index}
                className="w-72 h-96  flex flex-col gap-4 transition-all hover:scale-90"
              >
                <div className="w-full h-[65%] overflow-hidden">
                  <img src={item.img} alt="" className="object-cover rounded-sm w-full h-full" />
                </div>
                <div className="w-full h-[35%] flex flex-col gap-4">
                  <h1 className="text-sm font-sans">Jun 12, 2023 2 min</h1>
                  <h1 className="break-words  font-title text-xl">{item.title}</h1>
                </div>
              </Link>
              <div>
                {loadingStates[item?._id] ? (
                  <TailSpin />
                ) : (
                  <button
                    onClick={() => handledelete(item?.email, item?._id)}
                    className="bg-red-400 transition-all hover:bg-red-600 px-2 rounded-xl text-white font-title py-2"
                  >
                    Delete Post
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Myblog2;
