import React from 'react';
import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import ProductListings from '../components/ProductListings';
import ViewAllProducts from '../components/ViewAllProducts';


function HomePage() {
  return (
    <>
        <Hero />
        <HomeCards />
        <ProductListings isHome={true}/>
        <ViewAllProducts />
    </>
  )
}

export default HomePage;