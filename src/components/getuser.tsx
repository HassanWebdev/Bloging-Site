import { cookies } from 'next/headers';
import Editoor from './Editor';
import jwt from 'jsonwebtoken';
import { useState } from 'react';
const  Newblog = ()=>{
    const cookiesStore = cookies();
    const token = cookiesStore.get('token');
    const tokenValue = token?.value;
    let user = null
    if (tokenValue) {
      try {
        const decodedData = jwt.verify(tokenValue, 'ahakahakahak');
        user = decodedData;
      } catch (error) {
        console.log(error)
      }
    }
    return (
      <>
      {user ?<Editoor user={user} />: <h1 className='text-8xl text-red-600'>You are not logged in</h1>}
      </>
    )
}
export default Newblog