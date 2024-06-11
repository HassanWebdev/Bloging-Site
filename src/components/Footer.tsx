import Link from 'next/link'
const footer = ()=>{
    return(
        <div className='w-full h-52 px-6'>
            <div className='w-full h-64 bg-black flex flex-col justify-center items-center'>
                <h1 className='font-bold text-[5vw] text-white tracking-widest transition-all hover:tracking-[4vw]'><Link href='/'>VOID</Link></h1>
            </div>
        
        </div>
    )
}
export default footer