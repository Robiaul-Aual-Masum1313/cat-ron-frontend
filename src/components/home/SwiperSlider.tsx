'use client'
// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from '@/images/image3.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '@/app/swiperStyle.css';

// import required modules
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function SwiperSlider() {
  return (
    <div className='w-full h-162'>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
        <div>
            <Image className='' src={image1} alt='' width={2250} height={650}></Image>
        </div>
            
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        {/* <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </div>
  );
}
