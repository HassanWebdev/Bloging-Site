'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ToastContainer, toast } from 'react-toastify';
import rehypeRaw from 'rehype-raw';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from 'react-loader-spinner';

const Blog = ({ params }: { params: { email: string; id: any } }) => {
  interface data {
    _id?: string;
    title: string;
    img: string;
    content: string;
    date: string;
    email: string;
    comments?: {
      email: string;
      comment: string;
    }[];
  }

  const [blog, setblog] = useState<data>({
    title: '',
    img: '',
    content: '',
    date: '',
    email: '',
    comments: [
      {
        email: '',
        comment: '',
      },
    ],
  });
  const [loading, setloading] = useState(false);
  const [commentlist, setcommentlist] = useState([]);
  const [commenttext, setcommenttext] = useState('');


  const handlecomment = async () => {
    setloading(true);
    await axios.post(
      'http://localhost:3000/enter/api',
      JSON.stringify({
        email: params.email,
        id: params.id,
        comment: { email: 'unknown', comment: commenttext },
      })
    ).then((res)=>{setloading(false);toast.success("Comment Added")});
    setcommenttext('');
  };
 
  useEffect(() => {
    const getdata = async () => {
      const res = await axios.post(
        'http://localhost:3000/enter/api2',
        JSON.stringify({ email: 'hassan' })
      );
      const dataa = res?.data.Posts.find(
        (item: { _id: any }) => item._id == params.id
      );
      setblog(dataa);
      setcommentlist(dataa?.comments);
    };
    getdata();
  }, [loading]);

  return (
    <div className='w-full h-full flex justify-center'>
      <ToastContainer/>
      <div className='w-[60vw] mt-10 flex flex-col gap-10 '>
        <h1 className='text-5xl font-title'>{blog?.title}</h1>
        <div id='forimg' className=' flex flex-col justify-center items-center'>
          <img
            src={blog?.img}
            alt=''
            className='object-cover w-full h-[70vh] rounded-xl'
          />
        </div>
        <div>
          <h1 className='font-title text-xl text-zinc-600'>
            Upload at: {blog?.date}
          </h1>
          <h1 className='font-title text-xl'>{`Author: ${params.email}`}</h1>
        </div>
        <div id='content' className=''>
          <ReactMarkdown
            className='font-sans break-words'
            rehypePlugins={[rehypeRaw]}
          >
            {blog?.content}
          </ReactMarkdown>
        </div>
        <div id='Comments ' className='flex flex-col gap-5'>
          <h1 className='font-title text-xl text-zinc-600'>Comments</h1>
          <div className='comment-input  '>
            <input
              onChange={(e) => setcommenttext(e.target.value)}
              id='text'
              type='text'
              placeholder='Any Thoughts'
              className={`h-12 w-[70%] rounded-3xl px-5 font-title text-xl `}
            />
            {loading ? (
              <TailSpin
                height='50'
                width='50'
                color='blue'
                ariaLabel='loading'
              />
            ) : (
              <button
                onClick={handlecomment}
                className='font-title ml-2   text-xl bg-green-400 w-[20%] py-2 text-white transition-all hover:bg-white hover:border-green-400 border-2 hover:text-green-400 rounded-full mt-4'
              >
                Publish
              </button>
            )}
          </div>
          <h1 className='font-title text-2xl text-zinc-600'>
            -:Comment section:-
          </h1>
          {commentlist?.map(
            (item: { email: string; comment: string }, index) => {
              return (
                <div className='comment flex' key={index}>
                  <h1 className='font-title text-zinc-600 text-xl'>
                    {item.email}
                  </h1>
                  <h1 className='font-title text-xl ml-5'>{item.comment}</h1>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
