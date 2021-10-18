import React from 'react';
import { Layout } from '../components/Layout';
import { Slider } from '../components/Slider';
import { Categories } from '../components/Categories';
import { Products } from '../components/Products';

export const Home = () => {
  return (
    <Layout>
      <Slider />
      <Categories />
      <Products />
    </Layout>
  );
};
