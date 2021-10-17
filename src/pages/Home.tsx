import React from 'react';
import { Layout } from '../components/Layout';
import { Slider } from '../components/Slider';
import { Carousel } from '../components/Carousel';
import { FeaturedProducts } from '../components/FeaturedProducts';

export const Home = () => {
  return (
    <Layout>
      <Slider />
      <Carousel />
      <FeaturedProducts />
    </Layout>
  );
};
