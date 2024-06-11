import Link from 'next/link';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import UserMenu from './Usermenu.client';

const Navbar = () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');
  const tokenValue = token?.value;
  
  let user = null;
  if (tokenValue) {
    try {
      const decodedData = jwt.verify(tokenValue, 'ahakahakahak');
      user = decodedData;
    } catch (error) {
      user = null;
    }
  }

  return (
    <div className='w-full h-auto px-10 flex items-center justify-between'>
      <div id='logo' className='w-32 '>
        <h1 className='font-bold text-[3vw] tracking-widest transition-all hover:scale-90 hover:tracking-[4vw] cursor-pointer'>
          <Link href='/'>VOID</Link>
        </h1>
      </div>
      <div id='links' className='flex gap-5'>
        <Link
          href='/'
          className='font-title text-[2vw] relative after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full after:duration-300 after:origin-right after:transition after:scale-x-0 hover:after:origin-left hover:after:scale-x-100'
        >
          Home
        </Link>
        <Link
          href='/Myblog'
          className='font-title text-[2vw] relative after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full after:scale-x-1 after:duration-300 after:origin-right after:transition after:scale-x-0 hover:after:origin-left hover:after:scale-x-100'
        >
          My Blogs
        </Link>
        <Link
          href='/'
          className='font-title text-[2vw] relative after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full after:scale-x-1 after:duration-300 after:origin-right after:transition after:scale-x-0 hover:after:origin-left hover:after:scale-x-100'
        >
          Story
        </Link>
        <Link
          href='/'
          className='font-title text-[2vw] relative after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full after:scale-x-1 after:duration-300 after:origin-right after:transition after:scale-x-0 hover:after:origin-left hover:after:scale-x-100'
        >
          Latest
        </Link>
      </div>
      <div id='right' className='flex gap-5 justify-center items-center'>
        {!user && (
          <>
            <Link
              href='/Login'
              className='font-title text-[2vw] relative after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full after:scale-x-1 after:duration-300 after:origin-right after:transition after:scale-x-0 hover:after:origin-left hover:after:scale-x-100'
            >
              Login
            </Link>
            <Link
              href='/Signup'
              className='font-title text-[2vw] relative after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:rounded-full after:scale-x-1 after:duration-300 after:origin-right after:transition after:scale-x-0 hover:after:origin-left hover:after:scale-x-100'
            >
              Signup
            </Link>
          </>
        )}
        <UserMenu user={user} />
      </div>
    </div>
  );
};

export default Navbar;