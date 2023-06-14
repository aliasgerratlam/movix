import React from 'react';
import '../Home/Home.scss';
import HeroBanner from '../../components/herobanner/HeroBanner';
import Trendng from './trending/Trendng';
import Popular from './popular/Popular';
import TopRated from './top-rated/TopRated';

const Home = () => {
  return (
    <>
      <HeroBanner />
      <Trendng/>
      <Popular />
      <TopRated />
    </>
  )
}

export default Home