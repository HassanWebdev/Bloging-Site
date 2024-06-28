import Hero from '@/components/hero';
import Third from '@/components/third';
import Fourth from '@/components/fourth';
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar';
function page() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Third/>
      <Fourth/>
      <Footer/>
    </div>
  )
}

export default page
