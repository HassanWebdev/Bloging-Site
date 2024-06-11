import { cookies } from 'next/headers';
import Myblog2 from './Myblog2';
import jwt from 'jsonwebtoken';
const Myblog = ()=>{
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
      {user ?<Myblog2 user={user} />: <h1 className='text-8xl text-red-600'>You are not logged in</h1>}
      </>
    )
}
export default Myblog