import React from 'react';
import Landing from '../components/landing'; // Capital 'L'
import Categories from '../components/Categories';
import BestSeller from '../components/BestSeller';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';


const Home = () => {
  return (
    <div className='mt-9'>
      <Landing /> 
      <Categories/>
      <BestSeller/>
     <Newsletter/>
     {/* <Footer/> */}
    </div>
  );
};

export default Home;

