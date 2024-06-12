
"use client";
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const UserMenu = ({ user }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);
  const handleLogout = async () => {
    const response = await fetch('https://next-js-drab-chi.vercel.app/actions/api');
    const data = await response.json();

    if (data.success) {
      setIsLoggedIn(false);
      router.push('/');  
      router.refresh(); 
    } else {
      router.push('/Login')
        null
    }
  };

  return isLoggedIn ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.avatar || 'https://github.com/shadcn.png'} />
          <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className='font-title text-xl'>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='font-title text-xl'><Link href='/edit'>New Blog</Link></DropdownMenuItem>
        <DropdownMenuItem className='font-title text-xl'><Link href='/Myblog'>My Blogs</Link></DropdownMenuItem>
        <DropdownMenuItem  className='font-title text-xl'>
          <button onClick={handleLogout}>Log out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
};
export default UserMenu;
